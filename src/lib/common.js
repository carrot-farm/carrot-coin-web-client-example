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
  sortReverse = false, // 역 정렬 10개.
  allEmptyData = false // 빈 객체로 전체를 체운다.
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
    if (allEmptyData === false && sortedOrders[m]) {
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
  //   _selectedCoin
  // );
  // order 배열이 클경우.
  if (orders.length > 0) {
    // return orders;
    // order index 찾기.
    selectedCoinIndex = orders.findIndex(item => {
      return item.coinId === _selectedCoinId;
    });
    // console.log("> selectedCoinIndex: ", selectedCoinIndex);
    // console.log("> sortedOrders: ", orders[selectedCoinIndex]);
    if (selectedCoinIndex >= 0) {
      // 매수 order 가져오기.
      sortedOrders = orders[selectedCoinIndex].orders;
      // console.log("> findOrders: ", sortedOrders);

      // order 정렬
      sortedOrders = jsonSort(sortedOrders, "orderPrice", orderDirection);
    }
  }

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
    dumyConcludedId(int): 체결 리스트 id(임시 사용)
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

  // 가격 오름차순 정렬
  userSellingOrdersJS = jsonSort(userSellingOrdersJS, "orderPrice");
  // console.log("> sort userSellingOrders: ", userSellingOrdersJS);

  // 체결
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
      // console.log(
      //   "> remainingAmount : ",
      //   // item.currentAmount,
      //   // buyAmount,
      //   remainingAmount
      // );
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
            concludedId: "c" + concludedTime + index,
            coinId: coinId,
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
      orderId: "b" + new Date().getTime(),
      isConclusion: buyCurrentAmount > 0 ? false : true,
      isCancel: false,
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
    lowConcludedOrderPrice,
    dumyConcludedId
  };
};
/*
  ===== 매도 체결
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
    selledTotalAmount(float): 매도 총량(myInfo 총량 업데이트)
    selledTotalPrice(int): 매도 총액
    topConcludedOrderPrice(int): 고가 체결 금액(고가/저가 표시에 사용.)
    lowConcludedOrderPrice(int): 저가 체결 금액(고가/저가 표시에 사용.)
    dumyConcludedId(int): 체결 리스트 id(임시 사용)
*/
export const sellConclusion = (
  userBuyingOrders,
  userSellingOrders,
  orderData,
  dumyConcludedId
) => {
  const { coinId, orderId, ordererId, orderPrice, orderAmount } = orderData;
  let userBuyingOrdersJS = userBuyingOrders.toJS();
  // let remainingTotalPrice = autoDecimalRound(orderAmount * orderPrice); // 깍여나갈 잔여 계산액.
  let remainingAmount = orderAmount; // 잔여 매수량
  let selledTotalAmount = 0; // 총 매수 량
  let selledTotalPrice = 0; // 총 매수 량
  let concludedOrders = List([]);
  let concludedTime = new Date().getTime(); //  체결시간
  let isConclusion;
  let concludedIndex = []; // 체결된 인덱스
  let k = 0;
  let topConcludedOrderPrice;
  let lowConcludedOrderPrice;

  // 가격 오름차순 정렬
  userBuyingOrdersJS = jsonSort(userBuyingOrdersJS, "orderPrice", false);
  // console.log("> sort userSellingOrders: ", userBuyingOrdersJS);

  // 체결 처리
  userBuyingOrdersJS = userBuyingOrdersJS.map((item, index) => {
    // console.log("> conclusion : ", item.orderPrice, item.orderAmount);
    if (
      remainingAmount > 0 &&
      item.orderType === "buy" &&
      item.coinId === coinId &&
      item.currentAmount > 0 &&
      // item.isConclusion === false &&
      item.orderPrice >= orderPrice
    ) {
      // console.log("> for : ", item.orderPrice);
      let concludedAmount = 0;
      let currentAmount = item.currentAmount;
      // 현재 금액으로 주문 가능 총량
      // buyAmount = remainingAmount;
      // // console.log("> buyAmount : ", item.orderPrice, buyAmount);
      // 체결량
      concludedAmount =
        remainingAmount >= item.currentAmount
          ? item.currentAmount
          : remainingAmount;
      // 매수 후 잔여량.
      remainingAmount = autoDecimalRound(remainingAmount - item.currentAmount);
      // console.log("> remainingAmount : ", remainingAmount, item.currentAmount);
      // 잔여량이 마이너스 일 경우 양수 전환
      if (remainingAmount < 0) {
        remainingAmount = Math.abs(remainingAmount);
      }
      // item 의 현재 남은 양
      currentAmount = autoDecimalRound(item.currentAmount - concludedAmount);
      // console.log(
      //   "> currentAmount: ",
      //   item.orderPrice,
      //   item.orderAmount,
      //   concludedAmount,
      //   remainingAmount,
      //   currentAmount
      // );
      // // 완전 체결 시
      isConclusion = currentAmount <= 0 ? true : false; // 주문이 전체 체결 됐나 확인.

      // 체결되었을 때.
      if (concludedAmount > 0) {
        // 총 매수액
        selledTotalPrice += parseInt(item.orderPrice * concludedAmount, 10);
        // 총 매수량
        selledTotalAmount = autoDecimalRound(
          selledTotalAmount + concludedAmount
        );
        // concludedOrders push
        concludedIndex[k++] = index;
        concludedOrders = concludedOrders.push(
          Map({
            concludedId: "c" + concludedTime + index,
            coinId: coinId,
            buyOrderId: item.orderId,
            buyerId: item.ordererId,
            sellOrderId: orderId,
            sellerId: ordererId,
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
  // console.log("> userSellingOrders: ", userBuyingOrdersJS);

  // 매도 주문 체결량
  const sellConcludedAmount =
    remainingAmount > 0
      ? autoDecimalRound(orderAmount - remainingAmount)
      : orderAmount;
  // console.log(
  //   "> sellConcludedAmount: ",
  //   sellConcludedAmount,
  //   orderAmount,
  //   remainingAmount
  // );

  // userBuyingOrders에 push
  userSellingOrders = userSellingOrders.push(
    Map({
      ...orderData,
      orderId: "s" + new Date().getTime(),
      isConclusion: remainingAmount > 0 ? false : true,
      isCancel: false,
      currentAmount: remainingAmount,
      concludedAmount: sellConcludedAmount
    })
  );
  // console.log("> userSellingOrders 추가:", userSellingOrders.toJS());

  return {
    userSellingOrders: userSellingOrders,
    userBuyingOrders: List(userBuyingOrdersJS),
    concludedOrders,
    // remainingTotalPrice,
    remainingAmount,
    selledTotalAmount,
    selledTotalPrice,
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
  selledTotalAmount,
  remainingSellAmount
}) => {
  let selectedCoinJS = selectedCoin.toJS();
  let coinsJS = coins.toJS();
  const coinId = selectedCoinJS.coinId;
  const coinIndex = coinsJS.findIndex(item => item.coinId === coinId);
  // console.log(
  //   "---> calcTodayPrice: ",
  //   selectedCoinJS,
  //   coinsJS,
  //   currentPrice,
  //   topPrice,
  //   lowPrice,
  //   tradeVolume,
  //   tradePrice
  // );

  if (currentPrice !== undefined) {
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
  }

  if (currentPrice) {
  }

  // 고가
  if (topPrice !== undefined && selectedCoinJS.todayTopPrice < topPrice) {
    selectedCoinJS.todayTopPrice = topPrice;
    selectedCoinJS.todayTopPriceCommSet = commSet(topPrice);
    selectedCoinJS.todayTopPriceRatio = calcRatio(
      selectedCoinJS.dayBeforePrice,
      topPrice
    );
  }

  // 저가
  if (lowPrice !== undefined && selectedCoinJS.todayLowerPrice > lowPrice) {
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

  // 매수 시: 매도 잔량 감소
  if (buyedTotalAmount) {
    selectedCoinJS.remainingSellAmount -= buyedTotalAmount;
  }
  // 매수 잔량 추가
  if (remainingBuyAmount) {
    selectedCoinJS.remainingBuyAmount += remainingBuyAmount;
  }

  // 매도 시: 매수 잔량 감소
  if (selledTotalAmount) {
    selectedCoinJS.remainingBuyAmount -= selledTotalAmount;
  }
  // 매도 잔량 추가
  if (remainingSellAmount) {
    selectedCoinJS.remainingSellAmount += remainingSellAmount;
  }

  // coins 반영
  coinsJS[coinIndex] = selectedCoinJS;

  // console.log("> result: ", selectedCoinJS, coinsJS);
  return {
    selectedCoin: Map(selectedCoinJS),
    coins: List(coinsJS)
  };
};

/* ===== 차트 데이터 셋팅
  @params(obj)
    chartData(immList)
    coinId(int)
    topPrice(int)
    currentPrice(int)
    lowPrice(int)
    concludedTime(timestamp)
  @return
    chartData(immList)
*/
export const setChartData = ({
  chartData,
  coinId,
  topPrice,
  currentPrice,
  lowPrice,
  concludedTime
}) => {
  const coinIndex = chartData.findIndex(item => item.get("coinId") === coinId);
  const data = chartData.getIn([coinIndex, "data"]);
  let dataJS = data.toJS();
  let lastestData;
  let diffTime;
  let updateData = {
    concludedTime,
    x: new Date(concludedTime),
    y: [
      currentPrice,
      topPrice || currentPrice,
      lowPrice || currentPrice,
      currentPrice
    ]
  };
  // 업데이트 데이터
  // console.log("> dataJS", dataJS);
  // console.log(
  //   "---> setChartData: ",
  //   // coinIndex,
  //   // data.size,
  //   currentPrice,
  //   topPrice,
  //   lowPrice
  // );

  // data가 없을 경우 바로 업데이트
  if (!dataJS.length) {
    return chartData.setIn([coinIndex, "data", 0], Map(updateData));
  }

  // 하나 이상의 데이터가 있을 경우 데이터 셋팅
  lastestData = dataJS[dataJS.length - 1];
  // diffTime = (concludedTime - lastestData.concludedTime) / 1000 / 60;
  diffTime = new Date(concludedTime).getMinutes() - lastestData.x.getMinutes();

  // console.log(
  //   "> data info: ",
  //   new Date(concludedTime).getMinutes(),
  //   lastestData.x.getMinutes(),
  //   diffTime
  // );

  // console.log("> data info: ", dataJS, lastestData, diffTime, updateData);

  // 마지막 스틱으로 부터 1분 뒤 체결되었을 경우
  if (diffTime > 10) {
    // console.log("> over 1 minute");
    return chartData.setIn([coinIndex, "data", data.size], Map(updateData));
  }

  // console.log("> lastestData: ", lastestData.x, updateData);
  // console.log("> lastestData: ", lastestData.y);
  // console.log("> topPrice: ", topPrice, lastestData.y[1]);
  // console.log("> lowPrice: ", lowPrice, lastestData.y[2]);
  // console.log("> closePrice: ", currentPrice, lastestData.y[3]);
  // top price update
  if (topPrice > lastestData.y[1]) {
    lastestData.y[1] = topPrice;
  }
  // low price update
  if (lowPrice < lastestData.y[2]) {
    lastestData.y[2] = lowPrice;
  }
  // close price update
  lastestData.y[3] = currentPrice;
  // console.log(
  //   "> return :",
  //   lastestData.x
  //   // chartData.setIn([coinIndex, "data", data.size - 1], Map(updateData)).toJS()
  // );
  return chartData.setIn([coinIndex, "data", data.size - 1], Map(lastestData));
  // topPrice 비교
  // if(lastestData.x[1] < topPrice||currentPrice){

  // }
};
