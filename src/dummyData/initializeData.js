import { Map, List } from "immutable";
// import { statement } from "@babel/template";

const timestamp = new Date().getTime();
export default {
  // 코인 리스트
  coins: [
    {
      coinId: 0, // 아이디
      coinName: "비트코인", // 코인명
      coinUnit: "BTC", // 코인 단위
      currentPrice: 1500000, // 현재가
      currentPriceCommSet: "0",
      dayBeforePrice: 1510000, // 전일 종가
      dayBeforePriceCommSet: "0", // 전일 종가
      dayBeforeDiff: 0, // 현재가와 전일종가의 가격차(현재가 - 전일종가)
      dayBeforeDiffCommSet: "0",
      isFavorite: false, // 즐겨찾기
      tickPrice: 1000, // 주문 단위
      minimumVolume: 0.001, // 최소 주문 수량
      movingRatio: 0, // 변동률
      todayTopPrice: 1520000, // 금일 고가
      todayTopPriceCommSet: "0", // 금일 고가
      todayTopPriceRatio: 0, // 금일 시가대비 고가의 상승률
      todayLowerPrice: 1498000, // 금일 저가
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
      currentPrice: 200000, // 현재가
      currentPriceCommSet: "0",
      movingRatio: 0, // 변동률
      dayBeforePrice: 198000, // 전일 종가
      dayBeforePriceCommSet: "0", // 전일 종가
      dayBeforeDiff: 0, // 현재가와 전일종가의 가격차(현재가 - 전일종가)
      dayBeforeDiffCommSet: "0",
      todayTopPrice: 200100, // 금일 고가
      todayTopPriceCommSet: "0", // 금일 고가
      todayTopPriceRatio: 0, // 금일 시가대비 고가의 상승률
      todayLowerPrice: 198900, // 금일 저가
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
    ownPrice: 100000000,
    lockedPrice: 0 // 구매 주문 후 체결시까지 동결되는 금액.
  },

  // 소유 코인정보
  ownCoins: [
    Map({
      coinId: 0, // 코인 id
      ownAmount: 100, // 소유 코인량
      lockedAmount: 0 // 매도시 락이 걸리 코인 소유량
    }),
    Map({
      coinId: 1, // 코인 id
      ownAmount: 100, // 소유 코인량
      lockedAmount: 0 // 매도시 락이 걸리 코인 소유량
    })
  ],

  // 주문리스트에 보여질 매수주문
  buyingOrders: List([
    {
      coinId: 0,
      orders: [
        {
          orderAmount: 0.2, // 주문량
          orderPrice: 1500000 // 주문 가격
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          orderAmount: 0.7, // 주문량
          orderPrice: 70000 // 주문 가격
        }
      ]
    }
  ]),

  // 주문리스트에 보여질 판매 주문
  sellingOrders: List([
    {
      coinId: 0,
      orders: [
        {
          orderAmount: 0.2,
          orderPrice: 8240000
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          orderAmount: 0.7, // 주문량
          orderPrice: 70000 // 주문 가격
        }
      ]
    }
  ]),

  // 유저 매수 주문
  userBuyingOrders: List([
    // Map({
    //   orderId: 0, // 주문 번호
    //   coinId: 0,
    //   orderType: "buy",
    //   ordererId: 0, // 주문자 id
    //   orderAmount: 1, // 주문량
    //   currentAmount: 1, // 현재 주문량
    //   concludedAmount: 0, // 체결된 주문량
    //   orderPrice: 200000, // 주문 가격
    //   isConclusion: false, // 체결 완료
    //   isCancel: false, // 주문 취소
    //   orderTime: 1 // 주문 시간
    // })
  ]),

  // 유저 매도 주문
  userSellingOrders: List([
    // Map({
    //   orderId: 5, // 주문 번호
    //   coinId: 0,
    //   orderType: "sell",
    //   ordererId: 0, // 주문자 id
    //   orderAmount: 1, // 주문량
    //   currentAmount: 1, // 현재 주문량
    //   concludedAmount: 0, // 체결된 주문량
    //   orderPrice: 400000, // 주문 가격
    //   isConclusion: false, // 체결 완료
    //   isCancel: false, // 주문 취소
    //   orderTime: 3 // 주문 시간
    // })
  ]),

  // 체결된 정보
  concludedOrders: List([
    Map({
      concludedId: 0, // 체결 아이디
      coinId: 0, // 코인
      buyOrderId: 0, // 매수주문 아이디
      sellOrderId: 0, // 매도주문 아이디
      buyerId: 0, // 매수자 아이디
      sellerId: 0, // 매도자 아이디
      orderPrice: 6248000, // 체결가격
      concludedAmount: 1578.048, // 체결량
      concludedTime: new Date().getTime() - 20000 // 체결 시간
    }),
    Map({
      concludedId: 1, // 체결 아이디
      coinId: 0, // 코인
      buyOrderId: 0, // 매수주문 아이디
      sellOrderId: 0, // 매도주문 아이디
      buyerId: 0, // 매수자 아이디
      sellerId: 0, // 매도자 아이디
      orderPrice: 100000, // 체결가격
      concludedAmount: 2, // 체결량
      concludedTime: new Date().getTime() // 체결 시간
    })
  ]),

  // chartData
  chartData: List([
    Map({
      coinId: 0,
      // data: List([])
      data: List([
        Map({
          concludedTime: timestamp - 1000 * 60 * 15,
          x: new Date(timestamp - 1000 * 60 * 15),
          y: [1500000, 1600000, 1482000, 1480000]
        }),
        Map({
          concludedTime: timestamp - 1000 * 60 * 10,
          x: new Date(timestamp - 1000 * 60 * 10),
          y: [1480000, 1485000, 1388000, 1390000]
        }),
        Map({
          concludedTime: timestamp - 1000 * 60 * 1,
          x: new Date(timestamp - 1000 * 60 * 1),
          y: [1501000, 1503000, 1497000, 1500000]
        })
      ])
    }),
    Map({
      coinId: 1,
      data: List([])
    })
  ])
};
