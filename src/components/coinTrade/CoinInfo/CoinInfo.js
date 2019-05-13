import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";
import { commSet } from "lib/tools";

const cx = classNames.bind(styles);
// const { commSet } = tools;

const CoinInfo = ({ selectedCoin }) => {
  const {
    coinName,
    coinUnit,
    isFavorite,
    currentPrice,
    currentPriceCommset,
    movingRatio,
    dayBeforePrice,
    todayTopPrice,
    todayLowerPrice,
    todayTotalTradeVolume,
    todayTotalTradePrice
  } = selectedCoin;

  // 전일종가 대비 현재가
  const dayBeforeDiff = currentPrice - dayBeforePrice;
  const dayBeforeDiffCommset = commSet(dayBeforeDiff);

  // 텍스트 컬러
  let textColor = "";
  if (dayBeforeDiff > 0) {
    textColor = "red-text";
  } else if (dayBeforeDiff < 0) {
    textColor = "blue-text";
  }

  return (
    <div className={cx("coin-info-root ")}>
      <table className={cx("coin-info-table")}>
        <tbody>
          <tr>
            <td rowSpan="2" className={cx("name-col")}>
              <div className={cx("coin-name-container")}>
                <b className={cx("coin-name")}>{coinName}</b> &nbsp;
                <span className={cx("coin-unit")}>{coinUnit}/KRW</span> &nbsp;
                <span className={cx("favorite")}>
                  {isFavorite ? (
                    <Icon className={"pink-text text-lighten-1"}>favorite</Icon>
                  ) : (
                    <Icon>favorite</Icon>
                  )}
                </span>
              </div>
              <div className={cx(`current-price-container ${textColor}`)}>
                <span className={cx(`current-price `)}>
                  {currentPriceCommset}
                </span>
                &nbsp;
                <span className={cx("price-unit")}>KRW</span>
              </div>
              <div className={cx("coin-ratio-container")}>
                전일대비&nbsp;&nbsp;
                <span className={cx(`ratio ${textColor}`)}>{movingRatio}%</span>
                <span className={cx(`ratio-symbol ${textColor}`)}>
                  {textColor === "" && "-"}
                  {textColor === "red-text" && <Icon>arrow_drop_up</Icon>}
                  {textColor === "blue-text" && <Icon>arrow_drop_down</Icon>}
                </span>
                &nbsp;
                <span className={cx(`price-compare ${textColor}`)}>
                  {dayBeforeDiffCommset}
                </span>
              </div>
            </td>
            <td
              className={cx(
                "top-price-col font-weight lighter font-size s-08 "
              )}
            >
              <span className={cx("font-weight ")}>고가</span>&nbsp;
              <span className={cx("right-align ")}>
                <b className={cx("price left font-weight bold red-text")}>
                  {commSet(todayTopPrice)}
                </b>
                &nbsp;
                <span className={cx("price-unit font-size s-07 ")}>KRW</span>
              </span>
            </td>
            <td className={cx("volume-col font-weight lighter font-size s-08")}>
              <span className={cx("name font-weight ")}>거래량</span>
              &nbsp;
              <span className={cx("right-align")}>
                <b
                  className={cx(
                    "volume left font-weight bold grey-text text-darken-3"
                  )}
                >
                  {commSet(todayTotalTradeVolume)}
                </b>
                &nbsp;
                <span className={cx("volume-unit font-size s-07 ")}>
                  {coinUnit}
                </span>
              </span>
            </td>
          </tr>
          <tr className={cx(" font-weight lighter font-size s-08")}>
            <td className={cx("top-price-col  ")}>
              <span className={cx("font-weight  ")}>저가</span>
              &nbsp;
              <span className={cx("right-align")}>
                <b className={cx("price left font-weight bold blue-text")}>
                  {commSet(todayLowerPrice)}
                </b>
                &nbsp;
                <span className={cx("price-unit font-size s-07 ")}>KRW</span>
              </span>
            </td>
            <td
              className={cx(
                "today-trade-price-col font-weight lighter font-size s-08"
              )}
            >
              <span className={cx("name font-weight ")}>거래대금</span>&nbsp;
              <span className={cx("right-align")}>
                <b
                  className={cx(
                    "today-trade-price left font-weight bold grey-text text-darken-3"
                  )}
                >
                  {commSet(todayTotalTradePrice)}
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
