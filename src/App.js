import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app">
        <AddEventButton />
        <EventsList />
      </div>
    );
  }
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
      isEventFormOpen: false
    };
  }
  handleEventForm = () => {
    this.setState({ isEventFormOpen: !this.state.isEventFormOpen });
  };
  addEventToUI = (eve) => {
    console.log(eve);
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
          <EventDetailsForm
            isEventFormOpen={this.state.isEventFormOpen}
            handleEventForm={this.handleEventForm}
            addEventToUI={this.addEventToUI}
          />
        )}
      </div>
    );
  }
}

const AddEventButton = withStyles(AddEventButtonStyles)(AddEventButtonComp);

const EventDetailsFormStyles = {
  addEvent: {
    width: "400px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px"
  },
  eventInputs: {
    width: "80%",
    marginBottom: "10px"
  },
  btn: {
    width: "60%",
    margin: "20px 0px"
  }
};

class EventDetailsFormComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDescription: "",
      startDate: "",
      endDate: ""
    };
  }
  handleDateChange = () => {
    console.log("change date");
  };
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.handleEventForm();
    this.props.addEventToUI("some event data");
  };
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ eventName: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.isEventFormOpen}
        aria-labelledby="Add New event"
        aria-describedby="Dialog window to add details about the new page"
        onBackdropClick={this.props.handleEventForm}
        onEscapeKeyDown={this.props.handleEventForm}
        classes={{ paper: classes.addEventDialog }}
      >
        <form className={classes.addEvent} onSubmit={this.handleSubmitForm}>
          <TextField
            value={this.state.eventName}
            className={classes.eventInputs}
            label="Name your event"
            required
            onChange={() => this.handleChange}
          />
          <TextField
            className={classes.eventInputs}
            label="Describe your event"
            multiline
            rows={2}
          />
          <TextField
            label="Event start date & time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
            required
          />
          <TextField
            label="Event end date & time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
            required
          />
          <Button
            type="submit"
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

const EventDetailsForm = withStyles(EventDetailsFormStyles)(
  EventDetailsFormComp
);

function EventsList() {
  return <div>event</div>;
}
