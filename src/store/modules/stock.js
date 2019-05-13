import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

import dummy from "dummyData/initializeData";

const { coins, myInfo, buyingOrders, sellingOrders } = dummy;

// ===== action types
const SET_SERACH_VALUE = "stock/SET_SERACH_VALUE";
const TOGGLE_FAVORITE_SW = "stock/TOGGLE_FAVORITE_SW";
const TOGGLE_FAVORITE_ITEM = "stock/TOGGLE_FAVORITE_ITEM";
const SET_COIN_LIST = "stock/SET_COIN_LIST";
const SET_COIN_LIST_SORTING = "stock/SET_COIN_LIST_SORTING";
const SELECT_COIN = "stock/SELECT_COIN";
const SET_ACTIVE_FORM = "stock/SET_ACTIVE_FORM";

// ===== action creators
export const setSearchValue = createAction(SET_SERACH_VALUE);
export const toggleFavoriteSw = createAction(TOGGLE_FAVORITE_SW);
export const toggleFavoriteItem = createAction(TOGGLE_FAVORITE_ITEM);
export const setCoinList = createAction(SET_COIN_LIST);
export const setCoinListSorting = createAction(SET_COIN_LIST_SORTING);
export const selectCoin = createAction(SELECT_COIN);
export const setActiveForm = createAction(SET_ACTIVE_FORM);

// ===== initial state
const initialState = Map({
  myInfo: myInfo, // 나의 정보
  coins: List(coins), // 코인 리스트
  searchValue: "", // 검색값
  favoriteSw: false, // 즐겨찾기만 보기.
  coinListSortingField: "todayTotalTradePrice", // 코인 리스트 정렬 필드
  coinListSortingDirection: "DESC", // 코인 리스트 정렬 방향.
  selectedCoin: Map({}), // 선택된 코인 정보
  activeForm: "buyForm", // 활성화 폼 지정(buyForm/sellForm/cancelForm)
  buyingOrders: List(buyingOrders), // 매수 주문
  sellingOrders: List(sellingOrders) // 매도 주문
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
      const index = state.get("coins").findIndex(item => {
        return item.coinId === action.payload;
      });
      return state.setIn(
        ["coins", action.payload, "isFavorite"],
        !state.getIn(["coins", index, "isFavorite"])
      );
    },
    // 즐겨찾기 보기
    [SET_COIN_LIST]: (state, action) => {
      return state.set("coins", action.payload);
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
    },
    // 활성화 코인 선택
    [SELECT_COIN]: (state, action) => {
      const index = state.get("coins").findIndex(item => {
        return item.coinId === action.payload;
      });
      return state.set("selectedCoin", state.getIn(["coins", index]));
    },
    // 활성화 폼 지정
    [SET_ACTIVE_FORM]: (state, action) => {
      return state.set("activeForm", action.payload);
    }
  },
  initialState
);
