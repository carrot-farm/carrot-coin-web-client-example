import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";

import { inputCommSet } from "lib/tools";
import { calcTotalPriceResult } from "lib/common";

//action types
const INITIALIZE = "sellingForm/INITIALIZE";
const SET_DEFAULT_STATE = "sellingForm/SET_DEFAULT_STATE";
const SET_VOLUME = "sellingForm/SET_VOLUME";
const SET_PRICE = "sellingForm/SET_PRICE";
const SET_CALC_PRICE = "sellingForm/SET_CALC_PRICE";
const SET_TOTAL_PRICE = "sellingForm/SET_TOTAL_PRICE";
const TOGGLE_VOLUME_MENU = "sellingForm/TOGGLE_VOLUME_MENU";
const SET_FORM_VALUES = "sellingForm/SET_FORM_VALUES";
const SUBMIT_BUY_ORDER = "sellingForm/SUBMIT_BUY_ORDER";

//action creators
export const initialize = createAction(INITIALIZE);
export const setDefaultState = createAction(SET_DEFAULT_STATE);
export const setVolume = createAction(SET_VOLUME);
export const setPrice = createAction(SET_PRICE);
export const setCalcPrice = createAction(SET_CALC_PRICE);
export const setTotalPrice = createAction(SET_TOTAL_PRICE);
export const toggleVolumeMenu = createAction(TOGGLE_VOLUME_MENU);
export const setFormValues = createAction(SET_FORM_VALUES);
export const submitBuyOrder = createAction(SUBMIT_BUY_ORDER);

//initial state
const initialState = Map({
  sellingVolume: 0, // 매수수량
  sellingVolumeCommset: 0,
  sellingPrice: 0, // 매수기준가
  sellingPriceCommset: 0,
  sellingTotalPrice: 0, // 매수 총액
  sellingTotalPriceCommset: 0,
  volumeMenuAnchorEl: null // 매수수량 메뉴
});

//reducer
const buyingFormActions = handleActions(
  {
    // 초기화
    [INITIALIZE]: (state, action) => initialState,
    // 초기값 입력
    [SET_DEFAULT_STATE]: (state, action) => {
      return state;
    },
    // 매수수량 셋팅
    [SET_VOLUME]: (state, action) => {
      if (action.payload === undefined) {
        return state;
      }
      const result = inputCommSet(action.payload, 4);
      // console.log("---- setVolume: ", action.payload, result);
      if (!result) {
        return state;
      }
      return state
        .set("sellingVolume", result.number)
        .set("sellingVolumeCommset", result.numberCommSet);
    },
    // set menu el
    [TOGGLE_VOLUME_MENU]: (state, action) => {
      return state.set("volumeMenuAnchorEl", action.payload || null);
    },
    // 매수가격 셋팅
    [SET_PRICE]: (state, action) => {
      // console.log("---> SET_PRICE: ", action.payload);
      if (action.payload === undefined) {
        return state;
      }
      const price = inputCommSet(action.payload);
      return state
        .set("sellingPrice", price.number)
        .set("sellingPriceCommset", price.numberCommSet);
    },
    // 계산 후 매수 가격 설정
    [SET_CALC_PRICE]: (state, action) => {
      let price = action.payload;
      let volume = state.get("sellingVolume");
      const totalPrice = price * volume;
      const priceResult = inputCommSet(price);
      const volumeResult = inputCommSet(volume, 4);
      const totalPriceResult = inputCommSet(totalPrice);
      // console.log( "----> SET_CALC_PRICE: ", priceResult,volumeResult, totalPriceResult);
      return state
        .set("sellingVolume", volumeResult.number)
        .set("sellingVolumeCommset", volumeResult.numberCommSet)
        .set("sellingPrice", priceResult.number)
        .set("sellingPriceCommset", priceResult.numberCommSet)
        .set("sellingTotalPrice", totalPriceResult.number)
        .set("sellingTotalPriceCommset", totalPriceResult.numberCommSet);
    },
    // 매수 총액 셋팅
    [SET_TOTAL_PRICE]: (state, action) => {
      const result = inputCommSet(action.payload);
      if (action.payload === undefined) {
        return state;
      }
      return state
        .set("sellingTotalPrice", result.number)
        .set("sellingTotalPriceCommset", result.numberCommSet);
    }
  },
  initialState
);

export default buyingFormActions;
