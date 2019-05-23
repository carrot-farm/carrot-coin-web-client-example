import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as baseActions from "store/modules/base";
import * as stockActions from "store/modules/stock";
import TradeChart from "components/coinTrade/TradeChart";
import { jsonSort } from "lib/tools";

class TradeChartContainer extends Component {
  state = {
    options: {
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#DF7D46",
            downward: "#3C90EB"
          }
        }
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  };
  componentDidMount() {}

  // ===== 데이터 필터링
  filteredChartData = () => {
    // console.log("> run");
    const { selectedCoin, chartData } = this.props;
    const coinIndex = chartData.findIndex(
      item => item.get("coinId") === selectedCoin.get("coinId")
    );
    let dataJS = chartData.getIn([coinIndex, "data"]).toJS();
    // console.log(
    //   "> filteredChartData: ",
    //   dataJS,
    //   jsonSort(dataJS, "concludedTime")
    // );
    return [{ data: jsonSort(dataJS, "concludedTime") }];
  };

  render() {
    const series = this.filteredChartData();
    if (!series[0].data.length) {
      return null;
    }
    return <TradeChart options={this.state.options} series={series} />;
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    selectedCoin: state.stock.get("selectedCoin"),
    chartData: state.stock.get("chartData")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    StockActions: bindActionCreators(stockActions, dispatch)
  })
)(TradeChartContainer);
