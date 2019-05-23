import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const TradeHistory = ({ ordersHistory }) => {
  return (
    <div className={cx("trade-history-root ")}>
      <div className={cx("title bold s12")}>
        <b>전체 체결</b>
      </div>
      <div className={cx("trade-history-header")}>
        <div className={cx("col-concluded-time")}>체결시간</div>
        <div className={cx("col-concluded-total-price")}>체결가격</div>
        <div className={cx("col-concluded-amount")}>체결량</div>
        <div className={cx("col-concluded-price")}>체결금액</div>
      </div>
      <ul className={cx("trade-history")}>
        {ordersHistory.map(item => {
          return (
            <li key={item.concludedId}>
              <div className={cx("col-concluded-time")}>
                {item.concludedTimeStr}
              </div>
              <div className={cx("col-concluded-total-price")}>
                {item.totalPriceCommset}
              </div>
              <div className={cx("col-concluded-amount")}>
                {item.concludedAmountCommSet}
              </div>
              <div className={cx("col-concluded-price")}>
                {item.orderPriceCommSet}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TradeHistory;
