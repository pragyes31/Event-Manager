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
          {this.state.eventsList.length > 0 && (
            <EventsList eventsList={this.state.eventsList} />
          )}
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
    minWidth: "350px",
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
    width: "420px",
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
  },
  errorMessage: {
    color: "red",
    margin: "0px 20px",
    fontSize: "14px"
  }
};

class EventDetailsFormComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validEndDate: true,
      currentEvent: {
        eventName: "",
        startDate: "2020-05-23T10:00",
        endDate: "2020-05-23T10:30",
        eventId: ""
      }
    };
  }
  handleSubmitForm = (e) => {
    this.props.addEventToUI(this.state.currentEvent);
    e.preventDefault();
  };
  handleEventName = (e) => {
    let eventId = new Date().getTime();
    this.setState({
      currentEvent: {
        ...this.state.currentEvent,
        eventName: e.target.value,
        eventId
      }
    });
  };
  handleEventStartDate = (e) => {
    let endDate = Date.parse(new Date(this.state.currentEvent.endDate));
    this.setState({
      currentEvent: {
        ...this.state.currentEvent,
        startDate: e.target.value
      },
      validEndDate:
        endDate < Date.parse(new Date(e.target.value)) ? false : true
    });
  };
  handleEventEndDate = (e) => {
    let startDate = Date.parse(new Date(this.state.currentEvent.startDate));
    this.setState({
      currentEvent: {
        ...this.state.currentEvent,
        endDate: e.target.value
      },
      validEndDate:
        Date.parse(new Date(e.target.value)) < startDate ? false : true
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
          {!this.state.validEndDate && (
            <div className={classes.errorMessage}>
              The end date and time should be greater than the start date.
            </div>
          )}
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
  const { classes, eventsList } = props;
  let listToSort = [...eventsList];
  listToSort.sort((a, b) => {
    let start1 = new Date(a.startDate);
    let start2 = new Date(b.startDate);
    return start1 - start2;
  });
  return (
    <div className={classes.eventsList}>
      {listToSort.map((event, index) => {
        let currentEventStart = Date.parse(new Date(event.startDate));
        let currentEventEnd = Date.parse(new Date(event.endDate));
        let prevEventEnd =
          index !== 0
            ? Date.parse(new Date(listToSort[index - 1].startDate))
            : undefined;
        let nextEventStart =
          index !== listToSort.length - 1
            ? Date.parse(new Date(listToSort[index + 1].startDate))
            : undefined;
        let prevEventConflict = currentEventStart < prevEventEnd;
        let nextEventConflict = nextEventStart < currentEventEnd;
        console.log(`prevEventEnd: ${prevEventEnd}`);
        console.log(`nextEventStart: ${nextEventStart}`);
        if (listToSort.length === 1) {
          // When there is only one event
          return (
            <div key={event.eventId}>
              <Event event={event} isConflict={false} />
            </div>
          );
        } else if (listToSort.length > 1 && index === 0) {
          // case scenarion when there are more than 1 event but we are at index 0
          return (
            <div key={event.eventId}>
              <Event event={event} isConflict={nextEventConflict} />
            </div>
          );
        } else if (listToSort.length > 1 && index === listToSort.length - 1) {
          // case scenarion when there are more than 1 event but we are at last index
          return (
            <div key={event.eventId}>
              <Event event={event} isConflict={prevEventConflict} />
            </div>
          );
        } else {
          return prevEventConflict || nextEventConflict ? (
            <div key={event.eventId}>
              <Event event={event} isConflict={true} />
            </div>
          ) : (
            <div key={event.eventId}>
              <Event event={event} isConflict={false} />
            </div>
          );
        }
      })}
      {/* {listToSort.map((event, index) => {
          let firstEventStart = Date.parse(new Date(event.startDate));
          let firstEventEnd = Date.parse(new Date(event.endDate));
          let secondEventStart =
            index !== listToSort.length - 1
              ? Date.parse(new Date(listToSort[index + 1].StartDate))
              : 1;
          let secondEventEnd =
            index !== listToSort.length - 1
              ? Date.parse(new Date(listToSort[index + 1].endDate))
              : 1;
          let startDateConflict =
            secondEventStart >= firstEventStart &&
            secondEventStart <= firstEventEnd;
          let endDateConflict =
            secondEventEnd >= firstEventStart &&
            secondEventEnd <= firstEventEnd;
          let isConflict = startDateConflict || endDateConflict;
          if (
            index < listToSort.length - 1 &&
            (isConflict || nextEventConflict)
          ) {
            nextEventConflict = isConflict;
            console.log(nextEventConflict + isConflict);
            return <Event event={event} isConflict={true} />;
          } else {
            return <Event event={event} isConflict={nextEventConflict} />;
          }
        })} */}
    </div>
  );
}

const EventsList = withStyles(EventsListStyles)(EventsListComp);

const eventStyles = {
  event: {
    backgroundColor: "#eee"
  },
  conflict: {
    border: "1px solid red"
  }
};

function EventComp(props) {
  const { classes, event, isConflict } = props;
  return (
    <div className={`${classes.event} ${isConflict && classes.conflict}`}>
      <div className={classes.name}>Event: {event.eventName}</div>
      <div className={classes.startDateTime}>
        Start Date & Time: {event.startDate.replace("T", " ")}
      </div>
      <div className={classes.endDateTime}>
        End Date & Time: {event.endDate.replace("T", " ")}
      </div>
      <div>{event.eventId}</div>
    </div>
  );
}

const Event = withStyles(eventStyles)(EventComp);
