import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import CoinList from "components/coinTrade/CoinList";

class CoinLisContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <CoinList />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(CoinLisContainer);
