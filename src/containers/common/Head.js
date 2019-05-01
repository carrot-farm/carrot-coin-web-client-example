import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해
import * as baseActions from "store/modules/base";
import Head from "components/common/Head";

class HeadContainer extends Component {
  componentDidMount = () => {
    const { BaseActions } = this.props;
    BaseActions.setHeadTitle("할일 리스트");
    BaseActions.setHeadDescription("리액트 공부경 개인 할일 리스트");
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
