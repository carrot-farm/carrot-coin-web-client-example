import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import BuyingForm from "../BuyingForm";
import TradeHistory from "../TradeHistory";

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
            <th colSpan="2" className={cx("th_price")} />
            <th className={cx("th_buy-volume")}>매수수량</th>
            <th className={cx("th_buy-button")}>매수</th>
            <th className={cx("th_sell-button")}>매도</th>
            <th className={cx("th_cancel-button")}>미체결</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
            <td rowSpan="10" className={cx("td_cell-yesterday-info")}>
              <div className={cx("td_row")}>
                <div className={cx("key grey-text ")}>전일가격</div>
                <div className={cx("value right right-align ")}>6,036,961</div>
              </div>
              <div className={cx("td_row")}>
                <div className={cx("key grey-text ")}>고가</div>
                <div className={cx("value right right-align ")}>
                  6,180,000
                  <br />
                  (+2.23%)
                </div>
              </div>
              <div className={cx("td_row")}>
                <div className={cx("key grey-text ")}>저가</div>
                <div className={cx("value right right-align ")}>
                  6,009,000
                  <br />
                  (-0.49%)
                </div>
              </div>
            </td>
            <td className={cx("form-section")} rowSpan="10" colSpan="3">
              <BuyingForm />
            </td>
          </tr>
          {/* 이상 */}
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume upper_td")}>0.154</td>
            <td className={cx("td_cell-price upper_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio upper_td")}>-1.38%</td>
          </tr>
          {/* 이하 */}
          <tr>
            <td className={cx("lower_td")} rowSpan="10" />
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.148</td>
            <td
              className={cx("trade-history-section")}
              rowSpan="10"
              colSpan="3"
            >
              <TradeHistory />
            </td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price lower_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio lower_td")}>-1.38%</td>
            <td className={cx("td_cell-volume lower_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("selling-residual-quantity-container ")}>
              <span className={cx("text")}>매도잔량</span>
              <span className={cx("quantity")}>4.099</span>
            </td>
            <td colSpan="2" />
            <td className={cx("buying-residual-quantity-container ")}>
              <span className={cx("text")}>매수잔량</span>
              <span className={cx("quantity")}>258.67</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
