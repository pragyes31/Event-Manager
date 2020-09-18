import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AddEventButton />
    </div>
  );
}

const AddEventButtonStyles = {
  btn: {
    width: "60%",
    maxWidth: "400px",
    marginTop: "20px"
  }
};

class AddEventButtonComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventFormOpen: true
    };
  }
  handleEventForm = () => {
    this.setState({ isEventFormOpen: !this.state.isEventFormOpen });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleEventForm}
          className={classes.btn}
          variant="contained"
          color="primary"
        >
          Add Event
        </Button>
        {this.state.isEventFormOpen && (
          <AddEventDetails
            isEventFormOpen={this.state.isEventFormOpen}
            handleEventForm={this.handleEventForm}
          />
        )}
      </div>
    );
  }
}

const AddEventButton = withStyles(AddEventButtonStyles)(AddEventButtonComp);

const AddEventDetailsStyles = {
  addEvent: {
    width: "400px",
    height: "80vh",
    backgroundColor: "#0ca8a3",
    margin: "10px 20px 0px 10px",
    color: "#fff",
    border: "3px solid #1c6e7d",
    borderRadius: "20px"
  }
};

class AddEventDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isEventFormOpen}
        aria-labelledby="Add New event"
        aria-describedby="Dialog window to add details about the new page"
        //onBackdropClick={this.props.handleEventForm}
        //onEscapeKeyDown={this.props.handleEventForm}
        classes={{ paper: classes.addEventDialog }}
      >
        <form className={classes.addEvent}>
          <TextField className={classes.eventInputs} label="Event Title" />
          <TextField
            className={classes.eventInputs}
            label="Event description"
          />
          <Button
            onClick={this.handleEventForm}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            Add Event
          </Button>
        </form>
      </Dialog>
    );
  }
}

const AddEventDetails = withStyles(AddEventDetailsStyles)(AddEventDetailsComp);
