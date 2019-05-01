import React from "react";

import classNames from "classnames/bind";
import { TextField } from "material-ui/core";
// import {
//   MoreVert,
//   RadioButtonChecked,
//   RadioButtonUnchecked
// } from "@material-ui/icons";
import * as tools from "lib/tools";
import styles from "./styles.scss";

const cx = classNames.bind(styles);

const Editor = ({ handleOnChange, input }) => {
  return (
    <div className={cx("editor-root ")}>
      <form>
        <TextField
          id="editor-textField"
          className={cx("editor-textField")}
          name="editor-content"
          multiline
          autoFocus
          fullWidth
          margin="normal"
          InputProps={{
            disableUnderline: true
          }}
          value={input}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default Editor;
