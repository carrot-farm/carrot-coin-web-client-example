import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

import dummy from "dummyData/initializeData";
import {
  addVolumeList,
  convertUserOrdersToOrders,
  buyConclusion,
  calcTodayPrice,
  autoDecimalRound
} from "lib/common";
import { decimalRound } from "lib/tools";
// import { autoDecimalRound } from "../../lib/common";

const {
  coins,
  myInfo,
  ownCoins,
  buyingOrders,
  sellingOrders,
  userBuyingOrders,
  userSellingOrders
} = dummy;

// ===== action types
const SET_SERACH_VALUE = "stock/SET_SERACH_VALUE";
const TOGGLE_FAVORITE_SW = "stock/TOGGLE_FAVORITE_SW";
const TOGGLE_FAVORITE_ITEM = "stock/TOGGLE_FAVORITE_ITEM";
const SET_COIN_LIST = "stock/SET_COIN_LIST";
const SET_COIN_LIST_SORTING = "stock/SET_COIN_LIST_SORTING";
const SELECT_COIN = "stock/SELECT_COIN";
const SET_ACTIVE_FORM = "stock/SET_ACTIVE_FORM";
const SET_MY_COIN = "stock/SET_MY_COIN";
const SUBMIT_BUYING_ORDER = "stock/SUBMIT_BUYING_ORDER";
const SUBMIT_SELLING_ORDER = "stock/SUBMIT_SELLING_ORDER";
const UPDATE_ORDERS = "stock/UPDATE_ORDERS";

// ===== action creators
export const setSearchValue = createAction(SET_SERACH_VALUE);
export const toggleFavoriteSw = createAction(TOGGLE_FAVORITE_SW);
export const toggleFavoriteItem = createAction(TOGGLE_FAVORITE_ITEM);
export const setCoinList = createAction(SET_COIN_LIST);
export const setCoinListSorting = createAction(SET_COIN_LIST_SORTING);
export const selectCoin = createAction(SELECT_COIN);
export const setActiveForm = createAction(SET_ACTIVE_FORM);
export const setMyCoin = createAction(SET_MY_COIN);
export const submitBuyingOrder = createAction(SUBMIT_BUYING_ORDER);
export const submitSellingOrder = createAction(SUBMIT_SELLING_ORDER);
export const updateOrders = createAction(UPDATE_ORDERS);

// ===== initial state
const initialState = Map({
  myInfo: Map(myInfo), // 나의 정보
  ownCoins: List(ownCoins), // 소유 코인 정보
  coins: List(coins), // 코인 리스트
  searchValue: "", // 검색값
  favoriteSw: false, // 즐겨찾기만 보기.
  coinListSortingField: "todayTotalTradePrice", // 코인 리스트 정렬 필드
  coinListSortingDirection: "DESC", // 코인 리스트 정렬 방향.
  selectedCoin: Map({}), // 선택된 코인 정보
  selectedMyCoin: Map({
    coinId: null,
    ownAmount: null,
    lockedAmount: 0
  }), // 현재 선택된 코인에 대한 나의 소유 코인 정보
  activeForm: "buyForm", // 활성화 폼 지정(buyForm/sellForm/cancelForm)
  buyingOrders: List(buyingOrders), // 매수 주문
  sellingOrders: List(sellingOrders), // 매도 주문
  userBuyingOrders: userBuyingOrders, // 유저 구매 주문
  userSellingOrders: userSellingOrders, // 유저 판매 주문
  dummyUserOrdersId: 3, // userOrder 시 더미 id
  dumyConcludedId: 0 // 체결 아이디
});

export default handleActions(
  {
    // ===== 검색값 입력
    [SET_SERACH_VALUE]: (state, action) => {
      return state.set("searchValue", action.payload);
    },

    // ===== 즐겨찾기 보기
    [TOGGLE_FAVORITE_SW]: state => {
      return state.set("favoriteSw", !state.get("favoriteSw"));
    },

    // ===== 아이템 즐겨찾기 토크
    [TOGGLE_FAVORITE_ITEM]: (state, action) => {
      const index = state.get("coins").findIndex(item => {
        return item.coinId === action.payload;
      });
      return state.setIn(
        ["coins", action.payload, "isFavorite"],
        !state.getIn(["coins", index, "isFavorite"])
      );
    },

    // ===== 즐겨찾기 보기
    [SET_COIN_LIST]: (state, action) => {
      return state.set("coins", action.payload);
    },

    // ===== 코인 리스트 정렬
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

    // ===== 활성화 코인 선택
    [SELECT_COIN]: (state, action) => {
      const index = state.get("coins").findIndex(item => {
        return item.coinId === action.payload;
      });
      return state.set("selectedCoin", Map(state.getIn(["coins", index])));
    },

    // ===== 활성화 코인에 대한 나의 소유 코인 정보
    [SET_MY_COIN]: (state, action) => {
      let selectedMyCoin = state
        .get("ownCoins")
        .filter(
          item => item.get("coinId") === state.get("selectedCoin").get("coinId")
        );
      // console.log(
      //   "---> SET_MY_COIN: ",
      //   selectedMyCoin.toJS(),
      //   state.get("selectedCoin").get("coinId")
      // );
      if (!selectedMyCoin.size) {
        selectedMyCoin = {
          coinId: state.get("selectedCoin").get("coinId"),
          amount: 0
        };
      } else {
        selectedMyCoin = selectedMyCoin.toJS()[0];
      }
      // console.log("> selectedMyCoin: ", selectedMyCoin);
      return state.set("selectedMyCoin", Map(selectedMyCoin));
    },

    // ===== 활성화 폼 지정
    [SET_ACTIVE_FORM]: (state, action) => {
      return state.set("activeForm", action.payload);
    },

    // ===== 매수 주문
    [SUBMIT_BUYING_ORDER]: (state, action) => {
      const { orderVolume, orderPrice } = action.payload;
      let selectedCoin = state.get("selectedCoin");
      const { coinId, remainingBuyAmount } = selectedCoin.toJS();
      const myInfo = state.get("myInfo").toJS();
      const orderId = state.get("dummyUserOrdersId") + 1;
      const now = new Date().getTime();
      const orderToltalPrice = parseInt(orderVolume * orderPrice, 10);
      const userBuyingOrders = state.get("userBuyingOrders");
      const userSellingOrders = state.get("userSellingOrders");
      let orderData = {
        orderType: "buy",
        orderId: orderId,
        coinId: coinId,
        ordererId: myInfo.userId,
        orderAmount: orderVolume,
        currentAmount: orderVolume,
        concludedAmount: 0,
        orderPrice: orderPrice,
        isConclusion: false,
        orderTime: now
      };
      // console.log("---> SUBMIT_BUYING_ORDER", orderData);

      // 체결처리
      const conclusionInfo = buyConclusion(
        userBuyingOrders,
        userSellingOrders,
        orderData,
        state.get("dumyConcludedId")
      );
      const { remainingTotalPrice, buyedTotalAmount } = conclusionInfo;
      console.log("> concludedInfo: ", conclusionInfo);

      // orders volume
      const buyingVolumeList = convertUserOrdersToOrders(
        conclusionInfo.userBuyingOrders.toJS()
      );
      const sellingVolumeList = convertUserOrdersToOrders(
        conclusionInfo.userSellingOrders.toJS()
      );
      // console.log("> orderVolume: ", buyingVolumeList);

      // orderData 업데이트
      if (remainingTotalPrice !== orderToltalPrice) {
        orderData.concludedAmount = buyedTotalAmount;
        orderData.isConclusion = remainingTotalPrice === 0 ? true : false;
      }
      // console.log("> update orderData: ", orderData);

      // 소유금액 빼기 / add lockedPrice
      myInfo.lockedPrice +=
        remainingTotalPrice === 0 ? orderToltalPrice : remainingTotalPrice;
      myInfo.ownPrice -= orderToltalPrice;
      // console.log("> lockedprice: ", myInfo.lockedPrice, myInfo.ownPrice);

      // 금일 현재가/고가/저가/총거래량/총거래금액/매수.매도 잔여량 계산
      const todayTradeInfo = calcTodayPrice({
        coins: state.get("coins"),
        selectedCoin: state.get("selectedCoin"),
        currentPrice: conclusionInfo.topConcludedOrderPrice,
        topPrice: conclusionInfo.topConcludedOrderPrice,
        lowPrice: conclusionInfo.lowConcludedOrderPrice,
        tradeVolume: conclusionInfo.buyedTotalAmount,
        tradePrice: conclusionInfo.buyedTotalPrice,
        buyedTotalAmount: conclusionInfo.buyedTotalAmount,
        remainingBuyAmount: conclusionInfo.remainingAmount
      });
      // console.log("> coinsInfo: ", todayTradeInfo);

      return state
        .set("userBuyingOrders", conclusionInfo.userBuyingOrders)
        .set("userSellingOrders", conclusionInfo.userSellingOrders)
        .set("dummyUserOrdersId", orderId)
        .set("buyingOrders", List(buyingVolumeList))
        .set("sellingOrders", List(sellingVolumeList))
        .set("myInfo", Map(myInfo))
        .set("coins", todayTradeInfo.coins)
        .set("selectedCoin", todayTradeInfo.selectedCoin);
    },

    // eslint-disable-next-line flowtype/require-valid-file-annotation
    /* ===== 매도 주문
     */
    [SUBMIT_SELLING_ORDER]: (state, action) => {
      const { orderVolume, orderPrice } = action.payload;
      let selectedCoin = state.get("selectedCoin");
      const { coinId, remainingSellAmount } = selectedCoin.toJS();
      let selectedMyCoin = state.get("selectedMyCoin").toJS();
      const ownCoins = state.get("ownCoins");
      const myInfo = state.get("myInfo").toJS();
      const orderId = state.get("dummyUserOrdersId") + 1;
      const now = new Date().getTime();
      const addRemainingSellAmount = remainingSellAmount + orderVolume; // 매도 잔량
      const orderData = {
        orderType: "sell",
        orderid: orderId,
        coinId: coinId,
        ordererId: myInfo.userId,
        orderAmount: orderVolume,
        concludedAmount: 0,
        orderPrice: orderPrice,
        isConclusion: false,
        orderTime: now
      };
      // console.log("---> SUBMIT_SELLING_ORDER", orderData);
      // push order list
      const newUserOrders = state.get("userSellingOrders").push(Map(orderData));
      // console.log("> push order list: ", newUserOrders.toJS());

      // addVolume
      const addedVolumeList = addVolumeList(state.get("sellingOrders").toJS(), {
        coinId,
        orderPrice,
        orderAmount: orderVolume
      });
      // console.log("> addedVolumeList: ", addedVolumeList);

      // 소유 코인 수량 변경 치 locackAmout 추가
      const lockedAmount = orderVolume;
      selectedMyCoin.ownAmount = selectedMyCoin.ownAmount - lockedAmount;
      if (!Number.isInteger(selectedMyCoin.ownAmount)) {
        selectedMyCoin.ownAmount = parseFloat(
          decimalRound(selectedMyCoin.ownAmount, 3)
        );
      }
      // const lockedPrice = parseInt(orderVolume * orderPrice, 10);
      // myInfo.lockedPrice += lockedPrice;
      // myInfo.ownPrice -= lockedPrice;
      // console.log("> selectedMyCoin: ", selectedMyCoin);

      // 보유 코인 리스트 lockedAmount,
      const changedOwnCoins = ownCoins.map(item => {
        if (item.get("coinId") === coinId) {
          return (item = Map(selectedMyCoin));
        }
        // console.log(item.toJS());
      });
      // console.log("> changedOwnCoins: ", changedOwnCoins.toJS());

      // 선택된 코인 매도 잔량 업데이트
      const _selectedCoin = {
        ...selectedCoin.toJS(),
        remainingSellAmount: !Number.isInteger(addRemainingSellAmount)
          ? parseFloat(decimalRound(addRemainingSellAmount, 3))
          : addRemainingSellAmount
      };
      // console.log(
      //   "> _selectedCoin: ",
      //   // remainingBuyAmount,
      //   // orderVolume,
      //   addRemainingBuyAmount,
      //   _selectedCoin
      // );

      // console.log("> myInfo: ", myInfo);
      return state
        .set("userSellingOrders", newUserOrders)
        .set("dummyUserOrdersId", orderId)
        .set("sellingOrders", List(addedVolumeList))
        .set("selectedCoin", Map(_selectedCoin))
        .set("selectedMyCoin", Map(selectedMyCoin))
        .set("ownCoins", changedOwnCoins);
    },

    // ===== userOrders를 volume orders로 컨버트
    [UPDATE_ORDERS]: state => {
      const buyingOrders = convertUserOrdersToOrders(
        state.get("userBuyingOrders").toJS()
      );
      const sellingOrders = convertUserOrdersToOrders(
        state.get("userSellingOrders").toJS()
      );
      // console.log("---> UPDATE_ORDERS: ", buyingOrders, sellingOrders);
      return state
        .set("buyingOrders", List(buyingOrders))
        .set("sellingOrders", List(sellingOrders));
    }
  },
  initialState
);
