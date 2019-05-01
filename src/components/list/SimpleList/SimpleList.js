import React, { Component } from "react";
import styles from "./SimpleList.scss";
import classNames from "classnames/bind";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem
} from "material-ui/core";
import {
  MoreVert,
  RadioButtonChecked,
  RadioButtonUnchecked
} from "material-ui/icons";
import * as tools from "lib/tools";

const cx = classNames.bind(styles);

const inlineStyles = {
  completed: {
    textDecoration: "line-through"
  }
};

// 아이템 메뉴
const ItemMenu = ({
  anchorEl,
  itemMenuClose,
  handleModifyClick,
  handleDeleteClick
}) => {
  const isOpen = Boolean(anchorEl);
  return (
    <Menu
      id={`SmpleListMenu`}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={itemMenuClose}
      PaperProps={{
        style: {
          width: 120
        }
      }}
    >
      <MenuItem onClick={handleModifyClick}>수정</MenuItem>
      <MenuItem onClick={handleDeleteClick}>삭제</MenuItem>
    </Menu>
  );
};

class SimpleList extends Component {
  //상태
  state = {
    anchorEl: null
  };

  //아이템 메뉴 클릭
  itemMenuClick = (evt, id) => {
    const { handleItemMenuClick } = this.props;
    this.setState({
      anchorEl: evt.currentTarget
    });
    handleItemMenuClick(id);
  };

  //아이템 메뉴 닫기
  itemMenuClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  //수정 버튼 클릭
  handleModifyClick = () => {
    const { handleModifyClick } = this.props;
    this.itemMenuClose();
    handleModifyClick();
  };

  //삭제 클릭
  handleDeleteClick = () => {
    const { handleDeleteClick } = this.props;
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      return false;
    }
    this.itemMenuClose();
    handleDeleteClick();
  };

  //랜더링 제한
  componentDidUpdate(nextProps, nextState) {
    if (
      this.state.anchorEl === nextState.anchorEl &&
      this.props.list === nextProps.list
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      // page,
      // lastPage,
      list,
      textField,
      isToDoList,
      handleCompleteClick
    } = this.props;

    const text = textField || "text";

    const simpleList = list.map(data => {
      const { _id, completed, writeTime, completeTime } = data;
      const subject = data[text]; //text의 가변성을 주기 위해.
      let secondary = "";
      if (writeTime) {
        secondary += tools.dateFormat(new Date(writeTime));
        if (completeTime) {
          secondary += " ~ " + tools.dateFormat(new Date(completeTime));
        }
      }
      return (
        <ListItem key={_id} id={_id}>
          {isToDoList && (
            <IconButton onClick={evt => handleCompleteClick(evt, _id)}>
              {completed ? (
                <RadioButtonChecked color="inherit" />
              ) : (
                <RadioButtonUnchecked color="secondary" />
              )}
            </IconButton>
          )}
          <ListItemText
            primary={subject}
            secondary={secondary}
            style={completed ? inlineStyles.completed : {}}
          />
          <IconButton
            aria-label="More"
            aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={evt => this.itemMenuClick(evt, _id)}
          >
            <MoreVert />
          </IconButton>
        </ListItem>
      );
    });

    return (
      <div className={cx("simple-list-root ")}>
        <ItemMenu
          anchorEl={this.state.anchorEl}
          handleModifyClick={this.handleModifyClick}
          handleDeleteClick={this.handleDeleteClick}
          itemMenuClose={this.itemMenuClose}
        />
        <List>{simpleList}</List>
      </div>
    );
  }
}

export default SimpleList;
