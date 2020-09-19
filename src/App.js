import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <AddEventButton />
      <EventsList />
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
      isEventFormOpen: false
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

class AddEventDetailsComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleDateChange = () => {
    console.log("change date");
  };
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("submit form");
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
        <form className={classes.addEvent}>
          <TextField className={classes.eventInputs} label="Name your event" />
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
          />
          <TextField
            label="Event end date & time"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.eventInputs}
          />
          <Button
            onClick={this.handleSubmitForm}
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

function EventsList() {
  return <div>event</div>;
}
