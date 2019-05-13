import React, { Component } from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import { inputCommSet } from "lib/tools";

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

// ===== row
const Row = ({ children, ...args }) => {
  return (
    <div className={cx("el-row row")} {...args}>
      {children}
    </div>
  );
};

// ===== col
const Col = ({ children, ...args }) => {
  return (
    <div className={cx("el-col col")} {...args}>
      {children}
    </div>
  );
};

/* ===== inputEvent에 commset를 value로
  number 와 numberCommSet 을 반환한다.
  또한, 기본적으로 Enter 와 Backspace 이벤트를 정지한다.
*/
class InputCommSet extends Component {
  state = {
    number: 0,
    numberCommSet: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props || prevState === this.state) {
      return false;
    }
  }

  commSetValue = value => {
    const { digits } = this.props;
    const result = inputCommSet(value, digits);
    // console.log("---> |||| InputCommSet.commSetValue(", result, digits, ")");
    if (!result) {
      return;
    }
    // console.log("**** pass");
    this.setState({
      number: result.number,
      numberCommSet: result.numberCommSet
    });
    return result;
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    const result = this.commSetValue(value);
    // console.log("handleChange.result: ", returnData);
    if (onChange) {
      onChange({
        ...e,
        sendData: result
      });
    }
  };

  // 키동작 관련
  handleKeyDown = e => {
    const { onKeyDown, useEnter } = this.props;
    const result = this.commSetValue(e.target.value);
    if (!useEnter && e.key === "Enter") {
      e.preventDefault();
    } else if (onKeyDown) {
      onKeyDown({
        ...e,
        sendData: result
      });
    }
  };

  render() {
    const { fixed, onChange, onKeyDown, digits, ...args } = this.props;
    return (
      <input
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        {...args}
      />
    );
  }
}

export default {
  Header,
  Container,
  Row,
  Col,
  InputCommSet
};
