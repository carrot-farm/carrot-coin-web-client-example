import React from "react";
import styles from "./LoginModal.scss";
import classNames from "classnames/bind";
import { Dialog, Button } from "@material-ui/core";
const cx = classNames.bind(styles);

const LoginModal = ({ visible, handleHideModal, handleLoginClick }) => (
  <div>
    <Dialog
      component="h3"
      variant="display"
      align="center"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={visible}
      onClose={handleHideModal}
    >
      <div className={cx("login-modal-wrapper")}>
        <div className={cx("login-container")}>
          <h3> 로그인 </h3>
          <br />
          <div className={cx("login-button")} onClick={handleLoginClick}>
            <Button size="large" variant="outlined" color="secondary">
              Google
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
);
export default LoginModal;
