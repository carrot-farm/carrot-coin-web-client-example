import React from "react";
import classNames from "classnames/bind";

import styles from "./PageTemplate.scss";
import TradeHeaderContainer from "containers/common/TradeHeaderContainer";

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => {
  return (
    <div className={cx("page-template-root")}>
      <TradeHeaderContainer />
      <main className={[cx("main")]}>{children}</main>
      <footer className={cx("footer")} />
    </div>
  );
};

export default PageTemplate;
