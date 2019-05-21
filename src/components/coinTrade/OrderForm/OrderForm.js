import React from "react";
import classNames from "classnames/bind";
import { Icon, Menu, MenuItem } from "@material-ui/core";

import styles from "./styles.scss";
import { commSet } from "lib/tools";
import Elements from "components/common/Elements";

const cx = classNames.bind(styles);
const { InputCommSet } = Elements;

const OrderForm = ({
  topValueText,
  topValueUnit,
  topValueCommset,
  volumeText,
  volumeUnit,
  volumeCommset,
  handleVolumeChange,
  handleVolumeMenuClick,
  handleSetVolumeRatio,
  volumeMenuAnchorEl,
  priceText,
  priceCommset,
  handlePriceChange,
  handlePriceBlur,
  handleUpperTickClick,
  handleLowerTickClick,
  totalPriceText,
  totalPriceCommset,
  handleBuyingTotalPriceChange,
  minimumOrder,
  buttonText,
  buttonClass,
  handleSubmitClick
}) => {
  return (
    <div className={cx("order-form-root ")}>
      <dl className={cx("current-price-container flex between")}>
        <dt
          className={cx(
            "font-size .s-1d2 font-weight bold grey-text text-darken-2"
          )}
        >
          {topValueText}
        </dt>
        <dd>
          <span className={cx("current-price font-size s-1d5")}>
            {topValueCommset}
          </span>
          &nbsp; {topValueUnit}
        </dd>
      </dl>

      {/* form */}
      <form className={cx("order-form")}>
        {/* 수량 */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 bold")}>
            {volumeText}
          </dt>
          <dd
            className={cx("input-container order-price-container flex around")}
          >
            <div className={cx("input-column")}>
              <InputCommSet
                name={"buyingVolume"}
                className={cx("right-align input-clear grey-text")}
                value={volumeCommset}
                digits={4}
                onChange={handleVolumeChange}
              />
              &nbsp;&nbsp;
              <span className={cx("order-unit grey-text text-lighten-1 ")}>
                {volumeUnit}
              </span>
            </div>
            <div className={cx("buttons-column center-align")}>
              <button
                type="button"
                className={cx("buttons-column button-clear center-align")}
                onClick={handleVolumeMenuClick}
              >
                <Icon>keyboard_arrow_down</Icon>
              </button>
              <Menu
                id="contents-form-volume-menu"
                anchorEl={volumeMenuAnchorEl}
                open={Boolean(volumeMenuAnchorEl)}
                onClose={() => {
                  handleVolumeMenuClick();
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleSetVolumeRatio(100);
                  }}
                >
                  100%
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetVolumeRatio(50);
                  }}
                >
                  50%
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetVolumeRatio(25);
                  }}
                >
                  25%
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleSetVolumeRatio(10);
                  }}
                >
                  10%
                </MenuItem>
              </Menu>
            </div>
          </dd>
        </dl>
        {/* 가격 */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 ")}>{priceText}</dt>
          <dd className={cx("input-container flex around")}>
            <div className={cx("input-column")}>
              <InputCommSet
                name={"buyingPrice"}
                className={cx("left-align buying-price input-clear grey-text")}
                onChange={handlePriceChange}
                value={priceCommset}
                onBlur={handlePriceBlur}
              />
              &nbsp;&nbsp;
            </div>
            <div className={cx("buttons-column center-align")}>
              <button
                type="button"
                className={cx(
                  " button-clear lower-price-button s6 font-size s-1d5"
                )}
                onClick={handleLowerTickClick}
              >
                -
              </button>
              <button
                type="button"
                className={cx(
                  " button-clear upper-price-button s6 font-size s-1d5"
                )}
                onClick={handleUpperTickClick}
              >
                +
              </button>
            </div>
          </dd>
        </dl>
        {/* total price */}
        <dl className={cx("flex between")}>
          <dt className={cx("bold grey-text text-darken-2 bold")}>
            {totalPriceText}
          </dt>
          <dd
            className={cx(
              "input-container buying-total-price-container flex around"
            )}
          >
            <div className={cx("input-column")}>
              <InputCommSet
                name={"buying-total-price"}
                className={cx(
                  "buying-total-price right-align input-clear grey-text"
                )}
                onChange={handleBuyingTotalPriceChange}
                value={totalPriceCommset}
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
            <div>최소 주문 수량: {minimumOrder}</div>
            {/* <div>수수료: 0.1%</div> */}
          </dd>
        </dl>
        <div className={cx("order-button-container")}>
          <button
            type="submit"
            className={cx(
              `order-submit-button button-clear s12 font-size s-1 ${buttonClass}`
            )}
            onClick={handleSubmitClick}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
