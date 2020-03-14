import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  // AppBar,
  // Toolbar,
  // IconButton,
  // Drawer,
  Button
  // List,
  // ListItem,
  // ListItemText
} from "@material-ui/core";
// import { Menu, Person, Add, Send } from "@material-ui/icons";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./styles.scss";
import Elements from "../Elements";

const cx = classNames.bind(styles);
const { Header } = Elements;

// ===== 헤더
class TradeHeader extends Component {
  render() {
    return (
      <Header className={cx("trade-header-root")}>
        <div className={cx("main-container")}>
          <div className={cx("logo-container")}>logo</div>
          <div className={cx("menu-container")}>
            <ul>
              <li className={"active"}>
                <Link to="/">거래소</Link>
              </li>
              <li>고객센터</li>
              <li>공지사항</li>
            </ul>
          </div>
          <div className={cx("right-buttons-container")}>
            {/* <div className={cx("login-button-container")}>
              <Link to="/login">
                <Button variant="outlined" className={cx("login-button")}>
                  로그인
                </Button>
              </Link>
            </div>
            <div className={cx("register-button")}>
              <Link to="/register">
                <Button variant="outlined" className={cx("register-button")}>
                  회원 가입
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </Header>
    );
  }
}

export default withStyles({})(TradeHeader);
