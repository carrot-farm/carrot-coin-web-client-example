import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import TradeHistory from "components/coinTrade/TradeHistory";
import { jsonSort, commSet, dateFormat } from "lib/tools";

class CancelContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  // ===== history 필터링
  historyFilter = () => {
    const { myInfo, selectedCoin, concludedOrders } = this.props;
    const userId = myInfo.get("userId");
    const coinId = selectedCoin.get("coinId");
    const ordersHisotryJS = concludedOrders.toJS();
    let i = 0,
      len = ordersHisotryJS.length;
    let result = [],
      k = 0;
    // console.log("---> historyFilter", userId, coinId, ordersHisotryJS);

    // 필터링
    for (; i < len; i++) {
      // console.log("> filtering: ", ordersHisotryJS[i]);
      if (
        (ordersHisotryJS[i].sellerId === userId ||
          ordersHisotryJS[i].buyerId === userId) &&
        ordersHisotryJS[i].coinId === coinId
      ) {
        ordersHisotryJS[i].concludedAmountCommSet = commSet(
          ordersHisotryJS[i].concludedAmount,
          true
        );
        ordersHisotryJS[i].orderPriceCommSet = commSet(
          ordersHisotryJS[i].orderPrice
        );
        ordersHisotryJS[i].concludedTimeStr = dateFormat(
          new Date(ordersHisotryJS[i].concludedTime),
          "HH:mm"
        );
        ordersHisotryJS[i].totalPrice = parseInt(
          ordersHisotryJS[i].orderPrice * ordersHisotryJS[i].concludedAmount,
          10
        );
        ordersHisotryJS[i].totalPriceCommset = commSet(
          ordersHisotryJS[i].totalPrice
        );

        result[k++] = ordersHisotryJS[i];
      }
    }

    // console.log("> result", result);
    // 시간순 정렬
    return jsonSort(result, "concludedTime", false);
  };

  render() {
    const ordersHistory = this.historyFilter();
    return <TradeHistory ordersHistory={ordersHistory} />;
  }
}

export default connect(
  state => ({
    myInfo: state.stock.get("myInfo"),
    selectedCoin: state.stock.get("selectedCoin"),
    concludedOrders: state.stock.get("concludedOrders")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(CancelContainer);
