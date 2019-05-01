import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const CoinInfo = () => {
  return (
    <div className={cx("coin-info-root ")}>
      <table className={cx("coin-info-table")}>
        <tbody>
          <tr>
            <td rowspan="2" className={cx("name-col")}>
              <div className={cx("coin-name-container")}>
                <b className={cx("coin-name")}>비트코인</b> &nbsp;
                <span className={cx("coin-unit")}>BTC/KRW</span> &nbsp;
                <span className={cx("favorite")}>
                  <Icon>favorite</Icon>
                </span>
              </div>
              <div className={cx("current-price-container")}>
                <span className={cx("current-price")}>6,210,000</span>&nbsp;
                <span className={cx("price-unit")}>KRW</span>
              </div>
              <div className={cx("coin-ratio-container")}>
                전일대비&nbsp;
                <span className={cx("ratio")}>-2.1%</span>
                <span className={cx("ratio-symbol")}>
                  <Icon>arrow_drop_down</Icon>
                </span>
                &nbsp;
                <span className={cx("price-compare")}>- 131,000</span>
              </div>
            </td>
            <td
              className={cx("top-price-col font-weight lighter font-size s-08")}
            >
              <span className={cx("font-weight ")}>고가</span>&nbsp;
              <span className={cx("right-align")}>
                <b className={cx("price left font-weight bold")}>6,150,000</b>
                &nbsp;
                <span className={cx("price-unit font-size s-07 ")}>KRW</span>
              </span>
            </td>
            <td className={cx("volume-col font-weight lighter font-size s-08")}>
              <span className={cx("name font-weight ")}>거래량</span>&nbsp;
              <span className={cx("right-align")}>
                <b className={cx("volume left font-weight bold")}>206</b>
                &nbsp;
                <span className={cx("volume-unit font-size s-07 ")}>BTC</span>
              </span>
            </td>
          </tr>
          <tr className={cx(" font-weight lighter font-size s-08")}>
            <td className={cx("top-price-col  ")}>
              <span className={cx("font-weight ")}>저가</span>&nbsp;
              <span className={cx("right-align")}>
                <b className={cx("price left font-weight bold")}>6,150,000</b>
                &nbsp;
                <span className={cx("price-unit font-size s-07 ")}>KRW</span>
              </span>
            </td>
            <td
              className={cx(
                "today-trade-price-col font-weight lighter font-size s-08"
              )}
            >
              <span className={cx("name font-weight ")}>거래대름</span>&nbsp;
              <span className={cx("right-align")}>
                <b className={cx("today-trade-price left font-weight bold")}>
                  1,244,858,000
                </b>
                &nbsp;
                <span className={cx("today-trade-price-unit font-size s-07 ")}>
                  KRW
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfo;
