import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const CoinList = () => {
  return (
    <div className={cx("coin-list-root ")}>
      {/* input */}
      <div className={cx("coin-input-container")}>
        <div className={cx("input-wrapper")}>
          <input
            name="coin-seearch"
            id="coin-seearch"
            placeholder="코인명을 검색하세요"
            className={cx("input_coin-search")}
          />
        </div>
        <div className={cx("favorite-wrapper")}>
          <button className={cx("favorite-toggle-button")}>
            <Icon className={cx("favorite-icon")}>favorite</Icon>
            &nbsp;관심코인 보기
          </button>
        </div>
      </div>
      {/* 리스트 */}
      <table className={cx("list-table")}>
        <thead>
          <tr>
            <th className={cx("th_favorite")} />
            <th className={cx("th_coin-name")}>
              <button className={cx("order-button order-by_name")}>
                <div className={cx("order-name")}>코인명</div>
                <div className={cx("icons-container ")}>
                  <Icon className={cx("icon asc-icon")}>arrow_drop_up</Icon>
                  <br />
                  <Icon className={cx("icon desc-icon")}>arrow_drop_down</Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_current-price")}>
              <button className={cx("order-button order-by_current-price")}>
                <div className={cx("order-name")}>현재가</div>
                <div className={cx("icons-container ")}>
                  <Icon className={cx("icon asc-icon")}>arrow_drop_up</Icon>
                  <br />
                  <Icon className={cx("icon desc-icon")}>arrow_drop_down</Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_rate")}>
              <button className={cx("order-button order-by_price")}>
                <div className={cx("order-name")}>상승률</div>
                <div className={cx("icons-container ")}>
                  <Icon className={cx("icon asc-icon")}>arrow_drop_up</Icon>
                  <br />
                  <Icon className={cx("icon desc-icon")}>arrow_drop_down</Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_trade-price")}>
              <button className={cx("order-button order-by_trade-price")}>
                <div className={cx("order-name")}>거래대금</div>
                <div className={cx("icons-container ")}>
                  <Icon className={cx("icon asc-icon")}>arrow_drop_up</Icon>
                  <br />
                  <Icon className={cx("icon desc-icon")}>arrow_drop_down</Icon>
                </div>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("col favorite-col")}>
              <Icon className={cx("icon")}>favorite</Icon>
            </td>
            <td className={cx("coin-name-col")}>
              <div className={cx("coin-name")}>비트코인</div>
              <div className={cx("coin-unit")}>BTC/KRW</div>
            </td>
            <td className={cx("current-price-col down")}>
              <div className={cx("current-price")}>6,650,000</div>
            </td>
            <td className={cx("today-rate-col down")}>
              <div className={cx("rate")}>-1.30%</div>
            </td>
            <td className={cx("today-trade-col")}>
              <span className={cx("tody-trade-rate")}>1,390.70</span>
              &nbsp;
              <span className={cx("trade-unit")}>백만</span>
            </td>
          </tr>
          <tr>
            <td className={cx("col favorite-col")}>
              <Icon className={cx("icon")}>favorite</Icon>
            </td>
            <td className={cx("coin-name-col")}>
              <div className={cx("coin-name")}>비트코인캐시</div>
              <div className={cx("coin-unit")}>BCH/KRW</div>
            </td>
            <td className={cx("current-price-col up")}>
              <div className={cx("current-price")}>279,200</div>
            </td>
            <td className={cx("today-rate-col up")}>
              <div className={cx("rate ")}>+5.36%</div>
            </td>
            <td className={cx("today-trade-col")}>
              <span className={cx("today-trade-rate")}>775.07</span>
              &nbsp;
              <span className={cx("trade-unit")}>백만</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
