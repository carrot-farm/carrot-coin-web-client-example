import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers(modules);//모듈 합치기
const middlewares  = [penderMiddleware()];

//개발자 모들일 때만 redux devtools를 적용
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDEX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools||compose;

// preloadedState는 추후 서버 사이드 랜더링을 했을 때 전달받는 초기 상태
const configure = (preloadedState) => createStore(reducers, preloadedState, 
   composeEnhancers(
      applyMiddleware(...middlewares)
   )
);

export default configure;
