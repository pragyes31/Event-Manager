import React from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

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
  },

  eventForm: {
    margin: "15px",
    display: "flex",
    flexDirection: "column"
  },

  label: {
    marginLeft: "5px",
    display: "inline-block",
    marginBottom: "5px"
  },

  eventInputs: {
    width: "80%",
    outline: "none",
    border: "none",
    borderRadius: "20px",
    height: "25px",
    textIndent: "5px"
  },

  description: {
    width: "100%",
    outline: "none",
    border: "none",
    borderRadius: "20px",
    textIndent: "10px",
    paddingTop: "5px"
  },

  btn: {
    width: "80%",
    height: "25px",
    outline: "none",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold"
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
        <div className={classes.addEvent}>
          <form>
            <div className={classes.eventForm}>
              <label htmlFor="title-input">Name of the event:* </label>
              <br />
              <input
                className={classes.eventInputs}
                type="text"
                placeholder="Add event title"
                required
              />
            </div>
            <div className={classes.eventForm}>
              <label htmlFor="description-input">Description: </label>
              <br />
              <textarea className={classes.eventInputs} rows="4"></textarea>
            </div>
            <div className={classes.eventForm}>
              <label htmlFor="start-date-input">Start date:* </label>
              <br />
              <input className={classes.eventInputs} type="date" required />
            </div>
            <div className={classes.eventForm}>
              <label htmlFor="end-date-input">End date:* </label>
              <br />
              <input className={classes.eventInputs} type="date" required />
            </div>
            <div id="error-message"></div>
            <div className={classes.eventForm}>
              <Button
                onClick={this.handleEventForm}
                className={classes.btn}
                variant="contained"
                color="primary"
              >
                Add Event
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

const AddEventDetails = withStyles(AddEventDetailsStyles)(AddEventDetailsComp);
