export default {
  // 코인 리스트
  coins: [
    {
      coinId: 0, // 아이디
      coinName: "비트코인", // 코인명
      coinUnit: "BTC", // 코인 단위
      isFavorite: false, // 즐겨찾기
      tickPrice: 1000, // 주문 단위
      minimumVolume: 0.001, // 최소 주문 수량
      currentPrice: 8240000, // 현재가
      currentPriceCommSet: "0",
      movingRatio: 0, // 변동률
      dayBeforePrice: 8121000, // 전일 종가
      dayBeforePriceCommSet: "0", // 전일 종가
      dayBeforeDiff: 0, // 현재가와 전일종가의 가격차(현재가 - 전일종가)
      dayBeforeDiffCommSet: "0",
      todayTopPrice: 8826000, // 금일 고가
      todayTopPriceCommSet: "0", // 금일 고가
      todayTopPriceRatio: 0, // 금일 시가대비 고가의 상승률
      todayLowerPrice: 7975000, // 금일 저가
      todayLowerPriceCommSet: "0", // 금일 저가
      todayLowerPriceRatio: 0, // 금일 시가대비 저가 의 하락률
      todayTotalTradeVolume: 0, // 금일 거래량
      todayTotalTradePrice: 0 // 금일 거래금액
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
      todayTotalTradePrice: 0 // 금일 거래금액
    }
  ],
  // 내 정보
  myInfo: {
    userId: 0,
    ownPrice: 12500000000,
    ownCoins: [
      {
        coinId: 0, // 코인 id
        coinAmount: 0.022 // 소유 코인량
      }
    ]
  },
  // 매수주문
  buyingOrders: [
    {
      coinId: 0,
      orders: [
        {
          ordererId: 0, // 주문 번호
          orderererId: 0, // 주문자 id
          orderAmount: 0.2, // 주문량
          orderPrice: 20000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 5, // 주문량
          orderPrice: 500000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 10, // 주문량
          orderPrice: 100000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          ordererId: 0, // 주문 번호
          orderererId: 0, // 주문자 id
          orderAmount: 0.7, // 주문량
          orderPrice: 70000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 8, // 주문량
          orderPrice: 800000, // 주문 가격
          isConclusion: true, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 6, // 주문량
          orderPrice: 600000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        }
      ]
    }
  ],
  // 판매 주문
  sellingOrders: [
    {
      coinId: 0,
      orders: [
        {
          ordererId: 0, // 주문 번호
          orderererId: 0, // 주문자 id
          orderAmount: 0.2, // 주문량
          orderPrice: 20000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 5, // 주문량
          orderPrice: 500000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 10, // 주문량
          orderPrice: 100000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        }
      ]
    },
    {
      coinId: 1,
      orders: [
        {
          ordererId: 0, // 주문 번호
          orderererId: 0, // 주문자 id
          orderAmount: 0.7, // 주문량
          orderPrice: 70000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 8, // 주문량
          orderPrice: 800000, // 주문 가격
          isConclusion: true, // 체결 완료
          ordersTime: "" // 주문 시간
        },
        {
          ordererId: 0, // 주문 번호
          orderererId: 1, // 주문자 id
          orderAmount: 6, // 주문량
          orderPrice: 600000, // 주문 가격
          isConclusion: false, // 체결 완료
          ordersTime: "" // 주문 시간
        }
      ]
    }
  ],
  // orders: [
  //   {
  //     coinId: 0,
  //     buy: [
  //       {
  //         ordererId: 0, // 주문 번호
  //         orderererId: 0, // 주문자 id
  //         orderAmount: 0.2, // 주문량
  //         orderPrice: 20000, // 주문 가격
  //         isConclusion: false, // 체결 완료
  //         ordersTime: "" // 주문 시간
  //       }
  //     ],
  //     sell: [
  //       {
  //         ordererId: 0, // 주문 번호
  //         orderererId: 0, // 주문자 id
  //         orderAmount: 0.2, // 주문량
  //         orderPrice: 0, // 주문 가격
  //         isConclusion: false, // 체결 완료
  //         ordersTime: "" // 주문 시간
  //       }
  //     ]
  //   }
  // ],
  // 매도/매수 수량
  ordersVolume: [
    {
      coinId: 0,
      buyingVolume: 4.099,
      sellingVolume: 258.67,
      orders: [
        {
          orderId: 0,
          orderPrice: 0, // 주문 가격
          priceRatio: -1.2, // 전일종가 대비 주문가 비율
          ordersVolume: 0.154 // 주문량
        }
      ]
    }
  ],
  // 체결 정보
  conclusionInfo: [
    {
      coinId: 0,
      conclusion: [
        {
          conclusionId: 0, // 체결 아이디
          orderId: 0, // 주문 아이디
          ordererId: 0, // 주문자 아이디
          buyerId: 0, // 구매자 id
          conclusionPrice: 6248000, // 체결가격
          conclusionPriceCommSet: "6,248,000",
          conclusionAmmount: 281523, // 체결금액
          conclusionAmmountCommSet: "281,523", // 체결금액
          conclusionVolume: 0.0448, // 체결량
          conclusionTime: 15154, // 체결 시간
          conslusionTimeStr: ""
        }
      ]
    }
  ]
};
