import React from "react";
import classNames from "classnames/bind";
import { Icon } from "@material-ui/core";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

const BuyingForm = () => {
  return (
    <div className={cx("buying-form-root ")}>
      <dl className={cx("current-price-container flex between")}>
        <dt
          className={cx(
            "font-size .s-1d2 font-weight bold grey-text text-darken-2"
          )}
        >
          매수가능액
        </dt>
        <dd>
          <span className={cx("current-price font-size s-1d5")}>0</span>
          &nbsp; KRW
        </dd>
      </dl>
      <form className={cx("buying-form")}>
        {/* 매수수량 */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 bold")}>매수수량</dt>
          <dd className={cx("input-container flex around")}>
            <div className={cx("input-column")}>
              <input
                className={cx("right-align input-clear grey-text")}
                value={"0"}
              />
              &nbsp;&nbsp;
              <span className={cx("order-unit")}>BTC</span>
            </div>
            <div className={cx("buttons-column center-align")}>
              <button
                className={cx("buttons-column button-clear center-align")}
              >
                <Icon>keyboard_arrow_down</Icon>
              </button>
            </div>
          </dd>
        </dl>
        {/* 매수가격 */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 ")}>매수가격</dt>
          <dd className={cx("input-container flex around")}>
            <div className={cx("input-column")}>
              <input
                className={cx("left-align input-clear grey-text")}
                value={"6,283,000"}
              />
              &nbsp;&nbsp;
            </div>
            <div className={cx("buttons-column center-align")}>
              <button
                className={cx(
                  " button-clear lower-price-button s6 font-size s-1d5"
                )}
              >
                -
              </button>
              <button
                className={cx(
                  " button-clear upper-price-button s6 font-size s-1d5"
                )}
              >
                +
              </button>
            </div>
          </dd>
        </dl>
        {/* 매수총액 */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 bold")}>매수총액</dt>
          <dd
            className={cx(
              "input-container buying-total-price-container flex around"
            )}
          >
            <div className={cx("input-column")}>
              <input
                name={"buying-total-price"}
                className={cx(
                  "buying-total-price right-align input-clear grey-text"
                )}
                value={"0"}
              />
              &nbsp;&nbsp;
              <span
                className={cx(
                  "order-unit grey-text text-lighten-2 font-size s-0d8"
                )}
              >
                KRW
              </span>
            </div>
          </dd>
        </dl>
        {/* descript  */}
        <dl className={cx("flex between")}>
          <dt>&nbsp;</dt>
          <dd
            className={cx(
              "description-container font-size grey-text lighten-2"
            )}
          >
            <div>최소 주문 수량: 0.001</div>
            <div>수수료: 0.1%</div>
          </dd>
        </dl>
        <div className={cx("order-button-container")}>
          <button
            className={cx(
              "order-submit-button button-clear s12 red lighten-2 white-text font-size s-1"
            )}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyingForm;
