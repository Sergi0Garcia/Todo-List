import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addTask } from "../actions/taskActions";
import PropTypes from "prop-types";

class TaskModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = {
      task: this.state.name
    };

    //Add Task via addTask action
    this.props.addTask(newTask);

    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Task
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage tasks</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Task List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="task"> Task</Label>
                <Input
                  type="text"
                  name="name"
                  user_id="id"
                  placeholder="Add Task"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Task
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addTask })(TaskModal);
