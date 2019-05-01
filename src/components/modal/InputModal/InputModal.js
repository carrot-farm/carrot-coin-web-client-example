import React from "react";
import styles from "./InputModal.scss";
import classNames from "classnames/bind";
import {
  Dialog,
  Button,
  DialogContentText,
  Input,
  DialogActions
} from "@material-ui/core";
const cx = classNames.bind(styles);

const InputModal = ({
  visible,
  title,
  contentText,
  value,
  handleHideModal,
  handleSubmitClick,
  handleOnChange,
  handleKeyPress,
  handleOnEnter
}) => (
  <div>
    <Dialog
      component="h3"
      variant="display"
      align="center"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={visible}
      onClose={handleHideModal}
      onEnter={handleOnEnter}
    >
      <div className={cx("input-modal-wrapper")}>
        <div className={cx("input-modal-container")}>
          <h3> {title} </h3>
          <br />
          <DialogContentText>{contentText}</DialogContentText>
          <Input
            autoFocus
            fullWidth
            name="category"
            margin="dense"
            id="input-modal-input"
            type="text"
            value={value}
            onChange={handleOnChange}
            onKeyPress={handleKeyPress}
          />
          <DialogActions>
            <Button onClick={handleHideModal} color="secondary">
              취소
            </Button>
            <Button onClick={handleSubmitClick} color="secondary">
              확인
            </Button>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  </div>
);
export default InputModal;
