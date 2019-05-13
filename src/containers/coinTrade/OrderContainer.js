import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import Order from "components/coinTrade/Order";

class OrderContainer extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { selectedCoin } = this.props;
    console.log("selectedCoin.coinId", selectedCoin.coinId);
    if (prevProps === this.props && selectedCoin.coinId === undefined) {
      return false;
    }
  }

  componentWillUnmount() {}

  // 폼 활성화
  activeFormClick = formName => {
    const { StockActions } = this.props;
    StockActions.setActiveForm(formName);
  };

  // 랜더링
  render() {
    const {
      selectedCoin,
      activeForm,
      buyingOrders,
      sellingOrders
    } = this.props;
    // console.log(selectedCoin);
    return (
      <Order
        selectedCoin={selectedCoin}
        activeForm={activeForm}
        buyingOrders={buyingOrders}
        sellingOrders={sellingOrders}
        activeFormClick={this.activeFormClick}
      />
    );
  }
}

export default connect(
  state => ({
    selectedCoin: state.stock.get("selectedCoin"),
    buyingOrders: state.stock.get("buyingOrders"),
    sellingOrders: state.stock.get("sellingOrders"),
    activeForm: state.stock.get("activeForm")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(OrderContainer);
