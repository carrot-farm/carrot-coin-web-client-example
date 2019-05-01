import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as toDoActions from "store/modules/toDo";
import * as categoryActions from "store/modules/category";
import Editor from "components/editor/Editor";

class EditorContainer extends Component {
  componentDidMount() {
    const { CategoryActions, BaseActions } = this.props;
    BaseActions.toggleHeaderSubmit(true);
    CategoryActions.setSelectedCategoryInfo();
  }

  componentWillUnmount() {
    const { BaseActions } = this.props;
    BaseActions.toggleHeaderSubmit(false);
  }

  // ===== 글 입력
  handleOnChange = evt => {
    const { ToDoActions } = this.props;
    const { value } = evt.target;
    ToDoActions.changeInput(value);
  };

  render() {
    const { input } = this.props;
    return <Editor handleOnChange={this.handleOnChange} input={input} />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    input: state.toDo.get("input")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ToDoActions: bindActionCreators(toDoActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch)
  })
)(EditorContainer);
