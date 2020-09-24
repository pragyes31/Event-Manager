import React from "react";
import { v4 as uuidv4 } from 'uuid';

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
      eventsList: []
    };
  }
  handleEventForm = () => {
    this.setState({ isEventFormOpen: !this.state.isEventFormOpen });

  };
  addEventToUI = (newEvent) => {
    this.setState({ eventsList: [ ...this.state.eventsList, newEvent ], isEventFormOpen: !this.state.isEventFormOpen });

  };
  render() {
    console.log(this.state);
    return (
      <div className="app">
        <div className="event-app">
          <AddEventButton handleEventForm={this.handleEventForm} />
          <EventsList eventsList={this.state.eventsList}/>
          {this.state.isEventFormOpen && (
            <EventDetailsForm
              isEventFormOpen={this.state.isEventFormOpen}
              handleEventForm={this.handleEventForm}
              addEventToUI={this.addEventToUI}
            />
          )}
        </div>
      </div>
    );
  }
}

const AddEventButtonStyles = {
  btn: {
    minWidth: "300px",
    margin: "20px 0px"
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
    let startDate = Date.now();
    console.log(startDate)
    this.state = {
      currentEvent: {
        eventName: "",
        startDate: startDate,
        endDate: "",
        eventId:""
      }
    };
  }
  handleSubmitForm = (e) => {
    console.log(uuidv4())
    e.preventDefault();
    this.setState( {currentEvent: { ...this.state.currentEvent, eventId: uuidv4() }})
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
            label="Event start date &amp; time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
            onChange={this.handleEventStartDate}
            required
          />
          <TextField
            label="Event end date &amp; time"
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
    backgroundColor: "#eee"
  }
};

function EventsListComp(props) {
  const { classes } = props;
   let listToSort = [...props.eventsList]
   listToSort.sort((a,b) => a.startDate - b.startDate);
  return (
    <div className={classes.eventsList}>
{listToSort.map((event) => {
return <Event eventName={event.eventName} 
startDate={event.startDate} endDate={event.endDate} eventId={event.eventId} />
})}
    </div>
  );
}

const EventsList = withStyles(EventsListStyles)(EventsListComp);

const eventStyles = {}

function EventComp(props) {
  const {classes} = props;
  return (
    <div className={classes.event}>
        <div className={classes.name}>Event: {props.eventName}</div>
        <div className={classes.startDateTime}>Start Date & Time: {props.startDate}</div>
        <div className={classes.endDateTime}>End Date & Time: {props.endDate}</div>
        <div>{props.eventId}</div>
      </div>
  )
}

const Event = withStyles(eventStyles)(EventComp);
