import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const TradeChart = () => {
  return (
    <div className={cx("trade-chart-root grey lighten-4")}>trade chart</div>
  );
};

export default TradeChart;
