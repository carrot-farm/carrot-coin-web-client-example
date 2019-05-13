/*
  프로젝트별 공통 함수
*/
import { decimalFloor, commSet, calcRatio, jsonSort } from "lib/tools";

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

// ==== 주문들 필터링과 정렬
export const sortOrders = (
  orders,
  _selectedCoin,
  orderDirection,
  isConclusion = false
) => {
  let selectedCoinIndex = 0;
  const _selectedCoinId = _selectedCoin.coinId;
  const dayBeforePrice = _selectedCoin.dayBeforePrice;
  let sortedOrders = [];
  let commSetOrders = [];
  let i = 0;

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

  sortedOrders = sortedOrders.filter(item => {
    return item.isConclusion === isConclusion ? true : false;
  });
  // console.log("> filtered: ", sortedOrders);
  // order 정렬
  sortedOrders = jsonSort(sortedOrders, "orderPrice", orderDirection);
  // console.log("> sorted: ", sortedOrders);
  for (; i < 11; i++) {
    if (sortedOrders[i]) {
      commSetOrders[i] = {
        ...sortedOrders[i],
        orderAmountCommSet: commSet(sortedOrders[i].orderAmount, true),
        orderPriceCommSet: commSet(sortedOrders[i].orderPrice),
        orderRatio: calcRatio(dayBeforePrice, sortedOrders[i].orderPrice)
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
  }
  // console.log("----", commSetOrders);
  return commSetOrders;
};
