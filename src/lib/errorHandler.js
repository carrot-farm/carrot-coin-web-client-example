/*
    에러 핸들링.
*/
import * as baseActions from "store/modules/base";

// ===== api 전송시 에러 핸들링
export const api = async (state, action) => {
  const { payload } = action;
  //인증 실패
  if (payload.response.status === 401) {
    return failureAuth();
  }

  return false;
};

// ===== 인증 실패
export const failureAuth = async (state, payload) => {
  await baseActions.logout();
  alert("인증에 실패하였습니다.\n다시 로그인 해주십시요.");
  window.location.reload();
  return false;
};
