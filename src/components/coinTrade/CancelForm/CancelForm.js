import React from "react";
import classNames from "classnames/bind";
// import { Icon } from "@material-ui/core";

import styles from "./styles.scss";
import { commSet } from "lib/tools";

const cx = classNames.bind(styles);

const CancelForm = ({ cancelOrders, handleCancelClick }) => {
  return (
    <div className={cx("cancel-form-root ")}>
      <div className={cx("list-header")}>
        <div className={cx("col-type")}>구분</div>
        <div className={cx("col-price")}>주문가</div>
        <div className={cx("col-amount")}>수량</div>
        <div className={cx("col-button")}>버튼</div>
      </div>
      <ul>
        {cancelOrders.map(item => {
          return (
            <li key={item.orderId}>
              <div
                className={
                  "col-type " +
                  (item.orderType === "buy" ? "red-text" : "blue-text")
                }
              >
                {item.orderType}
              </div>
              <div className={cx("col-price")}>{commSet(item.orderPrice)}</div>
              <div className={cx("col-amount")}>
                {commSet(item.currentAmount, true)}
              </div>
              <div className={cx("col-button")}>
                <button
                  type="button"
                  className={cx("button-clear")}
                  onClick={() =>
                    handleCancelClick(item.orderId, item.orderType)
                  }
                  title="취소"
                >
                  취소
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CancelForm;
