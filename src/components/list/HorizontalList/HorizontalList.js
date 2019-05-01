import React, { Component } from "react";
import styles from "./HorizontalList.scss";
import classNames from "classnames/bind";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Button } from "material-ui/core";

const cx = classNames.bind(styles);

class HorizontalList extends Component {
  render() {
    const {
      list,
      selectedCategory,
      handleOnSelect,
      handleMouseEnter,
      handleMouseLeave
    } = this.props;

    //리스트 객체 생성
    const horizontalList = list.map(data => {
      const { _id, category } = data;
      return (
        <div key={_id} className={"item "}>
          <Button>{category}</Button>
        </div>
      );
    });

    return (
      <div
        className={cx("horizontal-list-root")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={cx("horizontal-list-container")}>
          {/* {horizontalList} */}
          <ScrollMenu
            data={horizontalList}
            selected={selectedCategory}
            onSelect={handleOnSelect}
            alignCenter={true}
          />
        </div>
      </div>
    );
  }
}

export default HorizontalList;
