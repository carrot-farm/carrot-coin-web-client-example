import React from "react";
import classNames from "classnames/bind";
import Chart from "react-apexcharts";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const TradeChart = ({ options, series }) => {
  return (
    <div
      className={cx("trade-chart-root grey lighten-4")}
      style={{ height: "600px" }}
    >
      <div className={cx("trade-chart-container")}>
        <Chart
          options={options}
          series={series}
          type="candlestick"
          height="600"
        />
      </div>
    </div>
  );
};

export default TradeChart;
