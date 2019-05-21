import { Map, List } from "immutable";
export default {
  // 코인 리스트
  coins: [
    {
      coinId: 0, // 아이디
      coinName: "비트코인", // 코인명
      coinUnit: "BTC", // 코인 단위
      currentPrice: 8240000, // 현재가
      currentPriceCommSet: "0",
      dayBeforePrice: 8121000, // 전일 종가
      dayBeforePriceCommSet: "0", // 전일 종가
      dayBeforeDiff: 0, // 현재가와 전일종가의 가격차(현재가 - 전일종가)
      dayBeforeDiffCommSet: "0",
      isFavorite: false, // 즐겨찾기
      tickPrice: 1000, // 주문 단위
      minimumVolume: 0.001, // 최소 주문 수량
      movingRatio: 0, // 변동률
      todayTopPrice: 8826000, // 금일 고가
      todayTopPriceCommSet: "0", // 금일 고가
      todayTopPriceRatio: 0, // 금일 시가대비 고가의 상승률
      todayLowerPrice: 7975000, // 금일 저가
      todayLowerPriceCommSet: "0", // 금일 저가
      todayLowerPriceRatio: 0, // 금일 시가대비 저가 의 하락률
      todayTotalTradeVolume: 0, // 금일 거래량
      todayTotalTradePrice: 0, // 금일 거래금액
      remainingBuyAmount: 0, // 매수 잔량
      remainingSellAmount: 0 // 매도 잔량
    },
    {
      coinId: 1, // 아이디
      coinName: "비트코인캐시", // 코인명
      coinUnit: "BCH", // 코인 단위
      isFavorite: false, // 즐겨찾기.
      tickPrice: 100, // 주문 단위
      minimumVolume: 0.01, // 최소 주문 수량
      currentPrice: 423700, // 현재가
      currentPriceCommSet: "0",
      movingRatio: 0, // 변동률
      dayBeforePrice: 406900, // 전일 종가
      dayBeforePriceCommSet: "0", // 전일 종가
      dayBeforeDiff: 0, // 현재가와 전일종가의 가격차(현재가 - 전일종가)
      dayBeforeDiffCommSet: "0",
      todayTopPrice: 447800, // 금일 고가
      todayTopPriceCommSet: "0", // 금일 고가
      todayTopPriceRatio: 0, // 금일 시가대비 고가의 상승률
      todayLowerPrice: 402200, // 금일 저가
      todayLowerPriceCommSet: "0", // 금일 저가
      todayLowerPriceRatio: 0, // 금일 시가대비 저가 의 하락률
      todayTotalTradeVolume: 0, // 금일 거래량
      todayTotalTradePrice: 0, // 금일 거래금액
      remainingBuyAmount: 0, // 매수 잔량
      remainingSellAmount: 0 // 매도 잔량
    }
  ],
  // 내 정보
  myInfo: {
    userId: 0,
    ownPrice: 12500000000,
    lockedPrice: 0 // 구매 주문 후 체결시까지 동결되는 금액.
  },
  // 소유 코인정보
  ownCoins: [
    Map({
      coinId: 0, // 코인 id
      ownAmount: 0.125, // 소유 코인량
      lockedAmount: 0 // 매도시 락이 걸리 코인 소유량
    })
  ],
  // 주문리스트에 보여질 매수주문
  buyingOrders: [
    {
      coinId: 0,
      orders: [
        {
          orderAmount: 0.2, // 주문량
          orderPrice: 20000 // 주문 가격
        },
        {
          orderAmount: 5, // 주문량
          orderPrice: 500000 // 주문 가격
        },
        {
          orderAmount: 10, // 주문량
          orderPrice: 100000 // 주문 가격
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          orderId: 3, // 주문 번호
          ordererId: 0, // 주문자 id
          orderAmount: 0.7, // 주문량
          orderPrice: 70000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          orderId: 4, // 주문 번호
          ordererId: 1, // 주문자 id
          orderAmount: 8, // 주문량
          orderPrice: 800000, // 주문 가격
          isConclusion: true, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          orderId: 5, // 주문 번호
          ordererId: 1, // 주문자 id
          orderAmount: 6, // 주문량
          orderPrice: 600000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        }
      ]
    }
  ],
  // 주문리스트에 보여질 판매 주문
  sellingOrders: [
    {
      coinId: 0,
      orders: [
        {
          orderId: 0, // 주문 번호
          ordererId: 0, // 주문자 id
          orderAmount: 0.2, // 주문량
          orderPrice: 8240000 // 주문 가격
        },
        {
          orderId: 1, // 주문 번호
          ordererId: 0, // 주문자 id
          orderAmount: 5, // 주문량
          orderPrice: 500000 // 주문 가격
        },
        {
          orderId: 2, // 주문 번호
          ordererId: 0, // 주문자 id
          orderAmount: 10, // 주문량
          orderPrice: 100000 // 주문 가격
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          orderId: 3, // 주문 번호
          ordererId: 0, // 주문자 id
          orderAmount: 0.7, // 주문량
          orderPrice: 70000 // 주문 가격
        }
      ]
    }
  ],
  // 유저 매수 주문
  userBuyingOrders: List([
    Map({
      orderId: 0, // 주문 번호
      coinId: 0,
      orderType: "buy",
      ordererId: 0, // 주문자 id
      orderAmount: 0.3, // 주문량
      currentAmount: 0.3, // 현재 주문량
      concludedAmount: 0, // 체결된 주문량
      orderPrice: 8243000, // 주문 가격
      isConclusion: false, // 체결 완료
      orderTime: 0 // 주문 시간
    })
    // Map({
    //   orderId: 1, // 주문 번호
    //   coinId: 0,
    //   orderType: "buy",
    //   ordererId: 0, // 주문자 id
    //   orderAmount: 0.4, // 주문량
    //   currentAmount: 0.4, // 현재 주문량
    //   concludedAmount: 0, // 체결된 주문량
    //   orderPrice: 8241000, // 주문 가격
    //   isConclusion: false, // 체결 완료
    //   orderTime: 0 // 주문 시간
    // }),
    // Map({
    //   orderId: 2, // 주문 번호
    //   coinId: 0,
    //   orderType: "buy",
    //   ordererId: 0, // 주문자 id
    //   orderAmount: 0.5, // 주문량
    //   currentAmount: 0.5, // 현재 주문량
    //   concludedAmount: 0, // 체결된 주문량
    //   orderPrice: 8241000, // 주문 가격
    //   isConclusion: false, // 체결 완료
    //   orderTime: 0 // 주문 시간
    // })
  ]),

  // 유저 매도 주문
  userSellingOrders: List([
    Map({
      orderId: 3, // 주문 번호
      coinId: 0,
      orderType: "sell",
      ordererId: 0, // 주문자 id
      orderAmount: 0.5, // 주문량
      currentAmount: 0.5, // 현재 주문량
      concludedAmount: 0, // 체결된 주문량
      orderPrice: 8241000, // 주문 가격
      isConclusion: false, // 체결 완료
      orderTime: 0 // 주문 시간
    }),
    Map({
      orderId: 4, // 주문 번호
      coinId: 0,
      orderType: "sell",
      ordererId: 0, // 주문자 id
      orderAmount: 1, // 주문량
      currentAmount: 1, // 현재 주문량
      concludedAmount: 0, // 체결된 주문량
      orderPrice: 400000, // 주문 가격
      isConclusion: false, // 체결 완료
      orderTime: 0 // 주문 시간
    }),
    Map({
      orderId: 5, // 주문 번호
      coinId: 0,
      orderType: "sell",
      ordererId: 0, // 주문자 id
      orderAmount: 1, // 주문량
      currentAmount: 1, // 현재 주문량
      concludedAmount: 0, // 체결된 주문량
      orderPrice: 200000, // 주문 가격
      isConclusion: false, // 체결 완료
      orderTime: 0 // 주문 시간
    }),
    Map({
      orderId: 6, // 주문 번호
      coinId: 0,
      orderType: "sell",
      ordererId: 0, // 주문자 id
      orderAmount: 1, // 주문량
      currentAmount: 1, // 현재 주문량
      concludedAmount: 0, // 체결된 주문량
      orderPrice: 100000, // 주문 가격
      isConclusion: false, // 체결 완료
      orderTime: 0 // 주문 시간
    })
  ]),

  // 체결된 정보
  concludedOrders: [
    Map({
      concludedId: 0, // 체결 아이디
      buyOrderId: 0, // 매수주문 아이디
      sellOrderId: 0, // 매도주문 아이디
      buyerId: 0, // 매수자 아이디
      sellerId: 0, // 매도자 아이디
      orderPrice: 6248000, // 체결가격
      concludedAmount: 0, // 체결량
      concludedTime: 15154 // 체결 시간
    })
  ]
};
