import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import TradeHeader from "components/common/TradeHeader";

class HeaderContainer extends Component {
  // ===== 할일 작성/수정 버튼 클릭
  handleSubmitClick = () => {};
  componentDidMount = () => {};
  render() {
    const {} = this.props;
    return (
      <div>
        <TradeHeader />
      </div>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(withRouter(HeaderContainer));
