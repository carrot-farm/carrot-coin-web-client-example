import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from "store/modules/base";
import * as categoryActions from "store/modules/category";
import withAppendList from "hoc/list/withAppendList";

// withSimpleList template options
const options = {
  useWriteButton: true,
  actionsName: "CategoryActions",
  writeFormName: "categoryForm",
  modifyFormName: "categoryForm",
  textField: "category"
};

class CategoryListContainer extends Component {
  render() {
    return <div />;
  }
}

export default connect(
  state => ({
    _id: state.category.get("_id"),
    page: state.category.get("page"),
    lastPage: state.category.get("lastPage"),
    list: state.category.get("categories"),
    categoryDetail: state.category.get("categoryDetail"),
    loading: state.pender.pending["category/GET_APPEND_LIST"],
    initialLoading: state.pender.pending["category/GET_CATEGORIES"],
    isLogged: state.base.get("isLogged")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch)
  })
)(withAppendList(options)(CategoryListContainer));
