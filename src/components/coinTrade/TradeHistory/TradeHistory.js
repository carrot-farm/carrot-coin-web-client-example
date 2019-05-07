import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const TradeHistory = () => {
  return (
    <div className={cx("trade-history-root ")}>
      <div className={cx("title bold s12")}>
        <b>전체 체결</b>
      </div>
      <table className={cx("trade-history")}>
        <tr>
          <th>체결시간</th>
          <th>체결가격</th>
          <th>체결량</th>
          <th>체결금액</th>
        </tr>
        <tr>
          <td>20:00</td>
          <td>6,248,000</td>
          <td>0.0448</td>
          <td>281,523</td>
        </tr>
      </table>
    </div>
  );
};

export default TradeHistory;
