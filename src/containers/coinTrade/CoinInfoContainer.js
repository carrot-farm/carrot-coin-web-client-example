import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import CoinInfo from "components/coinTrade/CoinInfo";

class CoinInfoContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <CoinInfo />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(CoinInfoContainer);
