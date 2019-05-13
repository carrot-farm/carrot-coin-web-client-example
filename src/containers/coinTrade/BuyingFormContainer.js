import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as stockActions from "store/modules/stock";
import * as buyingFormActions from "store/modules/buyingForm";
import BuyingForm from "components/coinTrade/BuyingForm";
import { inputCommSet, decimalFloor, commSet } from "lib/tools";
import { calcVolume, calcPrice, calcTotalPrice } from "lib/common";

class BuyingFormContainer extends Component {
  componentDidMount() {}

  componentDidUpdate(prevPros) {
    const { selectedCoin, BuyingFormActions } = this.props;
    // 선택 코인이 바뀌었을 때 코인 가격 변경
    if (prevPros.selectedCoin !== selectedCoin) {
      BuyingFormActions.setPrice(selectedCoin.currentPrice);
    }
  }

  componentWillUnmount() {}

  // submit
  submitClick = e => {
    // console.log("submitClick: ", e);
    e.preventDefault();
  };

  // 매수수량 변경
  buyingVolumeChange = e => {
    const { BuyingFormActions, buyingPrice, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    let volume = e.sendData.number;
    let price = buyingPrice;
    let totalPrice = calcTotalPrice(price, volume);
    let comm = e.sendData.numberCommSet;
    // console.log(`---> buyingVolumeChange(`, e.sendData, ")");

    // 입력 수량의 금액이 소지금을 넘었을 경우 재개산.
    if (myInfo.ownPrice < totalPrice) {
      volume = calcVolume(buyingPrice, myInfo.ownPrice);
      totalPrice = calcTotalPrice(buyingPrice, volume);
      price = calcPrice(volume, totalPrice);
      comm = commSet(volume, Number.isInteger(volume) ? false : true);
      // console.log("> 구매량 초과: ", volume, totalPrice, price, comm);
    }

    BuyingFormActions.setVolume(comm);
    BuyingFormActions.setPrice(price);
    BuyingFormActions.setTotalPrice(totalPrice);
  };

  // 매수가격 변경
  buyingPriceChange = e => {
    const { BuyingFormActions, buyingVolume, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    let volume = buyingVolume;
    let price = e.sendData.number;
    let comm = e.sendData.numberCommSet;
    let totalPrice = calcTotalPrice(price, buyingVolume);
    // console.log(`---> buyingPriceChange(`, e.sendData, totalPrice, ")");
    // 입력 수량의 금액이 소지금을 넘었을 경우 재개산.
    if (myInfo.ownPrice < totalPrice) {
      price = calcPrice(buyingVolume, myInfo.ownPrice);
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
    const { BuyingFormActions, selectedCoin } = this.props;
    const { value } = e.target;
    const { number } = inputCommSet(value);
    if (number < selectedCoin.tickPrice) {
    }
    const cutValue =
      Math.floor(number / selectedCoin.tickPrice) * selectedCoin.tickPrice;

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
    const changePrice = buyingPrice + selectedCoin.tickPrice;
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
    const changePrice = buyingPrice - selectedCoin.tickPrice;
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
    const { BuyingFormActions, buyingPrice, buyingVolume, myInfo } = this.props;
    if (!e.sendData) {
      return false;
    }
    let price = buyingPrice;
    let totalPrice = e.sendData.number;
    let volume = calcVolume(price, totalPrice);

    if (myInfo.ownPrice < totalPrice) {
      volume = calcVolume(price, myInfo.ownPrice);
      totalPrice = calcTotalPrice(price, volume);
      price = calcPrice(volume, totalPrice);
    }

    BuyingFormActions.setVolume(volume);
    BuyingFormActions.setPrice(price);
    BuyingFormActions.setTotalPrice(totalPrice);
  };

  // sumit handle
  handleSubmitClick = e => {
    e.preventDefault();
    console.log("---> handleBuyClick: ");
  };

  render() {
    const {
      myInfo,
      selectedCoin,
      buyingVolumeCommset,
      buyingPriceCommset,
      buyingTotalPriceCommset
    } = this.props;
    return (
      <BuyingForm
        buttonClass={"red lighten-2 white-text"}
        buttonText={"매 수"}
        myInfo={myInfo}
        selectedCoin={selectedCoin}
        submitClick={this.submitClick}
        buyingVolumeCommset={buyingVolumeCommset}
        buyingVolumeChange={this.buyingVolumeChange}
        buyingPriceCommset={buyingPriceCommset}
        buyingPriceChange={this.buyingPriceChange}
        handlePriceBlur={this.handlePriceBlur}
        handleUpperTickClick={this.handleUpperTickClick}
        handleLowerTickClick={this.handleLowerTickClick}
        buyingTotalPriceCommset={buyingTotalPriceCommset}
        handleBuyingTotalPriceChange={this.handleBuyingTotalPriceChange}
        handleSubmitClick={this.handleSubmitClick}
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
