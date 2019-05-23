import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

import dummy from "dummyData/initializeData";
import {
  // addVolumeList,
  convertUserOrdersToOrders,
  buyConclusion,
  sellConclusion,
  calcTodayPrice,
  autoDecimalRound,
  setChartData
} from "lib/common";
// import { decimalRound } from "lib/tools";
// import { autoDecimalRound } from "../../lib/common";

const {
  coins,
  myInfo,
  ownCoins,
  buyingOrders,
  sellingOrders,
  userBuyingOrders,
  userSellingOrders,
  concludedOrders,
  chartData
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
const CANCEL_ORDER = "stock/CANCEL_ORDER";
const SET_DUMY_DATA = "stock/SET_DUMY_DATA";

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
export const cancelOrder = createAction(CANCEL_ORDER);
export const setDumyData = createAction(SET_DUMY_DATA);

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
  buyingOrders: buyingOrders, // 매수 주문
  sellingOrders: sellingOrders, // 매도 주문
  userBuyingOrders: userBuyingOrders, // 유저 구매 주문
  userSellingOrders: userSellingOrders, // 유저 판매 주문
  dummyUserOrdersId: 3, // userOrder 시 더미 id
  dumyConcludedId: 5, // 체결 primary key
  concludedOrders: concludedOrders, // 체결 정보
  chartData: chartData // 차트 데이터
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
      const { coinId } = selectedCoin.toJS();
      const myInfo = state.get("myInfo").toJS();
      const orderId = state.get("dummyUserOrdersId") + 1;
      const now = new Date().getTime();
      const orderToltalPrice = parseInt(orderVolume * orderPrice, 10);
      const userBuyingOrders = state.get("userBuyingOrders");
      const userSellingOrders = state.get("userSellingOrders");
      let chartData = state.get("chartData");
      let ownCoins = state.get("ownCoins");
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
      // console.log("> concludedInfo: ", conclusionInfo);

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

      // 소유 코인 업데이트
      if (conclusionInfo.buyedTotalAmount > 0) {
        const coinIndex = ownCoins.findIndex(
          item => item.get("coinId") === coinId
        );
        const ownCoinAmount = ownCoins.getIn([coinIndex, "ownAmount"]);
        const ownCoinLockedAmount = ownCoins.getIn([coinIndex, "lockedAmount"]);
        ownCoins = ownCoins
          .setIn(
            [coinIndex, "ownAmount"],
            ownCoinAmount + conclusionInfo.buyedTotalAmount
          )
          .setIn(
            [coinIndex, "lockedAmount"],
            ownCoinLockedAmount - conclusionInfo.buyedTotalAmount < 0
              ? 0
              : ownCoinLockedAmount - conclusionInfo.buyedTotalAmount
          );
        // console.log(coinIndex, ownCoinAmount, ownCoinLockedAmount);
      }

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

      // 체결 정보 합치기
      const concludedHistory = state
        .get("concludedOrders")
        .concat(conclusionInfo.concludedOrders);
      // console.log(
      //   "> concludedHistory: ",
      //   conclusionInfo.concludedOrders.toJS(),
      //   concludedHistory.toJS()
      // );

      // 체결이 됐을 경우
      if (
        conclusionInfo.topConcludedOrderPrice !== undefined &&
        conclusionInfo.lowConcludedOrderPrice !== undefined
      ) {
        chartData = setChartData({
          chartData,
          coinId,
          topPrice: conclusionInfo.topConcludedOrderPrice,
          currentPrice: conclusionInfo.topConcludedOrderPrice,
          lowPrice: conclusionInfo.lowConcludedOrderPrice,
          concludedTime: now
        });
        // console.log("> chartData: ", chartData.toJS());
      }

      return state
        .set("userBuyingOrders", conclusionInfo.userBuyingOrders)
        .set("userSellingOrders", conclusionInfo.userSellingOrders)
        .set("dummyUserOrdersId", conclusionInfo.dumyConcludedId)
        .set("buyingOrders", List(buyingVolumeList))
        .set("sellingOrders", List(sellingVolumeList))
        .set("myInfo", Map(myInfo))
        .set("coins", todayTradeInfo.coins)
        .set("selectedCoin", todayTradeInfo.selectedCoin)
        .set("concludedOrders", concludedHistory)
        .set("chartData", chartData)
        .set("ownCoins", ownCoins);
    },

    // ===== 매도 주문
    [SUBMIT_SELLING_ORDER]: (state, action) => {
      const { orderVolume, orderPrice } = action.payload;
      let selectedCoin = state.get("selectedCoin");
      const { coinId } = selectedCoin.toJS();
      let ownCoins = state.get("ownCoins");
      const myInfo = state.get("myInfo").toJS();
      const orderId = state.get("dummyUserOrdersId") + 1;
      const now = new Date().getTime();
      let userBuyingOrders = state.get("userBuyingOrders");
      let userSellingOrders = state.get("userSellingOrders");
      let chartData = state.get("chartData");
      const orderData = {
        orderType: "sell",
        orderid: orderId,
        coinId: coinId,
        ordererId: myInfo.userId,
        orderAmount: orderVolume,
        currentAmount: orderVolume,
        concludedAmount: 0,
        orderPrice: orderPrice,
        isConclusion: false,
        orderTime: now
      };
      // console.log("---> SUBMIT_SELLING_ORDER", orderData);

      // 체결 처리.
      const conclusionInfo = sellConclusion(
        userBuyingOrders,
        userSellingOrders,
        orderData,
        state.get("dumyConcludedId")
      );
      const { selledTotalPrice } = conclusionInfo;
      // console.log(
      //   "> concludedInfo: ",
      //   conclusionInfo
      //   // conclusionInfo.userBuyingOrders.toJS(),
      //   // conclusionInfo.userSellingOrders.toJS()
      // );

      // orders volume
      const buyingVolumeList = convertUserOrdersToOrders(
        conclusionInfo.userBuyingOrders.toJS()
      );
      const sellingVolumeList = convertUserOrdersToOrders(
        conclusionInfo.userSellingOrders.toJS()
      );
      // console.log("> orderVolume: ", conclusionInfo.userSellingOrders.toJS());

      // 소유 코인 업데이트
      const ownCoinIndex = ownCoins.findIndex(
        item => item.get("coinId") === coinId
      );
      const ownCoinInfoJS = ownCoins.get(ownCoinIndex).toJS();
      const ownCoinCalcAmount = autoDecimalRound(
        ownCoinInfoJS.ownAmount - orderVolume
      );

      // 소유 금액 더하기
      myInfo.ownPrice += selledTotalPrice;

      // 금일 현재가/고가/저가/총거래량/총거래금액/매수.매도 잔여량 계산
      const todayTradeInfo = calcTodayPrice({
        coins: state.get("coins"),
        selectedCoin: selectedCoin,
        currentPrice: conclusionInfo.topConcludedOrderPrice,
        topPrice: conclusionInfo.topConcludedOrderPrice,
        lowPrice: conclusionInfo.lowConcludedOrderPrice,
        tradeVolume: conclusionInfo.selledTotalAmount,
        tradePrice: conclusionInfo.selledTotalPrice,
        selledTotalAmount: conclusionInfo.selledTotalAmount,
        remainingSellAmount: conclusionInfo.remainingAmount
      });
      // console.log(
      //   "> sell calcTodayPrice: ",
      //   todayTradeInfo.coins.toJS(),
      //   todayTradeInfo.selectedCoin
      // );

      // 체결 정보 합치기
      const concludedHistory = state
        .get("concludedOrders")
        .concat(conclusionInfo.concludedOrders);

      // 체결이 됐을 경우
      if (
        conclusionInfo.topConcludedOrderPrice !== undefined &&
        conclusionInfo.lowConcludedOrderPrice !== undefined
      ) {
        chartData = setChartData({
          chartData,
          coinId,
          topPrice: conclusionInfo.topConcludedOrderPrice,
          currentPrice: conclusionInfo.topConcludedOrderPrice,
          lowPrice: conclusionInfo.lowConcludedOrderPrice,
          concludedTime: now
        });
        // console.log("> chartData: ", chartData.toJS());
      }

      // state 셋팅
      return state
        .set("userBuyingOrders", conclusionInfo.userBuyingOrders)
        .set("userSellingOrders", conclusionInfo.userSellingOrders)
        .set("dummyUserOrdersId", conclusionInfo.dumyConcludedId)
        .set("buyingOrders", List(buyingVolumeList))
        .set("sellingOrders", List(sellingVolumeList))
        .set("myInfo", Map(myInfo))
        .set("coins", todayTradeInfo.coins)
        .setIn(["ownCoins", ownCoinIndex, "ownAmount"], ownCoinCalcAmount)
        .setIn(
          ["ownCoins", ownCoinIndex, "lockedAmount"],
          conclusionInfo.remainingAmount
        )
        .set("selectedCoin", todayTradeInfo.selectedCoin)
        .set("concludedOrders", concludedHistory)
        .set("chartData", chartData);
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
    },

    // ===== 취소 주문
    [CANCEL_ORDER]: (state, action) => {
      const { orderId, orderType } = action.payload;

      const userOrdersName =
        orderType === "buy" ? "userBuyingOrders" : "userSellingOrders";
      const userOrders = state.get(userOrdersName);
      const orderIndex = userOrders.findIndex(
        item => item.get("orderId") === orderId
      );
      const userOrderJS = userOrders.get(orderIndex).toJS(); // 취소할 주문 정보
      const volumeOrdersName =
        orderType === "buy" ? "buyingOrders" : "sellingOrders";
      // volumeList의 coinIndex
      let volumeCoinIndex = state
        .get(volumeOrdersName)
        .findIndex(item => item.coinId === userOrderJS.coinId);
      let volumeOrdersJS = state.get(volumeOrdersName).toJS();
      let volumeOrderIndex; // volume orders의 인덱스
      const myInfoJS = state.get("myInfo").toJS();
      const ownCoins = state.get("ownCoins");
      const ownCoinIndex = ownCoins.findIndex(
        item => item.get("coinId") === userOrderJS.coinId
      );
      let ownCoinAmount = ownCoins.getIn([ownCoinIndex, "ownAmount"]);
      let ownCoinlockedAmount = ownCoins.getIn([ownCoinIndex, "lockedAmount"]);

      if (orderType === "buy") {
      } else if (orderType === "sell") {
      }

      // modify volume order
      volumeOrdersJS[volumeCoinIndex].orders.map((item, index) => {
        if (item.orderPrice === userOrderJS.orderPrice) {
          volumeOrderIndex = index;
          item.orderAmount -= userOrderJS.currentAmount;
        }
        return item;
      });

      // 수량이 0개 이하인 volume은 삭제한다.
      if (
        volumeOrdersJS[volumeCoinIndex].orders[volumeOrderIndex].orderAmount <=
        0
      ) {
        volumeOrdersJS[volumeCoinIndex].orders.splice(volumeOrderIndex, 1);
      }

      // 매수 취소시
      if (orderType === "buy") {
        // 주문되어 있던 현금 추가
        const lockedPrice = userOrderJS.currentAmount * userOrderJS.orderPrice;
        myInfoJS.ownPrice += parseInt(lockedPrice, 10);
        myInfoJS.lockedPrice -= parseInt(lockedPrice, 10);
      } else {
        // 주문걸려 있던 코인 수량 추가
        ownCoinAmount = autoDecimalRound(
          ownCoinAmount + userOrderJS.currentAmount
        );
        ownCoinlockedAmount = autoDecimalRound(
          ownCoinlockedAmount - userOrderJS.currentAmount
        );
      }

      // console.log(
      //   "---> orderCancel: ",
      //   orderId,
      //   orderType,
      //   // volumeOrdersName,
      //   // volumeOrderIndex,
      //   userOrderJS,
      //   myInfoJS
      //   // volumeOrdersJS,
      //   // ownCoinIndex,
      //   // ownCoinAmount,
      //   // ownCoinlockedAmount
      // );
      return state
        .setIn([userOrdersName, orderIndex, "isCancel"], true)
        .set(volumeOrdersName, List(volumeOrdersJS))
        .set("myInfo", Map(myInfoJS))
        .setIn(["ownCoins", ownCoinIndex, "ownAmount"], ownCoinAmount)
        .setIn(["ownCoins", ownCoinIndex, "lockedAmount"], ownCoinlockedAmount);
    },

    // ===== 더미 데이터
    [SET_DUMY_DATA]: (state, action) => {
      const coinsJS = state.get("coins").toJS();
      let userBuyingOrders = state.get("userBuyingOrders");
      let userSellingOrders = state.get("userSellingOrders");
      // let chartData = state.get("chartData");
      const btcInfo = coinsJS[0];
      const bchInfo = coinsJS[1];
      let buyOrderPrice;
      let sellOrderPrice;
      let setCoinId;
      // const timestamp = new Date().getTime() - 1000 * 60 * 40;
      // let concludedTime;
      // let btcChartOpenPrice;
      // let btcChartTopPrice;
      // let btcChartLowPrice;
      // let btcChartClosePrice;

      // 매수 데이터 셋팅
      for (let i = 0; i < 40; i++) {
        if (i <= 19) {
          setCoinId = 0;
          buyOrderPrice =
            btcInfo.currentPrice -
            i * btcInfo.tickPrice -
            (i === 0 && btcInfo.tickPrice);
          sellOrderPrice = btcInfo.currentPrice + i * btcInfo.tickPrice;
        } else {
          setCoinId = 1;
          buyOrderPrice =
            bchInfo.currentPrice -
            i * bchInfo.tickPrice -
            (i === 0 && bchInfo.tickPrice);
          sellOrderPrice = bchInfo.currentPrice + i * bchInfo.tickPrice;
        }
        userBuyingOrders = userBuyingOrders.push(
          Map({
            orderId: "ubo" + i, // 주문 번호
            coinId: setCoinId,
            orderType: "buy",
            ordererId: 0, // 주문자 id
            orderAmount: 2, // 주문량
            currentAmount: 2, // 현재 주문량
            concludedAmount: 0, // 체결된 주문량
            orderPrice: buyOrderPrice, // 주문 가격
            isConclusion: false, // 체결 완료
            isCancel: false, // 주문 취소
            orderTime: 1 // 주문 시간
          })
        );
        userSellingOrders = userSellingOrders.push(
          Map({
            orderId: "uso" + i, // 주문 번호
            coinId: setCoinId,
            orderType: "sell",
            ordererId: 0, // 주문자 id
            orderAmount: 2, // 주문량
            currentAmount: 2, // 현재 주문량
            concludedAmount: 0, // 체결된 주문량
            orderPrice: sellOrderPrice, // 주문 가격
            isConclusion: false, // 체결 완료
            isCancel: false, // 주문 취소
            orderTime: 1 // 주문 시간
          })
        );

        // concludedTime = timestamp + i * 1000 * 60;

        // chartData = chartData.setIn(
        //   [0, "data", i],
        //   Map({
        //     concludedTime: concludedTime,
        //     x: new Date(concludedTime),
        //     y: [
        //       btcInfo.currentPrice,
        //       btcInfo.currentPrice,
        //       btcInfo.currentPrice,
        //       btcInfo.currentPrice
        //     ]
        //   })
        // );
      }

      // console.log(chartData.toJS());

      return state
        .set("userBuyingOrders", userBuyingOrders)
        .set("userSellingOrders", userSellingOrders);
      // .set("chartData", chartData);
    }
  },
  initialState
);
