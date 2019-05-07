import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import CoinListContainer from "containers/coinTrade/CoinListContainer";
import CoinInfoContainer from "containers/coinTrade/CoinInfoContainer";
import TradeChartContainer from "containers/coinTrade/TradeChartContainer";
import OrderContainer from "containers/coinTrade/OrderContainer";

const cx = classNames.bind(styles);

const TradeTemplate = ({ children }) => {
  return (
    <div className={cx("trade-template-root")}>
      <div className={cx("coin-list-section")}>
        <CoinListContainer />
      </div>
      <div className={cx("chart-trade-section")}>
        <div className={cx("chart-section")}>
          {/* <CoinInfoContainer />
          <TradeChartContainer /> */}
        </div>
        <div className={cx("trade-section")}>{/* <OrderContainer /> */}</div>
      </div>
    </div>
  );
};

export default TradeTemplate;
