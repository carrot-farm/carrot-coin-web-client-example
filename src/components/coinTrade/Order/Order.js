import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import BuyingFormContainer from "containers/coinTrade/BuyingFormContainer";
import SellFormContainer from "containers/coinTrade/SellFormContainer";
import CancelFormContainer from "containers/coinTrade/CancelFormContainer";
import TradeHistoryContainer from "containers/coinTrade/TradeHistoryContainer";
import OrderEtcInfo from "../OrderEtcInfo";
import { sortOrders } from "lib/common";

const cx = classNames.bind(styles);

const Order = ({
  selectedCoin,
  activeForm,
  buyingOrders,
  sellingOrders,
  activeFormClick,
  handlePriceClick,
  buyTotalAmout,
  sellTotalAmout
}) => {
  const {
    coinName,
    coinId,
    coinUnit,
    // currentPrice,
    currentPriceCommSet,
    movingRatio,
    // dayBeforePrice,
    dayBeforePriceCommSet,
    dayBeforeDiffCommset,
    todayTotalTradeVolume,
    todayTopPriceCommSet,
    todayTopPriceRatio,
    todayLowerPriceCommSet,
    todayLowerPriceRatio,
    remainingBuyAmount,
    remainingSellAmount
  } = selectedCoin;

  let currentTextColor = "";
  let _buyingOrders = []; // 매수 주문
  let _sellingOrders = [];

  // 현재가 텍스트 컬러.
  if (movingRatio > 0) {
    currentTextColor = "red-text";
  } else if (movingRatio < 0) {
    currentTextColor = "blue-text";
  }
  // 주문 filter, sort, commset
  if (coinId !== undefined) {
    // 매수 주문
    _buyingOrders = sortOrders(
      buyingOrders.toJS(),
      selectedCoin,
      false,
      false,
      buyingOrders.size <= 0 ? true : false
    );
    // 매도 주문
    _sellingOrders = sortOrders(
      sellingOrders.toJS(),
      selectedCoin,
      true,
      true,
      sellingOrders.size <= 0 ? true : false
    );
    // console.log("> ", _sellingOrders, _buyingOrders);
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
            {todayTotalTradeVolume}&nbsp;{coinUnit}
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
          {/* 매도 주문 */}
          {_sellingOrders.map((item, index) => {
            // console.log("*** index: ", index, item);
            if (!item.orderId) {
              item.orderId = "s" + index;
            }
            if (index === 0) {
              // 첫번째 tr
              return (
                <tr key={item.orderId}>
                  <td className={cx("td_cell-volume selling_td")}>
                    {item.orderAmountCommSet}
                  </td>
                  <td
                    className={cx("td_cell-price selling_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderPriceCommSet}
                  </td>
                  <td
                    className={cx("td_cell-ratio selling_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderRatioCommSet}
                  </td>
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
                    {activeForm === "sellForm" && <SellFormContainer />}
                    {activeForm === "cancelForm" && <CancelFormContainer />}
                  </td>
                </tr>
              );
            } else {
              // 일반 tr
              return (
                <tr key={item.orderId}>
                  <td className={cx("td_cell-volume selling_td")}>
                    {item.orderAmountCommSet}
                  </td>
                  <td
                    className={cx("td_cell-price selling_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderPriceCommSet}
                  </td>
                  <td
                    className={cx("td_cell-ratio selling_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderRatioCommSet}
                  </td>
                </tr>
              );
            }
          })}
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
                  <td
                    className={cx("td_cell-price buying_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderPriceCommSet}
                  </td>
                  <td
                    className={cx("td_cell-ratio buying_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
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
                    <TradeHistoryContainer />
                  </td>
                </tr>
              );
            } else {
              // 일반 tr
              return (
                <tr key={item.orderId}>
                  <td
                    className={cx("td_cell-price buying_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderPriceCommSet}
                  </td>
                  <td
                    className={cx("td_cell-ratio buying_td")}
                    onClick={() => handlePriceClick(item.orderPrice)}
                  >
                    {item.orderRatioCommSet}
                  </td>
                  <td className={cx("td_cell-volume buying_td left-align")}>
                    {item.orderAmountCommSet}
                  </td>
                </tr>
              );
            }
          })}
          <tr>
            <td className={cx("selling-residual-quantity-container ")}>
              <span className={cx("text")}>매도잔량</span>
              <span className={cx("quantity")}>{sellTotalAmout}</span>
            </td>
            <td colSpan="2" />
            <td className={cx("buying-residual-quantity-container ")}>
              <span className={cx("text")}>매수잔량</span>
              <span className={cx("quantity")}>{buyTotalAmout}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
