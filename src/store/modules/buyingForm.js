import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";

import { inputCommSet } from "lib/tools";

//action types
const INITIALIZE = "buyingForm/INITIALIZE";
const SET_DEFAULT_STATE = "buyingForm/SET_DEFAULT_STATE";
const SET_VOLUME = "buyingForm/SET_VOLUME";
const SET_PRICE = "buyingForm/SET_PRICE";
const SET_TOTAL_PRICE = "buyingForm/SET_TOTAL_PRICE";

//action creators
export const initialize = createAction(INITIALIZE);
export const setDefaultState = createAction(SET_DEFAULT_STATE);
export const setVolume = createAction(SET_VOLUME);
export const setPrice = createAction(SET_PRICE);
export const setTotalPrice = createAction(SET_TOTAL_PRICE);

//initial state
const initialState = Map({
  buyingVolume: 0, // 매수수량
  buyingVolumeCommset: 0,
  buyingPrice: 0, // 매수기준가
  buyingPriceCommset: 0,
  buyingTotalPrice: 0, // 매수 총액
  buyingTotalPriceCommset: 0
});

//reducer
export default handleActions(
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
      // console.log("---> |||| setVolume: ", action.payload, result);
      if (!result) {
        return state;
      }
      return state
        .set("buyingVolume", result.number)
        .set("buyingVolumeCommset", result.numberCommSet);
    },
    // 매수가격 셋팅
    [SET_PRICE]: (state, action) => {
      const result = inputCommSet(action.payload);
      if (action.payload === undefined) {
        return state;
      }
      return state
        .set("buyingPrice", result.number)
        .set("buyingPriceCommset", result.numberCommSet);
    },
    // 매수 총액 셋팅
    [SET_TOTAL_PRICE]: (state, action) => {
      const result = inputCommSet(action.payload);
      if (action.payload === undefined) {
        return state;
      }
      return state
        .set("buyingTotalPrice", result.number)
        .set("buyingTotalPriceCommset", result.numberCommSet);
    }
  },
  initialState
);
