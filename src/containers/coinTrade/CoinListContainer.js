import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import CoinList from "components/coinTrade/CoinList";

class CoinLisContainer extends Component {
  componentDidMount() {}

  // 검색
  searchOnChange = e => {
    const { StockActions } = this.props;
    const { value } = e.target;
    // console.log("searchValue: ", this.props.searchValue);
    StockActions.setSearchValue(value);
  };

  // 즐겨찾기 토글
  toggleFavoriteClick = () => {
    const { StockActions } = this.props;
    StockActions.toggleFavoriteSw();
  };

  // 아이템 즐겨찾기
  favoriteItemClick = index => {
    const { StockActions } = this.props;
    StockActions.toggleFavoriteItem(index);
  };

  // 코인 리스트 정렬
  coinListSorting = field => {
    const { StockActions } = this.props;
    StockActions.setCoinListSorting(field);
  };

  render() {
    const {
      coins,
      searchValue,
      favoriteSw,
      coinListSortingField,
      coinListSortingDirection
    } = this.props;
    return (
      <CoinList
        coins={coins}
        searchOnChange={this.searchOnChange}
        searchValue={searchValue}
        favoriteSw={favoriteSw}
        toggleFavoriteClick={this.toggleFavoriteClick}
        favoriteItemClick={this.favoriteItemClick}
        coinListSortingField={coinListSortingField}
        coinListSortingDirection={coinListSortingDirection}
        coinListSorting={this.coinListSorting}
      />
    );
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    coins: state.stock.get("coins"),
    searchValue: state.stock.get("searchValue"),
    favoriteSw: state.stock.get("favoriteSw"),
    coinListSortingField: state.stock.get("coinListSortingField"),
    coinListSortingDirection: state.stock.get("coinListSortingDirection")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(CoinLisContainer);
