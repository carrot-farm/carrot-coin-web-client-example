import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as categoryActions from "store/modules/category";
import * as toDoActions from "store/modules/toDo";
import * as configActions from "store/modules/config";
import HorizontalList from "components/list/HorizontalList";

class HorizontalContainer extends Component {
  wheelEvt =
    navigator.userAgent.indexOf("Firefox") !== -1
      ? "DOMMouseScroll"
      : "mousewheel";
  //스크롤 이벤트
  stopEvt = evt => {
    if (evt) {
      evt.preventDefault();
    }
  };
  //카테고리 선택
  handleOnSelect = async key => {
    const { CategoryActions, ToDoActions, toggleCompleteView } = this.props;
    await CategoryActions.selectCategory({ categoryId: key });
    ToDoActions.getList({
      page: 1,
      categoryId: key,
      completed: toggleCompleteView
    });
  };
  //마우스 enter
  handleMouseEnter = () => {
    window.addEventListener(this.wheelEvt, this.stopEvt, false);
  };
  //마우스 leave
  handleMouseLeave = () => {
    window.removeEventListener(this.wheelEvt, this.stopEvt, false);
  };
  componentDidMount = () => {};
  shouldComponentUpdate(prevProps, prevState) {
    if (this.props === prevProps) {
      return false;
    }
    return true;
  }
  render() {
    const { list, selectedCategory } = this.props;

    return (
      <HorizontalList
        list={list}
        selectedCategory={selectedCategory}
        handleOnSelect={this.handleOnSelect}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default connect(
  state => ({
    list: state.category.get("categories"),
    selectedCategory: state.category.get("selectedCategory"),
    toggleCompleteView: state.config.get("toggleCompleteView")
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(categoryActions, dispatch),
    ToDoActions: bindActionCreators(toDoActions, dispatch),
    ConfigActions: bindActionCreators(configActions, dispatch)
  })
)(HorizontalContainer);
