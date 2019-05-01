import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해

import * as baseActions from "store/modules/base";
import * as categoryActions from "store/modules/category";
import * as toDoActions from "store/modules/toDo";
import * as configActions from "store/modules/config";
import CategoryFormContainer from "containers/modal/CategoryFormContainer";
import Header from "components/common/Header";

class HeaderContainer extends Component {
  //로그인 확인
  checkLogin = () => {
    const { BaseActions } = this.props;
    return BaseActions.checkLogin();
  };
  //사이트 메뉴
  handleOpenSideMenu = sw => {
    const { BaseActions } = this.props;
    BaseActions.openSideMenu();
  };
  //사이드 메뉴 on/off
  handleCloseSideMenu = sw => {
    const { BaseActions } = this.props;
    BaseActions.closeSideMenu();
  };
  //로그인 모달
  handleLoginClick = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("login");
  };
  //로그아웃
  handleLogoutClick = async e => {
    const { BaseActions } = this.props;
    await BaseActions.logout();
    window.location.replace("/");
  };
  //카테고리 입력 폼 활성화
  handleActiveCategoryForm = async () => {
    const { CategoryActions, BaseActions } = this.props;
    CategoryActions.clearItem();
    BaseActions.showModal("categoryForm");
  };
  // ===== 할일 작성/수정 버튼 클릭
  handleSubmitClick = async () => {
    const {
      history,
      ToDoActions,
      categories,
      selectedCategory,
      input,
      _id,
      toDos
    } = this.props;
    if (!input) {
      return alert("내용을 입력하여 주십시요.");
    }
    if (!categories.length) {
      return alert("카테고리를 입력하여 주십시요.");
    }
    if (!selectedCategory) {
      return alert("카테고리를 선택하여 주십시요.");
    }

    // 수정
    if (_id) {
      toDos.map(async item => {
        await ToDoActions.updateItem({
          itemId: _id,
          content: input,
          completed: item.completed
        });
        history.replace("/");
        return false;
      });
      return false;
    }
    // 작성
    await ToDoActions.write({
      categoryId: selectedCategory,
      content: input
    });
    history.replace("/");
  };
  componentDidMount = async () => {
    const {
      BaseActions,
      CategoryActions,
      ToDoActions,
      ConfigActions
    } = this.props;
    const res = await BaseActions.getInitialData();
    const { data } = res;
    if (data.logged) {
      CategoryActions.getList({ page: 1 });
      if (data._selectedCategory) {
        CategoryActions.setSelectedCategory(data._selectedCategory);
        ConfigActions.setToggleCompleteView(data.toggleCompleteView);
        ToDoActions.getList({
          page: 1,
          categoryId: data._selectedCategory,
          completed: data.toggleCompleteView
        });
      }
    }
  };
  render() {
    const {
      isSideMenuOpen,
      isLogged,
      toggleHeaderCategory,
      toggleHeaderSubmit,
      selectedCategoryInfo
    } = this.props;
    return (
      <div>
        <Header
          isLogged={isLogged}
          isSideMenuOpen={isSideMenuOpen}
          toggleHeaderCategory={toggleHeaderCategory}
          toggleHeaderSubmit={toggleHeaderSubmit}
          selectedCategoryInfo={selectedCategoryInfo}
          handleOpenSideMenu={this.handleOpenSideMenu}
          handleCloseSideMenu={this.handleCloseSideMenu}
          handleLoginClick={this.handleLoginClick}
          handleLogoutClick={this.handleLogoutClick}
          handleActiveCategoryForm={this.handleActiveCategoryForm}
          handleSubmitClick={this.handleSubmitClick}
        />
        <CategoryFormContainer />
      </div>
    );
  }
}

export default connect(
  state => ({
    isSideMenuOpen: state.base.get("isSideMenuOpen"),
    isLogged: state.base.get("isLogged"),
    toggleHeaderCategory: state.base.get("toggleHeaderCategory"),
    toggleHeaderSubmit: state.base.get("toggleHeaderSubmit"),
    currentCategory: state.toDo.get("category"),
    toggleCompleteView: state.config.get("toggleCompleteView"),
    selectedCategory: state.category.get("selectedCategory"),
    category_id: state.category.get("_id"), // 현재 선택된 카테고리 id
    categories: state.category.get("categories"), // 전체 카테고리 리스트
    selectedCategoryInfo: state.category.get("selectedCategoryInfo"),
    toDos: state.toDo.get("list"), // 할일 리스트
    _id: state.toDo.get("_id"), // 할일 id
    item: state.toDo.get("item"), // 할일 아이템
    input: state.toDo.get("input") // 할일 입력 데이터
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch),
    ToDoActions: bindActionCreators(toDoActions, dispatch),
    ConfigActions: bindActionCreators(configActions, dispatch)
  })
)(withRouter(HeaderContainer));
