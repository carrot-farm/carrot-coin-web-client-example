import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import CancelForm from "components/coinTrade/CancelForm";
import { jsonSort } from "lib/tools";

class CancelContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  // 미체결 주문 필터링
  filteredCancelOrders = () => {
    const {
      myInfo,
      selectedCoin,
      userBuyingOrders,
      userSellingOrders
    } = this.props;
    const coinId = selectedCoin.get("coinId");
    const filteredUserBuyingOrders = userBuyingOrders.filter(
      item =>
        item.get("coinId") === coinId &&
        item.get("ordererId") === myInfo.get("userId") &&
        item.get("currentAmount") > 0 &&
        item.get("isCancel") === false
    );
    const filteredUserSellingOrders = userSellingOrders.filter(
      item =>
        item.get("coinId") === coinId &&
        item.get("ordererId") === myInfo.get("userId") &&
        item.get("currentAmount") > 0 &&
        item.get("isCancel") === false
    );
    let cancelOrders = filteredUserBuyingOrders.concat(
      filteredUserSellingOrders
    );
    return jsonSort(cancelOrders.toJS(), "orderTime", false);
  };

  // ===== 주문 취소 클릭
  handleCancelClick = (orderId, orderType) => {
    const { StockActions } = this.props;
    StockActions.cancelOrder({ orderId, orderType });
  };

  render() {
    const cancelOrders = this.filteredCancelOrders();
    // console.log("> cancel orders: ", cancelOrders);
    return (
      <CancelForm
        cancelOrders={cancelOrders}
        handleCancelClick={this.handleCancelClick}
      />
    );
  }
}

export default connect(
  state => ({
    myInfo: state.stock.get("myInfo"),
    selectedCoin: state.stock.get("selectedCoin"),
    userBuyingOrders: state.stock.get("userBuyingOrders"),
    userSellingOrders: state.stock.get("userSellingOrders")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(CancelContainer);
