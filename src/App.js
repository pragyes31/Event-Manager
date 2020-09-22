import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventFormOpen: false,
      eventsObj: {}
    };
  }
  handleEventForm = () => {
    this.setState({ isEventFormOpen: !this.state.isEventFormOpen });
  };
  addEventToUI = (eventToAdd) => {
    this.setState({ eventsObj: { ...this.state.eventsObj, eventToAdd } });
  };
  render() {
    return (
      <div className="app">
        <AddEventButton handleEventForm={this.handleEventForm} />
        <EventsList />
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

const AddEventButtonStyles = {
  btn: {
    width: "60%",
    maxWidth: "400px",
    marginTop: "20px"
  },
  btnParent: {
    display: "flex",
    justifyContent: "center"
  }
};

function AddEventButtonComp(props) {
  const { classes } = props;
  return (
    <div className={classes.btnParent}>
      <Button
        onClick={props.handleEventForm}
        className={classes.btn}
        variant="contained"
        color="primary"
      >
        Add Event
      </Button>
    </div>
  );
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
      currentEvent: {
        eventName: "",
        startDate: "",
        endDate: ""
      }
    };
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.handleEventForm();
    this.props.addEventToUI(this.state.currentEvent);
  };
  handleEventName = (e) => {
    this.setState({
      currentEvent: { ...this.state.currentEvent, eventName: e.target.value }
    });
  };
  handleEventStartDate = (e) => {
    this.setState({
      currentEvent: { ...this.state.currentEvent, startDate: e.target.value }
    });
  };
  handleEventEndDate = (e) => {
    this.setState({
      currentEvent: { ...this.state.currentEvent, endDate: e.target.value }
    });
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
            onChange={this.handleEventName}
          />
          <TextField
            label="Event start date & time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
            onChange={this.handleEventStartDate}
            required
          />
          <TextField
            label="Event end date & time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
            onChange={this.handleEventEndDate}
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

const EventsListStyles = {
  eventsList: {
    width: "90%",
    backgroundColor: "#eee",
    display: "flex"
  }
};

function EventsListComp(props) {
  const { classes } = props;
  return (
    <div className={classes.eventsList}>
      <div className={classes.event}>
        <div className={classes.name}>Birthday</div>
        <div className={classes.startDateTime}> June 15, 2009 1:30 PM</div>
        <div className={classes.endDateTime}>June 15, 2009 2:00 PM</div>
      </div>
    </div>
  );
}

const EventsList = withStyles(EventsListStyles)(EventsListComp);
