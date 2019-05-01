import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해

import * as baseActions from "store/modules/base";
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
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));
