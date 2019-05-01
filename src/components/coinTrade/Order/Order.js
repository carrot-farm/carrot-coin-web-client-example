import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const Order = () => {
  return (
    <div className={cx("order-root ")}>
      {/* coin info dd */}
      <div
        className={cx(
          "coin-info-container font-size s-09 font-weight lighter grey lighten-5 grey-text text-darken-2"
        )}
      >
        <div className={cx("name-container font-weight bold")}>
          <span className={cx("name ")}>비트코인</span>&nbsp;
          <span className={cx("coin-unit")}>BTC/KRW</span>
        </div>
        <div className={cx("current-price-container")}>
          <span className={cx("text")}>현재가</span>&nbsp;
          <span className={cx("price")}>6,036,000KRW</span>
          <span className={cx("last-ratio")}>
            (-1.42% <i className={cx("ratio-icon")}>▼</i> &nbsp;-86,000)
          </span>
        </div>
        <div className={cx("volume-container")}>
          <span className={cx("text")}>거래량</span>
          <span className={cx("volume")}>210&nbsp;BTC</span>
        </div>
      </div>
      {/* order table  */}
      <table className={cx("order-table font-weight lighter font-size s-08")}>
        <thead>
          <tr>
            <th className={cx("th_sell-volume")}>매도수량</th>
            <th className={cx("th_price")} />
            <th className={cx("th_ratio")} />
            <th className={cx("th_buy-volume")}>매수수량</th>
            <th className={cx("th_buy-button")}>매수</th>
            <th className={cx("th_sell-button")}>매도</th>
            <th className={cx("th_cancel-button")}>미체결</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("td_cell-volume")}>0.154</td>
            <td className={cx("td_cell-price")}>6,052,000</td>
            <td className={cx("td_cell-ratio")}>-1.38%</td>
            <td rowSpan="10">전일가격</td>
            <td rowSpan="10" colSpan="3">
              매수가능금액
            </td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume")}>0.154</td>
            <td className={cx("td_cell-price")}>6,052,000</td>
            <td className={cx("td_cell-ratio")}>-1.38%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
