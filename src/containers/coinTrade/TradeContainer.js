import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import TradeTemplate from "components/coinTrade/TradeTemplate";

class TradeContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <TradeTemplate />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(TradeContainer);
