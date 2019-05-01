import React, { Component } from "react";
import classNames from "classnames/bind";
import { Switch } from "@material-ui/core";

import styles from "./styles.scss";
import Elements from "../../common/Elements";

const cx = classNames.bind(styles);
const { Container, Row, Col } = Elements;

class Config extends Component {
  render() {
    const { toggleCompleteView, handleAllViewChange } = this.props;
    return (
      <div className={cx("config-root ")}>
        <Container>
          <Row className={"row"}>
            <Col test="test">
              <div>완료목록 보기</div>
              <div className="center-space" />
              <div>
                <Switch
                  checked={toggleCompleteView}
                  onChange={handleAllViewChange}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Config;
