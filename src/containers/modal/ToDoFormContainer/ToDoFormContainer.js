import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputModal from "components/modal/InputModal";
import * as baseActions from "store/modules/base";
import * as toDoActions from "store/modules/toDo";
import * as categoryActions from "store/modules/category";

class CategoryFormContainer extends Component {
  handleHideModal = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal("toDoForm");
  };
  handleSubmitClick = async () => {
    const { BaseActions, handleSubmitClick, input } = this.props;
    handleSubmitClick(input);
    BaseActions.hideModal("toDoForm");
  };
  handleOnChange = evt => {
    const { ToDoActions } = this.props;
    const { value } = evt.target;
    ToDoActions.changeInput(value);
  };
  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      return this.handleSubmitClick();
    }
  };
  componentDidMount() {}
  render() {
    const { visible, title, input } = this.props;
    return (
      <InputModal
        visible={visible}
        title={title}
        value={input}
        handleHideModal={this.handleHideModal}
        handleSubmitClick={this.handleSubmitClick}
        handleOnChange={this.handleOnChange}
        handleKeyPress={this.handleKeyPress}
        handleOnEnter={this.handleOnEnter}
      />
    );
  }
}
export default connect(
  state => ({
    visible: state.base.getIn(["modal", "toDoForm"]),
    category: state.toDo.get("category"),
    _id: state.toDo.get("_id"),
    item: state.toDo.get("item"),
    input: state.toDo.get("input")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ToDoActions: bindActionCreators(toDoActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch)
  })
)(CategoryFormContainer);
