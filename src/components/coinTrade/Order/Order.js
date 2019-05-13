import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import BuyingFormContainer from "containers/coinTrade/BuyingFormContainer";
import SellingForm from "../SellingForm";
import CancelForm from "../CancelForm";
import OrderEtcInfo from "../OrderEtcInfo";
// import TradeHistory from "../TradeHistory";
import { sortOrders } from "lib/common";
import { commSet, calcRatio } from "lib/tools";

const cx = classNames.bind(styles);

const Order = ({
  selectedCoin,
  activeForm,
  activeFormClick,
  buyingOrders,
  sellingOrders
}) => {
  const {
    coinName,
    coinId,
    coinUnit,
    // currentPrice,
    currentPriceCommSet,
    movingRatio,
    dayBeforePrice,
    dayBeforePriceCommSet,
    dayBeforeDiffCommset,
    todayTotalTradePrice,
    todayTopPriceCommSet,
    todayTopPriceRatio,
    todayLowerPriceCommSet,
    todayLowerPriceRatio
  } = selectedCoin;

  let currentTextColor = "";
  let _buyingOrders = []; // 매수 주문

  // 현재가 텍스트 컬러.
  if (movingRatio > 0) {
    currentTextColor = "red-text";
  } else if (movingRatio < 0) {
    currentTextColor = "blue-text";
  }
  // 매수 주문 처리
  // console.log("---> run", coinId, buyingOrders.size);
  if (coinId !== undefined && buyingOrders.size > 0) {
    _buyingOrders = sortOrders(buyingOrders.toJS(), selectedCoin, false);
    // for (let i = 0, len = 11; i < len; i++) {
    //   if (sortedOrders[i]) {
    //     _buyingOrders[i] = {
    //       ...sortedOrders[i],
    //       orderAmountCommSet: commSet(sortedOrders[i].orderAmount),
    //       orderPriceCommSet: commSet(sortedOrders[i].orderPrice),
    //       orderRatio: commSet(
    //         calcRatio(dayBeforePrice, sortedOrders[i].orderPrice)
    //       )
    //     };
    //     if (_buyingOrders[i].orderRatio > 0) {
    //       _buyingOrders[i].orderRatio = "+" + _buyingOrders[i].orderRatio;
    //     }
    //   } else {
    //     _buyingOrders[i] = {
    //       orderId: "b" + i
    //     };
    //   }
    //   // _buyingOrders[i] = sortedOrders[i] ? sortedOrders[i] : {};
    // }
    // console.log("---", _buyingOrders);
    // // const arr = new Array(10);
    // const b = ['11', 22, 33];
    // console.log("---> arr: ", arr);
    // arr = [...b];
    // console.log("---> arr2: ", arr);
    // console.log("---> buyingOrders", coinId, buyingOrders.size);
    // // order index 찾기.
    // _selectedCoinIndex = buyingOrders.findIndex(item => {
    //   return item.coinId === selectedCoin.coinId;
    // });
    // console.log("> _selectedCoinIndex: ", _selectedCoinIndex);
    // // 매수 order 가져오기.
    // _buyingOrders = buyingOrders.get(_selectedCoinIndex).orders;
    // console.log("> _buyingOrders: ", _buyingOrders);
    // _buyingOrders = _buyingOrders.filter(item => {
    //   return !item.isConclusion ? true : false;
    // });
    // console.log("> filtered: ", _buyingOrders);
    // // order 정렬
    // _buyingOrders = _buyingOrders.sort((a, b) => {
    //   return a.orderPrice > b.orderPrice
    //     ? -1
    //     : a.orderPrice < b.orderPrice
    //     ? 1
    //     : 0;
    // });
    // console.log("> sorting: ", _buyingOrders);
  }

  return (
    <div className={cx("order-root ")}>
      {/* coin info dd */}
      <div
        className={cx(
          "coin-info-container font-size s-09 font-weight lighter grey lighten-5 grey-text text-darken-2"
        )}
      >
        <div className={cx("name-container font-weight bold")}>
          <span className={cx("name ")}>{coinName}</span>&nbsp;
          <span className={cx("coin-unit")}>{coinUnit}/KRW</span>
        </div>
        <div className={cx("current-price-container")}>
          <span className={cx("text")}>현재가</span>&nbsp;
          <span className={cx(`price ${currentTextColor}`)}>
            {currentPriceCommSet}KRW
          </span>
          <span className={cx(`last-ratio ${currentTextColor}`)}>
            ({movingRatio}% <i className={cx("ratio-icon")}>▼</i> &nbsp;
            {dayBeforeDiffCommset})
          </span>
        </div>
        <div className={cx("volume-container")}>
          <span className={cx("text")}>거래량</span>
          <span className={cx("volume")}>
            {todayTotalTradePrice}&nbsp;{coinUnit}
          </span>
        </div>
      </div>
      {/* order table  */}
      <table className={cx("order-table font-weight lighter font-size s-08")}>
        <thead>
          <tr>
            <th className={cx("th_sell-volume")}>매도수량</th>
            <th colSpan="2" className={cx("th_price")} />
            <th className={cx("th_buy-volume")}>매수수량</th>
            <th
              className={cx(
                `th_buy-button ${activeForm === "buyForm" ? "active" : ""}`
              )}
            >
              <button
                className={cx("button-clear fit-element")}
                onClick={() => activeFormClick("buyForm")}
              >
                매수
              </button>
            </th>
            <th
              className={cx(
                `th_sell-button ${activeForm === "sellForm" ? "active" : ""}`
              )}
            >
              <button
                className={cx("button-clear fit-element")}
                onClick={() => activeFormClick("sellForm")}
              >
                매도
              </button>
            </th>
            <th
              className={cx(
                `th_cancel-button forms-buttons ${
                  activeForm === "cancelForm" ? "active" : ""
                }`
              )}
            >
              <button
                className={cx("button-clear fit-element")}
                onClick={() => activeFormClick("cancelForm")}
              >
                미체결
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
            {/* etc coins info */}
            <td rowSpan="10" className={cx("td_cell-yesterday-info")}>
              <OrderEtcInfo
                dayBeforePriceCommSet={dayBeforePriceCommSet}
                todayTopPriceRatio={todayTopPriceRatio}
                todayTopPriceCommSet={todayTopPriceCommSet}
                todayLowerPriceRatio={todayLowerPriceRatio}
                todayLowerPriceCommSet={todayLowerPriceCommSet}
              />
            </td>

            {/* forms */}
            <td className={cx("form-section")} rowSpan="10" colSpan="3">
              {activeForm === "buyForm" && <BuyingFormContainer />}
              {activeForm === "sellForm" && <SellingForm />}
              {activeForm === "cancelForm" && <CancelForm />}
            </td>
          </tr>
          {/* 매도주문 */}
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          <tr>
            <td className={cx("td_cell-volume selling_td")}>0.154</td>
            <td className={cx("td_cell-price selling_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio selling_td")}>-1.38%</td>
          </tr>
          {/* 매수 주문 */}
          {_buyingOrders.map((item, index) => {
            // console.log("*** index: ", index, item);
            if (!item.orderId) {
              item.orderId = "b" + index;
            }
            if (index === 0) {
              // 첫번째 tr
              return (
                <tr key={item.orderId}>
                  <td className={cx("")} rowSpan="10" />
                  <td className={cx("td_cell-price buying_td")}>
                    {item.orderPriceCommSet}
                  </td>
                  <td className={cx("td_cell-ratio buying_td")}>
                    {item.orderRatioCommSet}
                  </td>
                  <td className={cx("td_cell-volume buying_td left-align")}>
                    {item.orderAmountCommSet}
                  </td>
                  <td
                    className={cx("trade-history-section")}
                    rowSpan="10"
                    colSpan="3"
                  >
                    {/* <TradeHistory /> */}
                  </td>
                </tr>
              );
            } else if (index === 10) {// 마지막 tr
              return (
                <tr key={item.orderId}>
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
              );
            } else { // 일반 tr
              return (
                <tr key={item.orderId}>
                  <td className={cx("td_cell-price buying_td")}>
                    {item.orderPriceCommSet}
                  </td>
                  <td className={cx("td_cell-ratio buying_td")}>
                    {item.orderRatioCommSet}
                  </td>
                  <td className={cx("td_cell-volume buying_td left-align")}>
                    {item.orderAmountCommSet}
                  </td>
                </tr>
              );
            }
          })}
          {/* <tr>
            <td className={cx("")} rowSpan="10" />
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.148</td>
            <td
              className={cx("trade-history-section")}
              rowSpan="10"
              colSpan="3"
            >
              {/* <TradeHistory /> */}
          {/*</td>
          </tr>*/}
          {/* <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
          </tr>
          <tr>
            <td className={cx("td_cell-price buying_td")}>6,052,000</td>
            <td className={cx("td_cell-ratio buying_td")}>-1.38%</td>
            <td className={cx("td_cell-volume buying_td left-align")}>0.154</td>
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
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
