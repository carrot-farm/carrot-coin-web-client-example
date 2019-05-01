/* (options)
   useWriteButton(bool),
   actionsName(str),
   writeFormName(str),
   modifyFormName(str),
   textField(str)
   isToDoList: (bool)
*/
import React, { Component } from "react";

import AppendListTemplate from "components/list/AppendListTemplate";

const withSimpleList = options => WrappedComponent => {
  return class extends Component {
    actions = this.props[options.actionsName];

    //리스트 추가 하기
    handleAppendList = () => {
      const { page, selectedCategory, toggleCompleteView } = this.props;
      const _page = page + 1;
      this.actions.getAppendList({
        page: _page,
        categoryId: selectedCategory,
        completed: toggleCompleteView
      });
    };

    //아이템 작성 버튼 클릭
    handleWriteClick = evt => {
      const { BaseActions, history } = this.props;
      this.actions.clearItem();
      if (history && options.actionsName === "ToDoActions") {
        return history.push("/Editor");
      }
      BaseActions.showModal(options.writeFormName);
    };

    //아이템 메뉴 오픈 버튼 클릭
    handleItemMenuClick = id => {
      this.actions.setId(id);
    };

    //아이템 수정 버튼 클릭
    handleModifyClick = () => {
      const { BaseActions, _id, history } = this.props;
      this.actions.getItem(_id);
      if (options.actionsName === "ToDoActions") {
        return history.push("/Editor");
      }
      BaseActions.showModal(options.modifyFormName);
    };

    //아이템 삭제 버튼 클릭
    handleDeleteClick = () => {
      const { _id } = this.props;
      this.actions.deleteItem({ _id: _id });
    };

    //완료 토글
    handleCompleteClick = (evt, _id) => {
      const { list } = this.props;
      list.map(item => {
        if (item._id === _id) {
          this.actions.updateItem({
            itemId: _id,
            content: item.content,
            completed: !item.completed
          });
          return false;
        }
      });
      evt.stopPropagation();
    };

    //컴포넌트 마운트 후
    componentDidMount() {
      // const { toggleCompleteView } = this.props;
      // console.log(toggleCompleteView);
      this.actions.setPage(1);
      // this.actions.getList({ page: 1, completed: true });
    }

    //페이지가 바뀌었을 경우 랜더링
    componentDidUpdate(prevProps, prevState) {
      if (this.props.page === prevProps.page) {
        return false;
      }
      return true;
    }

    //랜더링
    render() {
      const {
        textField, // 리스트 출력시 보여질 필드명.
        loading,
        isToDoList //todolist 일 경우
      } = options;

      const {
        handleAppendList,
        handleWriteClick,
        handleModifyClick,
        handleDeleteClick,
        handleItemMenuClick,
        handleCompleteClick
      } = this;

      const { page, lastPage, list, isLogged } = this.props;

      let activeWriteButton = isLogged ? true : false;

      //로딩 시 페이지 표시 안함.
      if (loading) {
        return null;
      }

      return (
        <div>
          <WrappedComponent {...this.props} />
          <AppendListTemplate
            useWriteButton={activeWriteButton}
            isToDoList={isToDoList}
            page={page}
            lastPage={lastPage}
            list={list}
            textField={textField}
            handleAppendList={handleAppendList}
            handleItemMenuClick={handleItemMenuClick}
            handleWriteClick={handleWriteClick}
            handleModifyClick={handleModifyClick}
            handleDeleteClick={handleDeleteClick}
            handleCompleteClick={handleCompleteClick}
          />
        </div>
      );
    }
  };
};

export default withSimpleList;
