import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";
// import { selectCoin } from "../../../store/modules/stock";

const cx = classNames.bind(styles);

const CoinList = ({
  coins,
  selectedCoin,
  searchOnChange,
  searchValue,
  favoriteSw,
  toggleFavoriteClick,
  favoriteItemClick,
  coinListSortingField,
  coinListSortingDirection,
  coinListSorting,
  selectCoin
}) => {
  // 필터링
  let filteredCoins = coins.filter(item => {
    if (
      (favoriteSw && !item.isFavorite) ||
      (searchValue && item.coinName.indexOf(searchValue) < 0)
    ) {
      return false;
    } else {
      return true;
    }
  });

  // 정렬
  if (filteredCoins.size >= 2) {
    filteredCoins = filteredCoins.sort((a, b) => {
      if (coinListSortingDirection === "DESC") {
        return a[coinListSortingField] > b[coinListSortingField]
          ? -1
          : a[coinListSortingField] < b[coinListSortingField]
          ? 1
          : 0;
      } else {
        // 오름차순 정렬
        return a[coinListSortingField] < b[coinListSortingField]
          ? -1
          : a[coinListSortingField] > b[coinListSortingField]
          ? 1
          : 0;
      }
    });
  }

  return (
    <div className={cx("coin-list-root ")}>
      {/* search input */}
      <div className={cx("coin-input-container")}>
        <div className={cx("input-wrapper")}>
          <input
            name="coin-seearch"
            id="coin-seearch"
            placeholder="코인명을 검색하세요"
            className={cx("input_coin-search")}
            onChange={e => {
              searchOnChange(e);
            }}
            value={searchValue}
          />
        </div>
        <div className={cx("favorite-wrapper")}>
          <button
            className={cx(
              `favorite-toggle-button
              ${favoriteSw && "pink-text text-lighten-1"}`
            )}
            onClick={toggleFavoriteClick}
          >
            <Icon className={cx(`favorite-icon `)}>favorite</Icon>
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
              <button
                className={cx("order-button order-by_name")}
                onClick={() => coinListSorting("coinName")}
              >
                <div className={cx("order-name")}>코인명</div>
                <div className={cx("icons-container ")}>
                  <Icon
                    className={cx(`icon asc-icon
                    ${coinListSortingField === "coinName" &&
                      coinListSortingDirection === "ASC" &&
                      "grey-text text-darken-4"}`)}
                  >
                    arrow_drop_up
                  </Icon>
                  <br />
                  <Icon
                    className={cx(`icon desc-icon
                  ${coinListSortingField === "coinName" &&
                    coinListSortingDirection === "DESC" &&
                    "grey-text text-darken-4"}`)}
                  >
                    arrow_drop_down
                  </Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_current-price")}>
              <button
                className={cx("order-button order-by_current-price")}
                onClick={() => coinListSorting("currentPrice")}
              >
                <div className={cx("order-name")}>현재가</div>
                <div className={cx("icons-container ")}>
                  <Icon
                    className={cx(
                      `icon asc-icon
                      ${coinListSortingField === "currentPrice" &&
                        coinListSortingDirection === "ASC" &&
                        "grey-text text-darken-4"}`
                    )}
                  >
                    arrow_drop_up
                  </Icon>
                  <br />
                  <Icon
                    className={cx(
                      `icon desc-icon
                      ${coinListSortingField === "currentPrice" &&
                        coinListSortingDirection === "DESC" &&
                        "grey-text text-darken-4"}`
                    )}
                  >
                    arrow_drop_down
                  </Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_rate")}>
              <button
                className={cx("order-button order-by_price")}
                onClick={() => coinListSorting("movingRatio")}
              >
                <div className={cx("order-name")}>상승률</div>
                <div className={cx("icons-container ")}>
                  <Icon
                    className={cx(`icon asc-icon
                    ${coinListSortingField === "movingRatio" &&
                      coinListSortingDirection === "ASC" &&
                      "grey-text text-darken-4"}`)}
                  >
                    arrow_drop_up
                  </Icon>
                  <br />
                  <Icon
                    className={cx(`icon desc-icon
                    ${coinListSortingField === "movingRatio" &&
                      coinListSortingDirection === "DESC" &&
                      "grey-text text-darken-4"}`)}
                  >
                    arrow_drop_down
                  </Icon>
                </div>
              </button>
            </th>
            <th className={cx("th_trade-price")}>
              <button
                className={cx("order-button order-by_trade-price")}
                onClick={() => coinListSorting("todayTotalTradePrice")}
              >
                <div className={cx("order-name")}>거래대금</div>
                <div className={cx("icons-container ")}>
                  <Icon
                    className={cx(
                      `icon asc-icon
                      ${coinListSortingField === "todayTotalTradePrice" &&
                        coinListSortingDirection === "ASC" &&
                        "grey-text text-darken-4"}`
                    )}
                  >
                    arrow_drop_up
                  </Icon>
                  <br />
                  <Icon
                    className={cx(
                      `icon desc-icon
                        ${coinListSortingField === "todayTotalTradePrice" &&
                          coinListSortingDirection === "DESC" &&
                          "grey-text text-darken-4"}`
                    )}
                  >
                    arrow_drop_down
                  </Icon>
                </div>
              </button>
            </th>
          </tr>
        </thead>
        {/* list */}
        <tbody>
          {filteredCoins.map(item => {
            let bgColor = "white";
            if (selectedCoin && item.coinId === selectedCoin.coinId) {
              bgColor = "grey lighten-5";
            }
            return (
              <tr
                key={item.coinId}
                className={cx(`${bgColor} `)}
                onClick={() => selectCoin(item.coinId)}
              >
                <td className={cx(`col favorite-col `)}>
                  <Icon
                    className={cx(
                      `icon ${item.isFavorite && "pink-text text-lighten-1"}`
                    )}
                    title="즐겨찾기"
                    onClick={() => favoriteItemClick(item.coinId)}
                  >
                    favorite
                  </Icon>
                </td>
                <td className={cx("coin-name-col")}>
                  <div className={cx("coin-name")}>{item.coinName}</div>
                  <div className={cx("coin-unit")}>{item.coinUnit}/KRW</div>
                </td>
                <td className={cx("current-price-col down")}>
                  <div
                    className={cx(
                      `current-price bold ${
                        item.movingRatio > 0 ? "red-text" : "blue-text"
                      }`
                    )}
                  >
                    {item.currentPriceCommSet}
                  </div>
                </td>
                <td className={cx("today-rate-col down")}>
                  <div
                    className={cx(
                      `rate bold ${
                        item.movingRatio > 0 ? "red-text" : "blue-text"
                      }`
                    )}
                  >
                    {item.movingRatio} %
                  </div>
                </td>
                <td className={cx("today-trade-col")}>
                  <span className={cx("tody-trade-value bold")}>
                    {parseInt(item.todayTotalTradePrice / 1000000, 10)}
                  </span>
                  &nbsp;
                  <span className={cx("trade-unit")}>백만</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
