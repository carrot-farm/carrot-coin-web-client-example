import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as stockActions from "store/modules/stock";
import * as buyingFormActions from "store/modules/buyingForm";
import OrderForm from "components/coinTrade/OrderForm";
import { inputCommSet, commSet } from "lib/tools";
import { calcVolume, calcPrice, calcTotalPrice } from "lib/common";

class BuyingFormContainer extends Component {
  componentDidMount() {
    const { BuyingFormActions, selectedCoin, buyingVolumeCommset } = this.props;
    const { currentPrice } = selectedCoin.toJS();
    BuyingFormActions.setPrice(currentPrice);
    BuyingFormActions.setVolume(buyingVolumeCommset);
  }

  // 매수수량 변경
  buyingVolumeChange = e => {
    const { StockActions, BuyingFormActions, buyingPrice, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    let volume = e.sendData.number;
    let price = buyingPrice;
    let totalPrice = calcTotalPrice(price, volume);
    let comm = e.sendData.numberCommSet;
    const ownPrice = myInfo.get("ownPrice");
    // console.log(`---> buyingVolumeChange(`, e.sendData, ")");

    // 입력 수량의 금액이 소지금을 넘었을 경우 재개산.
    if (ownPrice < totalPrice) {
      volume = calcVolume(buyingPrice, ownPrice);
      totalPrice = calcTotalPrice(buyingPrice, volume);
      price = calcPrice(volume, totalPrice);
      comm = commSet(volume, Number.isInteger(volume) ? false : true);
      // console.log("> 구매량 초과: ", volume, totalPrice, price, comm);
    }

    BuyingFormActions.setVolume(comm);
    BuyingFormActions.setPrice(price);
    BuyingFormActions.setTotalPrice(totalPrice);
  };

  // ===== 매수수량 메뉴 토글
  handleVolumeMenuClick = e => {
    const { BuyingFormActions } = this.props;
    BuyingFormActions.toggleVolumeMenu(e ? e.currentTarget : null);
  };

  // ===== 매수수량 퍼센트 지정
  handleSetVolumeRatio = percent => {
    const { BuyingFormActions, myInfo } = this.props;
    const perPrice = (myInfo.get("ownPrice") * percent) / 100;
    // console.log(
    //   "---> handleSetVolumeRatio: ",
    //   myInfo.get("ownPrice"),
    //   percent,
    //   perPrice
    // );
    this.handleBuyingTotalPriceChange({ sendData: { number: perPrice } });
    BuyingFormActions.toggleVolumeMenu();
  };

  // 매수가격 변경
  buyingPriceChange = e => {
    const { BuyingFormActions, buyingVolume, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    const ownPrice = myInfo.get("ownPrice");
    let volume = buyingVolume;
    let price = e.sendData.number;
    let comm = e.sendData.numberCommSet;
    let totalPrice = calcTotalPrice(price, buyingVolume);
    // console.log(`---> buyingPriceChange(`, e.sendData, totalPrice, ")");
    // 입력 수량의 금액이 소지금을 넘었을 경우 재개산.
    if (ownPrice < totalPrice) {
      price = calcPrice(buyingVolume, ownPrice);
      totalPrice = calcTotalPrice(price, buyingVolume);
      volume = calcVolume(price, totalPrice);
      comm = commSet(price);
      // console.log("> 구매량 초과: ", price, comm, buyingVolume, totalPrice);
    }

    BuyingFormActions.setVolume(volume);
    BuyingFormActions.setPrice(comm);
    BuyingFormActions.setTotalPrice(totalPrice);
  };

  // 매수가격 포커스 아웃
  handlePriceBlur = e => {
    const { selectedCoin } = this.props;
    const { tickPrice } = selectedCoin.toJS();
    const { value } = e.target;
    const { number } = inputCommSet(value);
    if (number < tickPrice) {
    }
    const cutValue = Math.floor(number / tickPrice) * tickPrice;

    this.buyingPriceChange({
      sendData: {
        number: cutValue,
        numberCommSet: commSet(cutValue)
      }
    });
  };

  // 매수가격 한틱 위로 올리기
  handleUpperTickClick = () => {
    const { selectedCoin, buyingPrice } = this.props;
    const { tickPrice } = selectedCoin.toJS();
    const changePrice = buyingPrice + tickPrice;
    this.buyingPriceChange({
      sendData: {
        number: changePrice,
        numberCommSet: commSet(changePrice)
      }
    });
  };

  // 매수가격 한틱 아래로 내리기
  handleLowerTickClick = () => {
    const { selectedCoin, buyingPrice } = this.props;
    const { tickPrice } = selectedCoin.toJS();
    const changePrice = buyingPrice - tickPrice;
    if (changePrice < 0) {
      return false;
    }
    this.buyingPriceChange({
      sendData: {
        number: changePrice,
        numberCommSet: commSet(changePrice)
      }
    });
  };

  // 매수총액 수정
  handleBuyingTotalPriceChange = e => {
    const { BuyingFormActions, buyingPrice, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    const ownPrice = myInfo.get("ownPrice");
    let price = buyingPrice;
    let totalPrice = e.sendData.number;
    let volume = calcVolume(price, totalPrice);
    // console.log(
    //   "---> handleBuyingTotalPriceChange: ",
    //   buyingPrice,
    //   e.sendData,
    //   volume
    // );

    if (ownPrice <= totalPrice) {
      volume = calcVolume(price, ownPrice);
      totalPrice = calcTotalPrice(price, volume);
      price = calcPrice(volume, totalPrice);
    }
    // console.log("> result: ", volume, price, totalPrice);
    BuyingFormActions.setVolume(volume);
    BuyingFormActions.setPrice(price);
    BuyingFormActions.setTotalPrice(totalPrice);
  };

  // sumit handle
  handleSubmitClick = e => {
    const {
      StockActions,
      buyingVolume,
      buyingPrice,
      buyingTotalPrice,
      selectedCoin,
      myInfo
    } = this.props;
    const ownPrice = myInfo.get("ownPrice");
    const { minimumVolume } = selectedCoin.toJS();
    e.preventDefault();
    // console.log(
    //   "---> handleBuyClick: ",
    //   // buyingVolume,
    //   // buyingPrice,
    //   buyingTotalPrice,
    //   ownPrice,
    //   ownPrice - buyingTotalPrice
    //   // selectedCoin
    // );

    if (buyingVolume === 0) {
      return alert("매수수량을 확인해 주십시요.");
    }
    if (buyingPrice === 0) {
      return alert("매수가격을 확인해 주십시요.");
    }
    if (buyingTotalPrice === 0) {
      return alert("매수총액을 확인해 주십시요.");
    }
    if (buyingVolume < minimumVolume) {
      return alert('최소 주문수량은 "' + minimumVolume + '" 입니다. .');
    }
    if (buyingTotalPrice > ownPrice || ownPrice - buyingTotalPrice < 0) {
      return alert("매수 한도를 초과 하였습니다.");
    }
    // console.log(buyingTotalPrice > ownPrice);
    // 주문 넣기.
    StockActions.submitBuyingOrder({
      orderVolume: buyingVolume,
      orderPrice: buyingPrice
    });
  };

  render() {
    const {
      myInfo,
      selectedCoin,
      buyingVolumeCommset,
      buyingPriceCommset,
      buyingTotalPriceCommset,
      volumeMenuAnchorEl
    } = this.props;
    const ownPrice = commSet(myInfo.get("ownPrice"));
    const { coinUnit, minimumVolume } = selectedCoin.toJS();
    const volumeUnit = coinUnit;
    const minimumOrder = minimumVolume;
    // console.log(coinUnit, minimumVolume);

    return (
      <OrderForm
        topValueText={"매수가능액"}
        topValueUnit={"KRW"}
        topValueCommset={ownPrice}
        volumeText={"매수수량"}
        volumeUnit={volumeUnit}
        volumeCommset={buyingVolumeCommset}
        volumeMenuAnchorEl={volumeMenuAnchorEl}
        handleVolumeChange={this.buyingVolumeChange}
        handleVolumeMenuClick={this.handleVolumeMenuClick}
        handleSetVolumeRatio={this.handleSetVolumeRatio}
        priceText={"매수가격"}
        priceCommset={buyingPriceCommset}
        handlePriceChange={this.buyingPriceChange}
        handlePriceBlur={this.handlePriceBlur}
        handleUpperTickClick={this.handleUpperTickClick}
        handleLowerTickClick={this.handleLowerTickClick}
        totalPriceText={"매수총액"}
        totalPriceCommset={buyingTotalPriceCommset}
        handleBuyingTotalPriceChange={this.handleBuyingTotalPriceChange}
        minimumOrder={minimumOrder}
        handleSubmitClick={this.handleSubmitClick}
        buttonClass={"red lighten-2 white-text"}
        buttonText={"매 수"}
      />
    );
  }
}

export default connect(
  state => ({
    myInfo: state.stock.get("myInfo"),
    selectedCoin: state.stock.get("selectedCoin"),
    buyingVolume: state.buyingForm.get("buyingVolume"),
    buyingVolumeCommset: state.buyingForm.get("buyingVolumeCommset"),
    volumeMenuAnchorEl: state.buyingForm.get("volumeMenuAnchorEl"),
    buyingPrice: state.buyingForm.get("buyingPrice"),
    buyingPriceCommset: state.buyingForm.get("buyingPriceCommset"),
    buyingTotalPrice: state.buyingForm.get("buyingTotalPrice"),
    buyingTotalPriceCommset: state.buyingForm.get("buyingTotalPriceCommset")
  }),
  dispatch => ({
    StockActions: bindActionCreators(stockActions, dispatch),
    BuyingFormActions: bindActionCreators(buyingFormActions, dispatch)
  })
)(BuyingFormContainer);
