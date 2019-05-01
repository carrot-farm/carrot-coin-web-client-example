import React from "react";
import { Switch, Route } from "react-router-dom";
import { TradePage } from "pages";
import Base from "containers/common/Base";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={TradePage} />
      </Switch>
      <Base />
    </div>
  );
};

export default App;
