import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해
import * as baseActions from "store/modules/base";
import Head from "components/common/Head";

class HeadContainer extends Component {
  componentDidMount = () => {
    const { BaseActions } = this.props;
    BaseActions.setHeadTitle("당근 코인");
    BaseActions.setHeadDescription("코인 트레이딩 예시 사이트");
  };
  render() {
    const { headTitle, headDescription } = this.props;
    return (
      <div>
        <Head headTitle={headTitle} headDescription={headDescription} />
      </div>
    );
  }
}

export default connect(
  state => ({
    headTitle: state.base.get("headTitle"),
    headDescription: state.base.get("headDescription")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeadContainer));
