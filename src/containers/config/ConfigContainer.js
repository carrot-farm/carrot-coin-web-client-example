import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as configActions from "store/modules/config";

import Config from "components/config/Config";

class ConfigContainer extends Component {
  state = {
    loaded: false
  };

  componentDidMount = async () => {
    const { ConfigActions } = this.props;
    await ConfigActions.getConfig();
    this.setState({
      loaded: true
    });
  };

  handleAllViewChange = e => {
    const { ConfigActions } = this.props;
    ConfigActions.toggleCompleteView(e.target.checked);
  };

  render() {
    const { handleAllViewChange } = this;
    const { toggleCompleteView } = this.props;
    if (!this.state.loaded) {
      return <Fragment />;
    }
    return (
      <Fragment>
        <Config
          toggleCompleteView={toggleCompleteView}
          handleAllViewChange={handleAllViewChange}
        />
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    toggleCompleteView: state.config.get("toggleCompleteView")
  }),
  dispatch => ({
    ConfigActions: bindActionCreators(configActions, dispatch)
  })
)(ConfigContainer);
