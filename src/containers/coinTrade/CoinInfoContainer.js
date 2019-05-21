import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import CoinInfo from "components/coinTrade/CoinInfo";

class CoinInfoContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { selectedCoin } = this.props;
    const _selectedCoin = selectedCoin.toJS();
    return <CoinInfo selectedCoin={_selectedCoin} />;
  }
}

export default connect(
  state => ({
    selectedCoin: state.stock.get("selectedCoin")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(CoinInfoContainer);
