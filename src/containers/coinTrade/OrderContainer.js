import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import * as buyingFormActions from "store/modules/buyingForm";
import * as sellingFormActions from "store/modules/sellingForm";
import Order from "components/coinTrade/Order";

class OrderContainer extends Component {
  componentDidMount() {
    const { StockActions } = this.props;
    StockActions.updateOrders();
  }

  componentDidUpdate(prevProps) {
    const { selectedCoin } = this.props;
    // console.log("---> OrderContainer.didUpdate : ");
    // 코인이 같을 때
    if (prevProps === this.props && selectedCoin.coinId === undefined) {
      return false;
    }
  }

  componentWillUnmount() {}

  // ===== 폼 활성화
  activeFormClick = formName => {
    const { StockActions } = this.props;
    StockActions.setActiveForm(formName);
  };

  // ===== 가격 클릭
  handlePriceClick = price => {
    const {
      BuyingFormActions,
      SellingFormActions,
      myInfo,
      activeForm
    } = this.props;
    // console.log("---> handlePriceClick: ", activeForm);
    if (activeForm === "buyForm") {
      BuyingFormActions.setCalcPrice({
        orderPrice: price,
        ownPrice: myInfo.ownPrice
      });
    } else if (activeForm === "sellForm") {
      SellingFormActions.setCalcPrice(price);
    }
  };

  // ===== 랜더링
  render() {
    const {
      selectedCoin,
      activeForm,
      buyingOrders,
      sellingOrders
    } = this.props;
    const _selectedCoin = selectedCoin.toJS();
    // console.log(selectedCoin);
    return (
      <Order
        selectedCoin={_selectedCoin}
        activeForm={activeForm}
        buyingOrders={buyingOrders}
        sellingOrders={sellingOrders}
        activeFormClick={this.activeFormClick}
        handlePriceClick={this.handlePriceClick}
      />
    );
  }
}

export default connect(
  state => ({
    myInfo: state.stock.get("selectedCoin"),
    selectedCoin: state.stock.get("selectedCoin"),
    buyingOrders: state.stock.get("buyingOrders"),
    sellingOrders: state.stock.get("sellingOrders"),
    activeForm: state.stock.get("activeForm"),
    userBuyingOrders: state.stock.get("userBuyingOrders"),
    userSellingOrders: state.stock.get("userSellingOrders"),
    residualBuyAmount: state.stock.get("residualBuyAmount"),
    residualSellAmount: state.stock.get("residualSellAmount")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch),
    BuyingFormActions: bindActionCreators(buyingFormActions, dispatch),
    SellingFormActions: bindActionCreators(sellingFormActions, dispatch)
  })
)(OrderContainer);
