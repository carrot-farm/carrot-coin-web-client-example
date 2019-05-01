import React from "react";
import PageTemplate from "components/common/PageTemplate";
import TradeContainer from "containers/coinTrade/TradeContainer";

const TradePage = ({ match }) => {
  return (
    <PageTemplate>
      <TradeContainer />
    </PageTemplate>
  );
};

export default TradePage;
