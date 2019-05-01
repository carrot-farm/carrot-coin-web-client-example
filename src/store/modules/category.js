import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import { pender } from "redux-pender";
import * as api from "lib/api";

//action types
const INITIALIZE = "category/INITIALIZE";
const WRITE = "category/WRITE";
const UPDATE_ITEM = "category/UPDATE_ITEM";
const DELETE_ITEM = "category/DELETE_ITEM";
const GET_LIST = "category/GET_LIST";
const GET_ITEM = "category/GET_ITEM";
const CLEAR_ITEM = "category/CLEAR_ITEM"; //category 값과 _id를 초기화 한다.
const GET_APPEND_LIST = "category/GET_APPEND_LIST";
const SET_PAGE = "category/SET_PAGE";
const CHANGE_INPUT = "category/CHANGE_INPUT";
const SET_ID = "category/SET_ID";
const SELECT_CATEGORY = "category/SELECT_CATEGORY";
const SET_SELECTED_CATEGORY = "category/SET_SELECTED_CATEGORY"; //카테고리 값 state 입력
//현재 선택되어진 카테고리 세부정보를 입력
const SET_SELECTED_CATEGORY_INFO = "category/SET_SELECTED_CATEGORY_INFO";

//action creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const write = createAction(WRITE, api.writeCategory);
export const updateItem = createAction(UPDATE_ITEM, api.updateCategory);
export const deleteItem = createAction(DELETE_ITEM, api.deleteCategory);
export const getList = createAction(GET_LIST, api.getCategories, meta => meta);
export const getAppendList = createAction(
  GET_APPEND_LIST,
  api.getCategories,
  meta => meta
);
export const getItem = createAction(GET_ITEM, api.getCategory);
export const clearItem = createAction(CLEAR_ITEM);
export const setPage = createAction(SET_PAGE);
export const setId = createAction(SET_ID);
export const selectCategory = createAction(SELECT_CATEGORY, api.selectCategory);
export const setSelectedCategory = createAction(SET_SELECTED_CATEGORY);
export const setSelectedCategoryInfo = createAction(SET_SELECTED_CATEGORY_INFO);

//initial state
const initialState = Map({
  _id: "", //수정, 삭제시에 사용될 아이디. toDo에서도 참조 한다.
  category: "", // input 값
  categories: List(),
  selectedCategory: "", //선택된 카테고리 아이디
  selectedCategoryInfo: null, // 선택된 카테고리 이름.
  page: 1,
  lastPage: 0
});

//reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      return state.set("category", action.payload);
    },
    [SET_PAGE]: (state, action) => {
      return state.set("page", Number(action.payload));
    },
    [SET_ID]: (state, action) => {
      return state.set("_id", action.payload);
    },
    [CLEAR_ITEM]: (state, action) => {
      return state.set("category", "").set("_id", "");
    },
    [SET_SELECTED_CATEGORY]: (state, action) => {
      state.get("categories").map(item => item._id === action.payload);
      return state.set("selectedCategory", action.payload);
    },
    [SET_SELECTED_CATEGORY_INFO]: (state, action) => {
      const selectedId = state.get("selectedCategory");
      let selected;
      state.get("categories").map(item => {
        if (item._id === selectedId) {
          selected = item;
          return item;
        }
      });
      return state.set("selectedCategoryInfo", selected);
    },
    ...pender({
      //카테고리 선택
      type: SELECT_CATEGORY,
      onSuccess: (state, action) => {
        return state.set("selectedCategory", action.payload.data);
      }
    }),
    ...pender({
      type: WRITE,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        const item = {
          _id: data._id,
          category: data.category
        };
        return state
          .set("category", "")
          .set("_id", "")
          .update("categories", categories => [item, ...categories]);
      }
    }),
    ...pender({
      type: UPDATE_ITEM,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        const index = state
          .get("categories")
          .findIndex(item => item._id === data._id);
        return state
          .set("category", "")
          .set("_id", "")
          .updateIn(["categories", index], item => ({
            category: data.category,
            _id: data._id
          }));
      }
    }),
    ...pender({
      type: DELETE_ITEM,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        const index = state
          .get("categories")
          .findIndex(item => item._id === data.id);
        return state
          .set("category", "")
          .set("_id", "")
          .set("page", 1)
          .set("lastPage", 1)
          .deleteIn(["categories", index]);
      }
    }),
    ...pender({
      type: GET_LIST,
      onSuccess: (state, action) => {
        const lastPage = Number(action.payload.headers["last-page"]);
        return state
          .set("categories", action.payload.data)
          .set("lastPage", lastPage);
      }
    }),
    ...pender({
      type: GET_ITEM,
      onSuccess: (state, action) => {
        return state
          .set("category", action.payload.data.category)
          .set("_id", action.payload.data._id);
      }
    }),
    ...pender({
      type: GET_APPEND_LIST,
      onSuccess: (state, action) => {
        const lastPage = Number(action.payload.headers["last-page"]);
        const arr = state.get("categories");
        return state
          .set("categories", [...arr, ...action.payload.data])
          .set("lastPage", lastPage)
          .set("page", state.get("page") + 1);
      }
    })
  },
  initialState
);
