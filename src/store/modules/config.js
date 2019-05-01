import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";

import { Map } from "immutable";

import * as api from "lib/api";

//action types
const GET_CONFIG = "config/GET_CONFIG";
const TOGGLE_COMPLETE_VIEW = "config/TOGGLE_COMPLETE_VIEW";
const SET_TOGGLE_COMPLETE_VIEW = "config/SET_TOGGLE_COMPLETE_VIEW";

//action creators
export const getConfig = createAction(GET_CONFIG, api.getConfig);
export const toggleCompleteView = createAction(
  TOGGLE_COMPLETE_VIEW,
  api.toggleCompleteView
);
export const setToggleCompleteView = createAction(SET_TOGGLE_COMPLETE_VIEW);

//initial state
const initialState = Map({
  toggleCompleteView: false // 전체 보기
});

export default handleActions(
  {
    ...pender({
      type: GET_CONFIG,
      onSuccess: (state, action) => {
        const { toggleCompleteView } = action.payload.data;
        return state.set("toggleCompleteView", toggleCompleteView);
      },
      onError: e => console.log(e)
    }),
    // toggleCompleteView를 셋팅 한다. pender는 작동 안함.
    [SET_TOGGLE_COMPLETE_VIEW]: (state, action) => {
      return state.set("toggleCompleteView", action.payload);
    },
    ...pender({
      type: TOGGLE_COMPLETE_VIEW,
      onSuccess: (state, action) => {
        const { toggleCompleteView } = action.payload.data;
        return state.set("toggleCompleteView", toggleCompleteView);
      },
      onError: e => console.log(e)
    })
  },
  initialState
);
