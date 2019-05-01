import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import Order from "components/coinTrade/Order";

class OrderContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <Order />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(OrderContainer);
