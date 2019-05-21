import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as stockActions from "store/modules/stock";
import * as sellingFormActions from "store/modules/sellingForm";
import OrderForm from "components/coinTrade/OrderForm";
import { inputCommSet, decimalFloor, commSet } from "lib/tools";
import { calcVolume, calcPrice, calcTotalPrice } from "lib/common";

class SellFormContainer extends Component {
  componentDidMount() {
    const {
      StockActions,
      SellingFormActions,
      selectedCoin,
      sellinggVolumeCommset
    } = this.props;
    const { currentPrice } = selectedCoin.toJS();
    SellingFormActions.setPrice(currentPrice);
    SellingFormActions.setVolume(sellinggVolumeCommset);
    // console.log("---> mount: ", SellingFormActions);
    StockActions.setMyCoin();
  }

  componentWillUnmount() {}

  // 매수수량 변경
  handleVolumeChange = e => {
    const { SellingFormActions, sellingPrice, selectedMyCoin } = this.props;
    if (!e.sendData) {
      return false;
    }
    let ownVolume = selectedMyCoin.get("ownAmount");
    let volume = e.sendData.number;
    let price = sellingPrice;
    let totalPrice = calcTotalPrice(price, volume);
    let comm =
      e.sendData.numberCommSet ||
      (Number.isInteger(volume) ? commSet(volume) : commSet(volume, true));
    // console.log(`---> sellingVolumeChange(`,e.sendData,ownVolume,selectedMyCoin.toJS(),")");

    // 입력 수량이 소지 수량을 넘었을 경우 다시 계산
    if (volume > ownVolume) {
      totalPrice = calcTotalPrice(sellingPrice, ownVolume);
      price = calcPrice(ownVolume, totalPrice);
      volume = calcVolume(sellingPrice, totalPrice);
      comm = commSet(volume, Number.isInteger(volume) ? false : true);
      // console.log("> 구매량 초과: ", volume, totalPrice, price, comm);
    }

    SellingFormActions.setVolume(comm);
    SellingFormActions.setPrice(price);
    SellingFormActions.setTotalPrice(totalPrice);
  };

  // ===== 매수수량 메뉴 토글
  handleVolumeMenuClick = e => {
    const { SellingFormActions } = this.props;
    SellingFormActions.toggleVolumeMenu(e ? e.currentTarget : null);
  };

  // ===== 매수수량 퍼센트 지정
  handleSetVolumeRatio = percent => {
    const { SellingFormActions, selectedMyCoin } = this.props;
    const perPrice = (selectedMyCoin.get("ownAmount") * percent) / 100;
    // console.log(
    //   "---> handleSetVolumeRatio: ",
    //   selectedMyCoin.get("ownAmount"),
    //   percent,
    //   perPrice
    // );
    this.handleVolumeChange({ sendData: { number: perPrice } });
    SellingFormActions.toggleVolumeMenu();
  };

  // 매수가격 변경
  handleSellingPriceChange = e => {
    const { SellingFormActions, sellingVolume } = this.props;
    if (!e.sendData) {
      return false;
    }
    let volume = sellingVolume;
    let price = e.sendData.number;
    let comm = e.sendData.numberCommSet;
    let totalPrice = calcTotalPrice(price, sellingVolume);
    // console.log(`---> sellingPriceChange(`, e.sendData, totalPrice, ")");

    // 입력 수량의 금액이 소지금을 넘었을 경우 재개산.
    // if (ownPrice < totalPrice) {
    //   price = calcPrice(sellingVolume, ownPrice);
    //   totalPrice = calcTotalPrice(price, sellingVolume);
    //   volume = calcVolume(price, totalPrice);
    //   comm = commSet(price);
    //   console.log("> 구매량 초과: ", price, comm, sellingVolume, totalPrice);
    // }

    SellingFormActions.setVolume(volume);
    SellingFormActions.setPrice(comm);
    SellingFormActions.setTotalPrice(totalPrice);
  };

  // 매수가격 포커스 아웃
  handlePriceBlur = e => {
    const { selectedCoin } = this.props;
    const { value } = e.target;
    const { number } = inputCommSet(value);
    const tickPrice = selectedCoin.get("tickPrice");
    const cutValue = Math.floor(number / tickPrice) * tickPrice;

    this.handleSellingPriceChange({
      sendData: {
        number: cutValue,
        numberCommSet: commSet(cutValue)
      }
    });
  };

  // 매수가격 한틱 위로 올리기
  handleUpperTickClick = () => {
    const { selectedCoin, sellingPrice } = this.props;
    const changePrice = sellingPrice + selectedCoin.get("tickPrice");
    // console.log("---> handleUpperTickClick: ", changePrice);
    this.handleSellingPriceChange({
      sendData: {
        number: changePrice,
        numberCommSet: commSet(changePrice)
      }
    });
  };

  // 매수가격 한틱 아래로 내리기
  handleLowerTickClick = () => {
    const { selectedCoin, sellingPrice } = this.props;
    const changePrice = sellingPrice - selectedCoin.get("tickPrice");
    if (changePrice < 0) {
      return false;
    }
    this.handleSellingPriceChange({
      sendData: {
        number: changePrice,
        numberCommSet: commSet(changePrice)
      }
    });
  };

  // 매수총액 수정
  handleBuyingTotalPriceChange = e => {
    const { SellingFormActions, sellingPrice } = this.props;
    if (!e.sendData) {
      return false;
    }
    let price = sellingPrice;
    let totalPrice = e.sendData.number;
    let volume = calcVolume(price, totalPrice);
    console.log(
      "---> handleBuyingTotalPriceChange: ",
      sellingPrice,
      e.sendData,
      volume
    );

    // if (ownPrice <= totalPrice) {
    //   volume = calcVolume(price, ownPrice);
    //   totalPrice = calcTotalPrice(price, volume);
    //   price = calcPrice(volume, totalPrice);
    // }
    console.log("> result: ", volume, price, totalPrice);
    SellingFormActions.setVolume(volume);
    SellingFormActions.setPrice(price);
    SellingFormActions.setTotalPrice(totalPrice);
  };

  // sumit handle
  handleSubmitClick = e => {
    const {
      StockActions,
      sellingVolume,
      sellingPrice,
      sellingTotalPrice,
      selectedCoin,
      selectedMyCoin
    } = this.props;
    const minimumVolume = selectedCoin.get("minimumVolume");
    const ownAmount = selectedMyCoin.get("ownAmount");
    e.preventDefault();
    // console.log(
    //   "---> handleBuyClick: ",
    //   sellingVolume,
    //   sellingPrice,
    //   sellingTotalPrice,
    //   selectedCoin
    // );
    if (sellingVolume === 0) {
      return alert("매수수량을 확인해 주십시요.");
    }
    if (sellingPrice === 0) {
      return alert("매수가격을 확인해 주십시요.");
    }
    if (sellingTotalPrice === 0) {
      return alert("매수총액을 확인해 주십시요.");
    }
    if (sellingVolume < minimumVolume) {
      return alert('최소 주문수량은 "' + minimumVolume + '" 입니다. .');
    }
    if (sellingVolume > ownAmount) {
      return alert("소유 수량을 넘었습니다.");
    }
    // 주문 넣기.
    StockActions.submitSellingOrder({
      orderVolume: sellingVolume,
      orderPrice: sellingPrice
    });
  };

  render() {
    const {
      selectedCoin,
      selectedMyCoin,
      sellingVolumeCommset,
      sellingPriceCommset,
      sellingTotalPriceCommset,
      volumeMenuAnchorEl
    } = this.props;
    const volumeUnit = selectedCoin.get("coinUnit");
    const minimumOrder = selectedCoin.get("minimumVolume");
    let topValueCommset = selectedMyCoin.toJS().ownAmount;

    return (
      <OrderForm
        topValueText={"매도가능수량"}
        topValueUnit={volumeUnit}
        topValueCommset={topValueCommset}
        volumeText={"매도수량"}
        volumeUnit={volumeUnit}
        volumeCommset={sellingVolumeCommset}
        volumeMenuAnchorEl={volumeMenuAnchorEl}
        handleVolumeChange={this.handleVolumeChange}
        handleVolumeMenuClick={this.handleVolumeMenuClick}
        handleSetVolumeRatio={this.handleSetVolumeRatio}
        priceText={"매도가격"}
        priceCommset={sellingPriceCommset}
        handlePriceChange={this.handleSellingPriceChange}
        handlePriceBlur={this.handlePriceBlur}
        handleUpperTickClick={this.handleUpperTickClick}
        handleLowerTickClick={this.handleLowerTickClick}
        totalPriceText={"매도총액"}
        totalPriceCommset={sellingTotalPriceCommset}
        handleBuyingTotalPriceChange={this.handleBuyingTotalPriceChange}
        minimumOrder={minimumOrder}
        handleSubmitClick={this.handleSubmitClick}
        buttonClass={"blue lighten-2 white-text"}
        buttonText={"매 도"}
      />
    );
  }
}

export default connect(
  state => ({
    myInfo: state.stock.get("myInfo"),
    selectedCoin: state.stock.get("selectedCoin"),
    selectedMyCoin: state.stock.get("selectedMyCoin"),
    ownCoins: state.stock.get("ownCoins"),
    sellingVolume: state.sellingForm.get("sellingVolume"),
    sellingVolumeCommset: state.sellingForm.get("sellingVolumeCommset"),
    volumeMenuAnchorEl: state.sellingForm.get("volumeMenuAnchorEl"),
    sellingPrice: state.sellingForm.get("sellingPrice"),
    sellingPriceCommset: state.sellingForm.get("sellingPriceCommset"),
    sellingTotalPrice: state.sellingForm.get("sellingTotalPrice"),
    sellingTotalPriceCommset: state.sellingForm.get("sellingTotalPriceCommset")
  }),
  dispatch => ({
    StockActions: bindActionCreators(stockActions, dispatch),
    SellingFormActions: bindActionCreators(sellingFormActions, dispatch)
  })
)(SellFormContainer);
