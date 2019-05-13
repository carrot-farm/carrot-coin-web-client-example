import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { List } from "immutable";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import TradeTemplate from "components/coinTrade/TradeTemplate";
import { initializeCoins } from "lib/common";

class TradeContainer extends Component {
  componentDidMount() {
    const { StockActions, coins } = this.props;
    // 코인정보 초기화
    const intializeCoins = initializeCoins(coins);
    StockActions.setCoinList(List(intializeCoins.toJS()));
    // 첫 데이터 셋팅
    StockActions.selectCoin(0);
  }

  componentWillUnmount() {}

  render() {
    return <TradeTemplate />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    coins: state.stock.get("coins")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(TradeContainer);
