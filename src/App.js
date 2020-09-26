import React from "react";
import { v4 as uuidv4 } from "uuid";

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
    this.setState({
      eventsList: [...this.state.eventsList, newEvent],
      isEventFormOpen: !this.state.isEventFormOpen
    });
  };
  render() {
    //console.log(this.state.eventsList);
    return (
      <div className="app">
        <div className="event-app">
          <AddEventButton handleEventForm={this.handleEventForm} />
          <EventsList eventsList={this.state.eventsList} />
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
    this.state = {
      currentEvent: {
        eventName: "",
        startDate: "2020-05-23T10:00",
        endDate: "2020-05-23T10:30",
        eventId: ""
      }
    };
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.setState({
      currentEvent: { ...this.state.currentEvent, eventId: uuidv4() }
    });
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
            value={this.state.currentEvent.eventName}
            className={classes.eventInputs}
            label="Name your event"
            required
            onChange={this.handleEventName}
          />
          <TextField
            label="Event start date &amp; time"
            type="datetime-local"
            value={this.state.currentEvent.startDate}
            className={classes.eventInputs}
            onChange={this.handleEventStartDate}
            required
          />
          <TextField
            label="Event end date &amp; time"
            type="datetime-local"
            value={this.state.currentEvent.endDate}
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
  let listToSort = [...props.eventsList];
  listToSort.sort((a, b) => {
    let start1 = new Date(a.startDate);
    let start2 = new Date(b.startDate);
    return start1 - start2;
  });
  return (
    <div className={classes.eventsList}>
      {listToSort.map((event, index) => {
        let firstEventStart = Date.parse(new Date(event.startDate));
        let firstEventEnd = Date.parse(new Date(event.endDate));
        //console.log(index)
        let secondEventStart = Date.parse(
          new Date(listToSort[index + 1].endDate)
        );
        if (
          index < listToSort.length - 1 &&
          secondEventStart > firstEventStart &&
          secondEventStart < firstEventEnd
        ) {
          return (
            <Event
              eventName={event.eventName}
              startDate={event.startDate}
              endDate={event.endDate}
              eventId={event.eventId}
              isConflict={true}
            />
          );
        } else {
          return (
            <Event
              eventName={event.eventName}
              startDate={event.startDate}
              endDate={event.endDate}
              eventId={event.eventId}
              isConflict={false}
            />
          );
        }
      })}
    </div>
  );
}

const EventsList = withStyles(EventsListStyles)(EventsListComp);

const eventStyles = {
  event: {
    backgroundColor: "red"
  },
  conflict: {
    border: "1px solid red"
  }
};

function EventComp(props) {
  const { classes } = props;
  return (
    <div className={`${classes.event} ${props.isConflict && classes.test}`}>
      <div className={classes.name}>Event: {props.eventName}</div>
      <div className={classes.startDateTime}>
        Start Date & Time: {props.startDate.replace("T", " ")}
      </div>
      <div className={classes.endDateTime}>
        End Date & Time: {props.endDate.replace("T", " ")}
      </div>
      <div>{props.eventId}</div>
    </div>
  );
}

const Event = withStyles(eventStyles)(EventComp);
