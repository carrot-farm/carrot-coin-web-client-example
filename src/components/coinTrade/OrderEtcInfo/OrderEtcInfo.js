import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const OrderEtcInfo = ({
  dayBeforePriceCommSet,
  todayTopPriceRatio,
  todayTopPriceCommSet,
  todayLowerPriceRatio,
  todayLowerPriceCommSet
}) => {
  return (
    <>
      <div className={cx("order-etc-info-root td_row")}>
        <div className={cx("key grey-text ")}>전일가격</div>
        <div className={cx("value right right-align ")}>
          {dayBeforePriceCommSet}
        </div>
      </div>
      <div className={cx("td_row")}>
        <div className={cx("key grey-text ")}>고가</div>
        <div
          className={cx(
            `value right right-align
            ${todayTopPriceRatio > 0 && "red-text"}
            ${todayTopPriceRatio < 0 && "blue-text"}
            `
          )}
        >
          {todayTopPriceCommSet}
          <br />({todayTopPriceRatio > 0 ? "+" : ""}
          {todayTopPriceRatio}%)
        </div>
      </div>
      <div className={cx("td_row")}>
        <div className={cx("key grey-text ")}>저가</div>
        <div
          className={cx(`value right right-align
            ${todayLowerPriceRatio > 0 && "red-text"}
            ${todayLowerPriceRatio < 0 && "blue-text"}
          `)}
        >
          {todayLowerPriceCommSet}
          <br />({todayLowerPriceRatio > 0 ? "+" : ""}
          {todayLowerPriceRatio}%)
        </div>
      </div>
    </>
  );
};

export default OrderEtcInfo;
