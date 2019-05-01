import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import * as categoryActions from "store/modules/category";
import * as toDoActions from "store/modules/toDo";
import * as configActions from "store/modules/config";
import withAppendList from "hoc/list/withAppendList";
import ToDoFormContainer from "containers/modal/ToDoFormContainer";

// withSimpleList template options
const options = {
  useWriteButton: true,
  actionsName: "ToDoActions",
  writeFormName: "toDoForm",
  modifyFormName: "toDoForm",
  textField: "content",
  isToDoList: true
};

class ToDoListContainer extends Component {
  componentDidMount() {
    const { BaseActions } = this.props;
    BaseActions.toggleHeaderCategory(true);
  }

  componentWillUnmount() {
    const { BaseActions } = this.props;
    BaseActions.toggleHeaderCategory(false);
  }

  //inputModal submit
  handleSubmitClick = content => {
    const { categories, selectedCategory, ToDoActions, _id, list } = this.props;
    if (!categories.length) {
      return alert("카테고리를 입력하여 주십시요.");
    }
    if (!selectedCategory) {
      return alert("카테고리를 선택하여 주십시요.");
    }
    if (_id) {
      //수정
      list.map(item => {
        if (item._id === _id) {
          ToDoActions.updateItem({
            itemId: _id,
            content: content,
            completed: item.completed
          });
          return false;
        }
      });
    } else {
      //추가
      ToDoActions.write({
        categoryId: selectedCategory,
        content: content
      });
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <div>
        <ToDoFormContainer
          title={"할 일"}
          handleSubmitClick={this.handleSubmitClick}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      isLogged: state.base.get("isLogged"),
      _id: state.toDo.get("_id"),
      categories: state.category.get("categories"),
      selectedCategory: state.category.get("selectedCategory"),
      input: state.toDo.get("input"),
      page: state.toDo.get("page"),
      lastPage: state.toDo.get("lastPage"),
      list: state.toDo.get("list"),
      loading: state.pender.pending["todo/GET_LIST"],
      toggleCompleteView: state.config.get("toggleCompleteView")
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
      ToDoActions: bindActionCreators(toDoActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
      ConfigActions: bindActionCreators(configActions, dispatch)
    })
  )(withAppendList(options)(ToDoListContainer))
);
