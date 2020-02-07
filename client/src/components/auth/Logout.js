import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import {
  getTasks,
  setTasksLoading,
  clearTasks
} from "../../actions/taskActions";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink
          onClick={() => {
            this.props.logout();
            this.props.clearTasks();
          }}
          href="#"
        >
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout, getTasks, setTasksLoading, clearTasks })(
  Logout
);
