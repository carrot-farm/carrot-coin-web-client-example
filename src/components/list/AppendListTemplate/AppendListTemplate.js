import React, { Component } from "react";
import styles from "./AppendListTemplate.scss";
import classNames from "classnames/bind";
import SimpleList from "components/list/SimpleList";
import { Button, Fab } from "material-ui/core";
import { Add } from "material-ui/icons";

const cx = classNames.bind(styles);

class AppendListTemplate extends Component {
  render() {
    const {
      useWriteButton,
      page,
      lastPage,
      list,
      textField, //가져온 데이터에서 보여질 필드명
      handleAppendList, //추가 버튼클릭
      handleItemMenuClick, //아이템 메뉴 오픈 클릭
      handleWriteClick, //클작성 버튼 클릭
      handleModifyClick, //수정 버튼 클릭
      handleDeleteClick, //삭제 버튼 클릭
      isToDoList, //toDo list 인지 확인.
      handleCompleteClick //todo toggle
    } = this.props;

    return (
      <div className="list_append-list-template-root">
        {/* 리스트 */}
        <SimpleList
          page={page}
          lastPage={lastPage}
          list={list}
          textField={textField}
          handleItemMenuClick={handleItemMenuClick}
          handleCompleteClick={handleCompleteClick}
          handleModifyClick={handleModifyClick}
          handleDeleteClick={handleDeleteClick}
          isToDoList={isToDoList}
        />
        {/* 추가 버튼 */}
        {lastPage > 1 && lastPage > page && (
          <div className={cx("list_append-list-button")}>
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              onClick={handleAppendList}
            >
              More
            </Button>
          </div>
        )}
        {/* 작성 버튼 */}
        {useWriteButton && (
          <div
            className={cx("list_append-list-template_write-button container")}
          >
            <div className={cx("write-button-container")}>
              <Fab
                color="secondary"
                arial-label="Add"
                onClick={evt => handleWriteClick(evt)}
              >
                <Add />
              </Fab>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AppendListTemplate;
