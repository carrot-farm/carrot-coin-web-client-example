import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";

const cx = classNames.bind(styles);

// ===== header
const Header = ({ children, className, ...args }) => (
  <header className={cx(`el-header ${className || ""}`)} {...args}>
    {children}
  </header>
);

// ===== container
const Container = ({ children, ...args }) => {
  return (
    <div className="el-container container" {...args}>
      {children}
    </div>
  );
};

const Row = ({ children, ...args }) => {
  return (
    <div className={cx("el-row row")} {...args}>
      {children}
    </div>
  );
};
const Col = ({ children, ...args }) => {
  return (
    <div className={cx("el-col col")} {...args}>
      {children}
    </div>
  );
};

export default {
  Header,
  Container,
  Row,
  Col
};
