import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import TradeChart from "components/coinTrade/TradeChart";

class TradeChartContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <TradeChart />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(TradeChartContainer);
