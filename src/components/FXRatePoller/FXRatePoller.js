import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionCreators from "../../redux/actions/actionCreators";
import { UPDATE_INTERVAL_MS } from "../../config";

class FXRatePoller extends React.Component {
  componentDidMount() {
    this.props.actions.loadFxRates();
    this.timerId = setInterval(
      this.props.actions.loadFxRates,
      UPDATE_INTERVAL_MS
    );
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    return null;
  }
}

FXRatePoller.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadFxRates: bindActionCreators(actionCreators.loadFxRates, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(FXRatePoller);
