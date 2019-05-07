export default {
  // 코인 리스트
  coins: [
    {
      coinId: 0, // 아이디
      coinName: "비트코인", // 코인명
      koinUnit: "BTC/KRW", // 코인 단위
      isFavorite: true, // 즐겨찾기
      currentPrice: 6650000, // 현재가
      currentPriceCommset: "6,650,000",
      movingRatio: -1.3, // 변동률
      todayTopPrice: 6650000, // 금일 고가
      todayLowerPrice: 6620000, // 금일 저가
      todayTotalTradeVolume: 0, // 금일 거래량
      todayTotalTradePrice: 1000, // 금일 거래금액
      dayBeforePrice: 0 // 전일 종가
    },
    {
      coinId: 1,
      coinName: "비트코인캐시",
      koinUnit: "BCH/KRW",
      isFavorite: false,
      currentPrice: 279200,
      currentPriceCommset: "279,200",
      movingRatio: 5.36,
      todayTopPrice: 6650000,
      todayLowerPrice: 6620000,
      todayTotalTradeVolume: 0,
      todayTotalTradePrice: 0,
      dayBeforePrice: 0
    }
  ],
  // 현재 선택된 코인 정보
  selectedCoinId: {},
  // 내 정보
  myInfo: {
    userId: 0,
    ownPrice: 0,
    ownCoins: [
      {
        coinId: 0,
        amound: 0
      }
    ]
  },
  // 주문 정보
  ordersInfo: [
    {
      coinId: 0,
      orders: [
        {
          ordererId: 0, // 주문 번호
          orderAmount: 0.2, // 주문량
          orderPrice: 0, // 주문 가격
          isConclusion: false // 체결 완료
        }
      ]
    }
  ]
};
