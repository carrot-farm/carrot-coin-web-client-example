import { List, Map } from "immutable";
/*
  프로젝트별 공통 함수
*/
import {
  decimalFloor,
  commSet,
  calcRatio,
  jsonSort,
  // jsonFindAll,
  decimalRound
} from "lib/tools";

// ===== 매수량 계산
export const calcVolume = (price, totalPrice) => {
  let result = decimalFloor(totalPrice / price, 4);
  return result;
};

// ===== 매수액 계산
export const calcPrice = (volume, totalPrice) => {
  const result = Math.floor(totalPrice / volume);
  return result;
};

// ===== 매수 총액 계산
export const calcTotalPrice = (price, volume) => {
  const result = volume * price;
  return result;
};

// ===== 매수액, 수량 입력시 결제 금액과 수량도 같이 계산
export const calcTotalPriceResult = ({ price, volume, ownPrice }) => {
  let totalPrice = calcTotalPrice(price, volume);
  // console.log(
  //   "---> calcTotalPriceResult: ",
  //   price,
  //   volume,
  //   totalPrice,
  //   ownPrice
  // );
  if (ownPrice < totalPrice) {
    price = calcPrice(volume, ownPrice);
    totalPrice = calcTotalPrice(price, volume);
    volume = calcVolume(price, totalPrice);
  }
  // console.log("---- ", price, volume, totalPrice);
  return {
    volume,
    price,
    totalPrice
  };
};

// ===== 코인 정보 초기화
export const initializeCoins = coins => {
  coins.map(coin => {
    coin.currentPriceCommSet = commSet(coin.currentPrice);
    coin.movingRatio = calcRatio(coin.dayBeforePrice, coin.currentPrice, 2);
    coin.todayTopPriceCommSet = commSet(coin.todayTopPrice);
    coin.todayTopPriceRatio = calcRatio(
      coin.dayBeforePrice,
      coin.todayTopPrice,
      2
    );
    coin.todayLowerPriceCommSet = commSet(coin.todayLowerPrice);
    coin.todayLowerPriceRatio = calcRatio(
      coin.dayBeforePrice,
      coin.todayLowerPrice,
      2
    );
    coin.dayBeforePriceCommSet = commSet(coin.dayBeforePrice);
    coin.dayBeforeDiff = coin.currentPrice - coin.dayBeforePrice;
    coin.dayBeforeDiffCommSet = commSet(coin.dayBeforeDiff);
  });
  return coins;
};

// ==== 주문리스트 정렬
export const sortOrders = (
  orders,
  _selectedCoin,
  orderDirection = true, // true: asc, false: desc // 가격을 기준으로 정렬
  // isConclusion = false, // 체결 완료
  sortReverse = false // 역 정렬 10개.
) => {
  let selectedCoinIndex = 0;
  const _selectedCoinId = _selectedCoin.coinId;
  const dayBeforePrice = _selectedCoin.dayBeforePrice;
  let sortedOrders = [];
  let commSetOrders = [];
  let i = 0;
  let k = 9;
  let m = 0;

  // 정렬, 역정렬 함수.
  const sortFn = (i, _sortReverse) => {
    m = _sortReverse ? k - i : i;
    if (sortedOrders[m]) {
      commSetOrders[i] = {
        ...sortedOrders[m],
        orderAmountCommSet: commSet(sortedOrders[m].orderAmount, true),
        orderPriceCommSet: commSet(sortedOrders[m].orderPrice),
        orderRatio: calcRatio(dayBeforePrice, sortedOrders[m].orderPrice)
      };
      commSetOrders[i].orderRatioCommSet =
        commSet(commSetOrders[i].orderRatio, true) + "%";
      if (commSetOrders[i].orderRatio > 0) {
        commSetOrders[i].orderRatio = "+" + commSetOrders[i].orderRatio;
      }
    } else {
      commSetOrders[i] = {
        orderId: _selectedCoinId + "_" + i,
        orderPriceCommSet: "",
        orderRatio: ""
      };
    }
  };

  // console.log(
  //   "---> sortOrders",
  //   orders,
  //   _selectedCoinId,
  //   orderDirection,
  //   isConclusion
  // );
  // order 배열이 작을 경우 내보내기
  if (orders.length < 1) {
    return orders;
  }

  // order index 찾기.
  selectedCoinIndex = orders.findIndex(item => {
    return item.coinId === _selectedCoinId;
  });
  // console.log("> selectedCoinIndex: ", selectedCoinIndex);
  // 매수 order 가져오기.
  sortedOrders = orders[selectedCoinIndex].orders;
  // console.log("> findOrders: ", sortedOrders);

  // order 정렬
  sortedOrders = jsonSort(sortedOrders, "orderPrice", orderDirection);
  // console.log("> sorted: ", sortedOrders);
  for (; i < 10; i++) {
    sortFn(i, sortReverse);
  }
  // console.log("----", commSetOrders);
  return commSetOrders;
};

/* ===== 주문 필터링
  @ desc
    - 코인 아이디 및 체결 여부 등을 기준으로 userOrders를 필터링
*/
export const ordersFilter = ({
  orders,
  coinId, // 필수
  ordererId,
  isConclusion = false
  // orderPriceSortDirection = "asc",
  // orderTimeSortDirection = "asc"
}) => {
  let filteredOrders = [];
  let i = 0,
    k = 0,
    len = orders.length;

  // console.log(
  //   "---> ordersFilter: ",
  //   orders,
  //   coinId,
  //   ordererId,
  //   isConclusion,
  //   orderPriceSortDirection,
  //   orderTimeSortDirection
  // );
  // coinId 필터링
  for (; i < len; i++) {
    if (orders[i].coinId === coinId) {
      if (ordererId !== undefined) {
        if (
          orders[i].ordererId === ordererId &&
          orders[i].isConclusion === isConclusion
        ) {
          filteredOrders[k++] = orders[i];
        }
      } else {
        if (orders[i].isConclusion === isConclusion) {
          filteredOrders[k++] = orders[i];
        }
      }
    }
  }
  // console.log("|||| ", filteredOrders);
  return filteredOrders;
};

// ===== orderList에 수량 추가
export const addVolumeList = (
  orderList,
  { coinId, orderPrice, orderAmount }
) => {
  let i = 0;
  let len = orderList.length;
  let orders = [];
  let success = false; // 수량 추가 성공
  // console.log("---> addVolumeList: ", orderList, coinId, orderPrice, orderAmount);

  // 코인 정보 찾기
  for (; i < len; i++) {
    if (orderList[i].coinId === coinId) {
      orders = orderList[i].orders;
      break;
    }
  }
  // console.log("> orders", orders, orderIndex);

  // console.log("> add volume", orders[i].orderAmount + orderAmount);
  // 수량 추가
  for (i = 0, len = orders.length; i < len; i++) {
    if (orders[i].orderPrice === orderPrice) {
      if (!Number.isInteger(orderAmount)) {
        orderAmount = parseFloat(decimalFloor(orderAmount, 3));
      }
      orders[i].orderAmount += orderAmount;
      if (!Number.isInteger(orders[i].orderAmount)) {
        orders[i].orderAmount = parseFloat(
          decimalRound(orders[i].orderAmount, 3)
        );
      }
      success = true;
    }
  }
  // console.log("> add volume", orders, success);

  // 신규 가격일 경우 리트스 추가
  if (success === false) {
    orders.push({
      orderAmount: parseFloat(decimalFloor(orderAmount, 3)),
      orderPrice: orderPrice
    });
  }
  // console.log("> result", orderList);
  return orderList;
};

// ===== 나올경우 자동으로 지정된 자리수에서 decimalRound를 실행하고 정수일 경우는 그냥 반환한다.
export const autoDecimalRound = (num, digits = 4) => {
  if (!Number.isInteger(num)) {
    return parseFloat(decimalRound(num, digits));
  }
  return num;
};

/*
  ===== 매수 체결
  @params
    userBuyingOrders(immList): 유저 매수 리스트
    userSellingOrders(immList): 유저 매도 리스트
    orderData(obj): 매수 주문 데이터
    dumyConcludedId(int): 체결 리스트 id(임시 사용)
  @return
    userSellingOrders(immList): 체결/일부체결/미체결이 반영된 판매 정보.
    userBuyingOrders(immList): 체결 정보가 반영된 list,
    concludedOrders(immList): 체결된 정보들.
    remainingTotalPrice(int): 체결 후 남은 잔여 매수액
    remainingAmount(float): 체결 후 남은 잔여 매수량
    buyedTotalAmount(float): 매수 총량(myInfo 총량 업데이트)
    buyedTotalPrice(int): 매수 총액
    topConcludedOrderPrice(int): 고가 체결 금액(고가/저가 표시에 사용.)
    lowConcludedOrderPrice(int): 저가 체결 금액(고가/저가 표시에 사용.)
*/
export const buyConclusion = (
  userBuyingOrders,
  userSellingOrders,
  orderData,
  dumyConcludedId
) => {
  const { coinId, orderId, ordererId, orderPrice, orderAmount } = orderData;
  let userSellingOrdersJS = userSellingOrders.toJS();
  let remainingTotalPrice = autoDecimalRound(orderAmount * orderPrice); // 깍여나갈 잔여 계산액.
  let remainingAmount = orderAmount; // 잔여 매수량
  let buyAmount; // 잔여금액으로 매수 가능량.
  let buyedTotalAmount = 0; // 총 매수 량
  let buyedTotalPrice = 0; // 총 매수 량
  let concludedOrders = List([]);
  let concludedTime = new Date().getTime(); //  체결시간
  let isConclusion;
  let concludedIndex = []; // 체결된 인덱스
  let k = 0;
  let topConcludedOrderPrice;
  let lowConcludedOrderPrice;

  // 가격순 오름차순 정렬
  userSellingOrdersJS = jsonSort(userSellingOrdersJS, "orderPrice");
  // console.log("> sort userSellingOrders: ", userSellingOrdersJS);
  // userSellingOrders 의 내용 수정 / concludedOrders 에 체결 내역 추가.
  // 주문 총액누적 감소 / 유저주문 수량감소 / 체결량 증가 / isConclusion
  userSellingOrdersJS = userSellingOrdersJS.map((_item, index) => {
    let item = { ..._item };
    // console.log("> conclusion : ", item.orderPrice, item.orderAmount);
    if (
      remainingTotalPrice > 0 &&
      item.orderType === "sell" &&
      item.coinId === coinId &&
      item.currentAmount > 0 &&
      // item.isConclusion === false &&
      item.orderPrice <= orderPrice
    ) {
      // console.log("> for : ", item.orderPrice);
      let concludedAmount = 0;
      let currentAmount = item.currentAmount;
      // 현재 금액으로 주문 가능 총량
      buyAmount = autoDecimalRound(
        calcVolume(item.orderPrice, remainingTotalPrice)
      );
      // console.log("> buyAmount : ", item.orderPrice, buyAmount);
      // 매수 후 잔여량.
      remainingAmount = autoDecimalRound(item.currentAmount - buyAmount);
      // console.log("> remainingAmount : ", remainingAmount);
      // 체결량
      concludedAmount = remainingAmount < 0 ? item.currentAmount : buyAmount;
      // 잔여량이 마이너스 일 경우 양수 전환
      if (remainingAmount < 0) {
        remainingAmount = Math.abs(remainingAmount);
      }
      // 현재 남은 양
      currentAmount = autoDecimalRound(item.currentAmount - concludedAmount);
      // console.log(
      //   "> currentAmount: ",
      //   item.orderPrice,
      //   concludedAmount,
      //   currentAmount,
      //   item.orderAmount
      // );
      // 완전 체결 시
      isConclusion = currentAmount <= 0 ? true : false; // 주문이 전체 체결 됐나 확인.

      // 남은 총액
      remainingTotalPrice -= autoDecimalRound(
        concludedAmount * item.orderPrice
      );
      // 총 매수량
      buyedTotalAmount = autoDecimalRound(buyedTotalAmount + concludedAmount);

      // 체결되었을 때.
      if (concludedAmount > 0) {
        // concludedOrders push
        concludedIndex[k++] = index;
        concludedOrders = concludedOrders.push(
          Map({
            concludedId: ++dumyConcludedId,
            buyOrderId: orderId,
            buyerId: ordererId,
            sellOrderId: item.orderId,
            sellerId: item.ordererId,
            orderPrice: item.orderPrice,
            concludedAmount,
            concludedTime
          })
        );

        // 고가
        topConcludedOrderPrice =
          !topConcludedOrderPrice || topConcludedOrderPrice < item.orderPrice
            ? item.orderPrice
            : topConcludedOrderPrice;

        // 저가
        lowConcludedOrderPrice =
          !lowConcludedOrderPrice || lowConcludedOrderPrice > item.orderPrice
            ? item.orderPrice
            : lowConcludedOrderPrice;

        buyedTotalPrice += item.orderPrice;
      }

      // 주문 정보 업데이트
      item = {
        ...item,
        currentAmount,
        concludedAmount,
        isConclusion,
        concludedTime
      };
    }
    return Map(item);
  });
  // console.log("> userSellingOrders: ", userSellingOrdersJS);

  // 사용자 매수 주문들
  // 잔여량 재계산
  remainingAmount = autoDecimalRound(
    calcVolume(orderPrice, remainingTotalPrice)
  );
  // 주문 체결량
  const buyConcludedAmount =
    remainingAmount > 0
      ? autoDecimalRound(orderAmount - remainingAmount)
      : orderAmount;
  // 현재 남은 주문 수량
  const buyCurrentAmount = remainingAmount;

  // userBuyingOrders에 push
  userBuyingOrders = userBuyingOrders.push(
    Map({
      ...orderData,
      isConclusion: buyCurrentAmount > 0 ? false : true,
      currentAmount: buyCurrentAmount,
      concludedAmount: buyConcludedAmount
    })
  );
  // console.log("> userBuyingOrders 추가:", userBuyingOrders.toJS());

  return {
    userSellingOrders: List(userSellingOrdersJS),
    userBuyingOrders,
    concludedOrders,
    remainingTotalPrice,
    remainingAmount,
    buyedTotalAmount,
    buyedTotalPrice,
    topConcludedOrderPrice,
    lowConcludedOrderPrice
  };
};

// eslint-disable-next-line flowtype/require-valid-file-annotation
/*
  ===== userOrders를 orders volume list로 전환
  @flow
    - coinId가 존재하는지 검사
      :-> coinId가 없을 경우 새로 생성. 0번째에 삽입
      :-> coinId가 존재할 경우
        :-> 동일 가격이 존재 하지않으면 orders에 삽입.
        :-> 동일가격이 존재 하면 amount 누적.
  @params(obj)
    - userOrders(jsonArray)
  @return
    - orders(jsonArray)
*/
export const convertUserOrdersToOrders = userOrders => {
  let orders = [];
  let coinIdIndex; // coinId의 index
  let orderIndex; // orders order 과 동일한 price가 있을 경우.
  let i = 0, //
    k = 0,
    j = 0,
    len;
  let orderAmount;
  const filteredUserOrders = userOrders.filter(item => item.currentAmount > 0);
  len = filteredUserOrders.length;
  // console.log("---> convertUserOrdersToOrders: ", filteredUserOrders);

  for (; i < len; i++) {
    // coinId 가 존재 하는지 검사
    coinIdIndex = orders.findIndex(
      item => item.coinId === filteredUserOrders[i].coinId
    );
    if (coinIdIndex < 0) {
      // 해당 코인 id가 존재 하지 않을 경우 신규 생성
      orders[k++] = {
        coinId: filteredUserOrders[i].coinId,
        orders: [
          {
            orderAmount: filteredUserOrders[i].currentAmount,
            orderPrice: filteredUserOrders[i].orderPrice
          }
        ]
      };
    } else {
      // orders에 coinId가 존재 할 경우 orders 의 index.
      orderIndex = orders[coinIdIndex].orders.findIndex(
        item => item.orderPrice === filteredUserOrders[i].orderPrice
      );
      // 지정 price가 없을 경우.
      if (orderIndex < 0) {
        orders[coinIdIndex].orders.push({
          orderAmount: filteredUserOrders[i].currentAmount,
          orderPrice: filteredUserOrders[i].orderPrice
        });
      } else {
        orderAmount =
          orders[coinIdIndex].orders[orderIndex].orderAmount +
          filteredUserOrders[i].currentAmount;
        orderAmount = autoDecimalRound(orderAmount);
        orders[coinIdIndex].orders[orderIndex].orderAmount = orderAmount;
      }
    }
  }
  // console.log("> result: ", orders);
  return orders;
};

/* ===== 금일 현재가/고가/저가/총거래량/총거래금액 계산
  @params
    selectedCoin(immMap): 현재 선택되어져 있는 코인.
    coins(immList): 코인 리스트
    currentPrice(int): 현재가
    topPrice(int): 고가
    lowPrice(int): 저가
    tradeVolume(int): 거래량
    tradePrice(int): 거래금액
    remainingBuyAmount(int): 매수 잔량
    remainingSellAmount(int): 매수 잔량
  @return(obj)
    selectedCoin(immMap)
    coins(immList)
*/
export const calcTodayPrice = ({
  selectedCoin,
  coins,
  currentPrice,
  topPrice,
  lowPrice,
  tradeVolume,
  tradePrice,
  buyedTotalAmount,
  remainingBuyAmount,
  remainingSellAmount
}) => {
  let selectedCoinJS = selectedCoin.toJS();
  let coinsJS = coins.toJS();
  const coinId = selectedCoinJS.coinId;
  const coinIndex = coinsJS.findIndex(item => item.coinId === coinId);
  console.log("---> calcTodayPrice: ", tradeVolume);

  // 현재가
  selectedCoinJS.currentPrice = currentPrice;
  selectedCoinJS.currentPriceCommSet = commSet(currentPrice);

  // 현재가 - 전일종가 차이
  selectedCoinJS.dayBeforeDiff =
    selectedCoinJS.currentPrice - selectedCoinJS.dayBeforePrice;
  selectedCoinJS.dayBeforeDiffCommSet = commSet(selectedCoinJS.dayBeforeDiff);

  // 전일대비 증감률
  selectedCoinJS.movingRatio = calcRatio(
    selectedCoinJS.dayBeforePrice,
    currentPrice
  );

  // 고가
  if (selectedCoinJS.todayTopPrice < topPrice) {
    selectedCoinJS.todayTopPrice = topPrice;
    selectedCoinJS.todayTopPriceCommSet = commSet(topPrice);
    selectedCoinJS.todayTopPriceRatio = calcRatio(
      selectedCoinJS.dayBeforePrice,
      topPrice
    );
  }

  // 저가
  if (selectedCoinJS.todayLowerPrice > lowPrice) {
    selectedCoinJS.todayLowerPrice = lowPrice;
    selectedCoinJS.todayLowerPriceCommSet = commSet(lowPrice);
    selectedCoinJS.todayLowerPriceRatio = calcRatio(
      selectedCoinJS.dayBeforePrice,
      lowPrice
    );
  }

  // 총 거래량
  selectedCoinJS.todayTotalTradeVolume = autoDecimalRound(
    selectedCoinJS.todayTotalTradeVolume + tradeVolume
  );

  // 총 거래금액
  selectedCoinJS.todayTotalTradePrice += tradePrice;

  // 매수 시: 매도 잔량 반영
  if (buyedTotalAmount) {
    selectedCoinJS.remainingSellAmount -= buyedTotalAmount;
  }
  // 매수 잔량 반영
  if (remainingBuyAmount) {
    selectedCoinJS.remainingBuyAmount += remainingBuyAmount;
  }

  // coins 반영
  coinsJS[coinIndex] = selectedCoinJS;

  console.log("> result: ", selectedCoinJS, coinsJS);
  return {
    selectedCoin: Map(selectedCoinJS),
    coins: List(coinsJS)
  };
};
