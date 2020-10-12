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
      isEditEventFormOpen: false,
      eventsList: [],
      eventToEdit: {}
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
  editEventToUI = (newEvent, prevEventId) => {
    this.setState({
      eventsList: [...this.state.eventsList, newEvent],
      isEventFormOpen: !this.state.isEventFormOpen
    });
  };
  editEvent = (eventId) => {
    let eventToEdit = this.state.eventsList.filter(
      (event) => event.eventId === eventId
    );
    console.log(eventToEdit);
    this.setState({
      eventToEdit: eventToEdit[0],
      isEditEventFormOpen: !this.state.isEditEventFormOpen
    });
  };
  handleEditEventForm = () => {
    this.setState({ isEditEventFormOpen: !this.state.isEditEventFormOpen });
  };
  deleteEvent = (eventId) => {
    let newList = this.state.eventsList.filter(
      (event) => event.eventId !== eventId
    );
    this.setState({ eventsList: [...newList] });
  };
  render() {
    return (
      <div className="app">
        <div className="event-app">
          <AddEventButton handleEventForm={this.handleEventForm} />
          {this.state.eventsList.length > 0 && (
            <EventsList
              eventsList={this.state.eventsList}
              editEvent={this.editEvent}
              deleteEvent={this.deleteEvent}
            />
          )}
          {this.state.isEventFormOpen && (
            <EventDetailsForm
              isEventFormOpen={this.state.isEventFormOpen}
              handleEventForm={this.handleEventForm}
              addEventToUI={this.addEventToUI}
            />
          )}
          {this.state.isEditEventFormOpen && (
            <EditEvent
              eventToEdit={this.state.eventToEdit}
              handleEditEventForm={this.handleEditEventForm}
              isEditEventFormOpen={this.state.isEditEventFormOpen}
              editEventToUI={this.editEventToUI}
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
    margin: "20px 0px",
    backgroundColor: "#00adb5",
    "&:hover": {
      backgroundColor: "#00c3cc"
    }
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
    margin: "20px 0px",
    backgroundColor: "#00adb5",
    "&:hover": {
      backgroundColor: "#00c3cc"
    }
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
            autoFocus
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
            min={new Date(this.state.currentEvent.startDate)}
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

const editEventStyles = {
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
    margin: "20px 0px",
    backgroundColor: "#00adb5",
    "&:hover": {
      backgroundColor: "#00c3cc"
    }
  },
  errorMessage: {
    color: "red",
    margin: "0px 20px",
    fontSize: "14px"
  }
};

class EditEventComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validEndDate: true,
      prevEventId: props.eventToEdit.eventId,
      currentEvent: {
        eventName: props.eventToEdit.eventName,
        startDate: props.eventToEdit.startDate,
        endDate: props.eventToEdit.endDate,
        eventId: props.eventToEdit.eventId
      }
    };
  }
  handleEditEventForm = (e) => {
    this.props.editEventToUI(this.state.currentEvent, this.state.prevEventId);
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
        open={this.props.isEditEventFormOpen}
        aria-labelledby="Add New event"
        aria-describedby="Dialog window to add details about the new page"
        onBackdropClick={this.props.handleEditEventForm}
        onEscapeKeyDown={this.props.handleEditEventForm}
        classes={{ paper: classes.addEventDialog }}
      >
        <form className={classes.addEvent} onSubmit={this.handleEditEventForm}>
          <TextField
            value={this.state.currentEvent.eventName}
            className={classes.eventInputs}
            label="Name your event"
            required
            onChange={this.handleEventName}
            autoFocus
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
            min={new Date(this.state.currentEvent.startDate)}
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

const EditEvent = withStyles(editEventStyles)(EditEventComp);

const EventsListStyles = {
  eventsList: {
    width: "90%"
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
            ? Date.parse(new Date(listToSort[index - 1].endDate))
            : null;
        let nextEventStart =
          index !== listToSort.length - 1
            ? Date.parse(new Date(listToSort[index + 1].startDate))
            : null;
        let prevEventConflict = currentEventStart < prevEventEnd;
        let nextEventConflict = nextEventStart < currentEventEnd;
        if (listToSort.length === 1) {
          // When there is only one event
          return (
            <Event
              event={event}
              isConflict={false}
              key={event.eventId}
              editEvent={props.editEvent}
              deleteEvent={props.deleteEvent}
            />
          );
        } else if (listToSort.length > 1 && index === 0) {
          // case scenarion when there are more than 1 event but we are at index 0
          return (
            <Event
              event={event}
              isConflict={nextEventConflict}
              key={event.eventId}
              editEvent={props.editEvent}
              deleteEvent={props.deleteEvent}
            />
          );
        } else if (listToSort.length > 1 && index === listToSort.length - 1) {
          // case scenarion when there are more than 1 event and we are at last index
          return (
            <Event
              event={event}
              isConflict={prevEventConflict}
              key={event.eventId}
              editEvent={props.editEvent}
              deleteEvent={props.deleteEvent}
            />
          );
        } else {
          return prevEventConflict || nextEventConflict ? (
            <Event
              event={event}
              isConflict={true}
              key={event.eventId}
              editEvent={props.editEvent}
              deleteEvent={props.deleteEvent}
            />
          ) : (
            <Event
              event={event}
              isConflict={false}
              key={event.eventId}
              editEvent={props.editEvent}
              deleteEvent={props.deleteEvent}
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
    padding: "0px 10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100px",
    borderRadius: "15px",
    backgroundColor: "#41505a",
    color: "#fff"
  },
  conflict: {
    border: "3px solid #c81818"
  },
  modify: {
    paddingRight: "20px"
  },
  edit: {
    marginBottom: "5px",
    backgroundColor: "#00adb5",
    width: "76.5px",
    "&:hover": {
      backgroundColor: "#00c3cc"
    }
  },
  button: {
    height: "30px",
    display: "flex",
    flexDirection: "column",
    fontSize: "11px"
  },
  delete: {
    backgroundColor: "#e84545",
    "&:hover": {
      backgroundColor: "#c81818"
    }
  }
};

function EventComp(props) {
  const { classes, event, isConflict } = props;
  return (
    <div
      key={event.eventId}
      className={`${classes.event} ${isConflict && classes.conflict}`}
    >
      <div className={classes.details}>
        <div className={classes.name}>Event: {event.eventName}</div>
        <div className={classes.startDateTime}>
          Start Date & Time: {event.startDate.replace("T", " ")}
        </div>
        <div className={classes.endDateTime}>
          End Date & Time: {event.endDate.replace("T", " ")}
        </div>
      </div>
      <div className={classes.modify}>
        <Button
          variant="contained"
          color="primary"
          className={`${classes.edit} ${classes.button}`}
          onClick={() => props.editEvent(event.eventId)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={`${classes.delete} ${classes.button}`}
          onClick={() => props.deleteEvent(event.eventId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

const Event = withStyles(eventStyles)(EventComp);

// 3a4750 404b69
