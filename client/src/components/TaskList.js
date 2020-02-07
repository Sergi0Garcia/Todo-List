import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTasks, deleteTask } from "../actions/taskActions";
import PropTypes from "prop-types";

class TaskList extends Component {
  static propTypes = {
    getTasks: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getTasks();
  }

  onDeleteClick = id => {
    this.props.deleteTask(id);
  };

  render() {
    const { tasks } = this.props.task;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="task-list">
            {tasks.map(({ task_id, task }) => (
              <CSSTransition key={task_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, task_id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {task}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getTasks, deleteTask })(TaskList);
