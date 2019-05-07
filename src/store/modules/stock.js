import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
// import { pender } from "redux-pender";

import * as api from "lib/api";
import dummy from "dummyData/initializeData";

const { coins } = dummy;

//action types
const SET_SERACH_VALUE = "stock/SET_SERACH_VALUE";
const TOGGLE_FAVORITE_SW = "stock/TOGGLE_FAVORITE_SW";
const TOGGLE_FAVORITE_ITEM = "stock/TOGGLE_FAVORITE_ITEM";
const SET_COIN_LIST_SORTING = "stock/SET_COIN_LIST_SORTING";
// const OPEN_SIDE_MENU = "base/OPEN_SIDE_MENU";
// const CLOSE_SIDE_MENU = "base/CLOSE_SIDE_MENU";
// const SHOW_MODAL = "base/SHOW_MODAL";
// const HIDE_MODAL = "base/HIDE_MODAL";
// const CHECK_LOGIN = "base/CHECK_LOGIN";
// const GET_INITIAL_DATA = "base/GET_INITIAL_DATA"; //접속 시 촉 데이터 가져오기.
// const LOGOUT = "base/LOGOUT";
// const SET_HEAD_TITLE = "base/SET_HEAD_TITLE"; //헤드 타이틀 변경
// const SET_HEAD_DESCRIPTION = "base/SET_HEAD_DESCRIPTION";
// const TOGGLE_HEADER_CATEGORY = "base/TOGGLE_HEADER_CATEGORY"; // 헤더 카테고리 토글
// const TOGGLE_HEADER_SUBMIT = "base/TOGGLE_HEADER_SUBMIT"; // 헤더 글작성 버튼

//action creators
export const setSearchValue = createAction(SET_SERACH_VALUE);
export const toggleFavoriteSw = createAction(TOGGLE_FAVORITE_SW);
export const toggleFavoriteItem = createAction(TOGGLE_FAVORITE_ITEM);
export const setCoinListSorting = createAction(SET_COIN_LIST_SORTING);
// export const closeSideMenu = createAction(CLOSE_SIDE_MENU);
// export const showModal = createAction(SHOW_MODAL);
// export const hideModal = createAction(HIDE_MODAL);
// export const checkLogin = createAction(
//   CHECK_LOGIN,
//   api.check_login,
//   meta => meta
// );
// export const logout = createAction(LOGOUT, api.logout);
// export const getInitialData = createAction(
//   GET_INITIAL_DATA,
//   api.getInitialData
// );
// export const setHeadTitle = createAction(SET_HEAD_TITLE);
// export const setHeadDescription = createAction(SET_HEAD_DESCRIPTION);
// export const toggleHeaderCategory = createAction(TOGGLE_HEADER_CATEGORY);
// export const toggleHeaderSubmit = createAction(TOGGLE_HEADER_SUBMIT);

//initial state
const initialState = Map({
  coins: List(coins),
  searchValue: "",
  favoriteSw: false,
  coinListSortingField: "todayTotalTradePrice",
  coinListSortingDirection: "DESC"
});

export default handleActions(
  {
    // 검색값 입력
    [SET_SERACH_VALUE]: (state, action) => {
      return state.set("searchValue", action.payload);
    },
    // 즐겨찾기 보기
    [TOGGLE_FAVORITE_SW]: state => {
      return state.set("favoriteSw", !state.get("favoriteSw"));
    },
    // 아이템 즐겨찾기 토크
    [TOGGLE_FAVORITE_ITEM]: (state, action) => {
      return state.setIn(
        ["coins", action.payload, "isFavorite"],
        !state.getIn(["coins", action.payload, "isFavorite"])
      );
    },
    // 코인 리스트 정렬
    [SET_COIN_LIST_SORTING]: (state, action) => {
      let direction = "DESC";
      if (state.get("coinListSortingField") === action.payload) {
        direction =
          direction === state.get("coinListSortingDirection") ? "ASC" : "DESC";
      }
      return state
        .set("coinListSortingField", action.payload)
        .set("coinListSortingDirection", direction);
    }
  },
  initialState
);
