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
    StockActions.setSearchValue(value);
  };

  // 즐겨찾기 토글
  toggleFavoriteClick = () => {
    const { StockActions } = this.props;
    StockActions.toggleFavoriteSw();
  };

  // 아이템 즐겨찾기
  favoriteItemClick = coinId => {
    const { StockActions } = this.props;
    StockActions.toggleFavoriteItem(coinId);
  };

  // 코인 리스트 정렬
  coinListSorting = field => {
    const { StockActions } = this.props;
    StockActions.setCoinListSorting(field);
  };

  // 활성화 코인 선택
  selectCoin = coinId => {
    const { StockActions } = this.props;
    StockActions.selectCoin(coinId);
  };

  render() {
    const {
      coins,
      selectedCoin,
      searchValue,
      favoriteSw,
      coinListSortingField,
      coinListSortingDirection
    } = this.props;
    return (
      <CoinList
        coins={coins}
        selectedCoin={selectedCoin}
        searchOnChange={this.searchOnChange}
        searchValue={searchValue}
        favoriteSw={favoriteSw}
        toggleFavoriteClick={this.toggleFavoriteClick}
        favoriteItemClick={this.favoriteItemClick}
        coinListSortingField={coinListSortingField}
        coinListSortingDirection={coinListSortingDirection}
        coinListSorting={this.coinListSorting}
        selectCoin={this.selectCoin}
      />
    );
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    coins: state.stock.get("coins"),
    selectedCoin: state.stock.get("selectedCoin"),
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
