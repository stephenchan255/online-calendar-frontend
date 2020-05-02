import React from 'react';
import { Redirect } from 'react-router-dom';

import Icons from './Icons';
import ReactTooltip from 'react-tooltip';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // handle click

import AddEventWindow from './PopupWindow';
import UpdateEventWindow from './PopupWindow';

import { postData } from '../services/postData';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../main.scss' // webpack must be configured to do this

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // set "startDate" & "endDate" to control selectable date range (within 2 weeks)
    // used in FullCalendar.selectConstraint prop
    const startDateTime = new Date();
    const startDateStr = this.getDateStr(startDateTime);
    const endDateTime = new Date(startDateTime.setDate(startDateTime.getDate() + 14));
    const endDateStr = this.getDateStr(endDateTime);

    this.state = {
      isLoggedout: false,
      startDate: startDateStr,
      endDate: endDateStr,

      // states of AddEventWindow
      showAddEventModal: false,
      date: '', // updated in handleDateClick(), used in addEvent()
      modalTitle: '',
      startTime: 34200, // = 09:30 (01:00 = 3600)
      endTime: 64800, // = 18:00

      // states of UpdateEventWindow
      showUpdateEventModal: false,
      timeCheckboxDisabled: true,
      timeCheckbox: false,
      dailySummary: '',
      event: '', // updated in handleEventClick(), used to add daily summary & delete event

      dailySummaryInputDisabled: true,
      btnVisability: "invisible",
      btnText: "Cancel"
    };
  }

  render() {
    // add sessionStorage check here to avoid error when entering url directly
    if (this.state.isLoggedout || !sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'} />)
    }

    const username = JSON.parse(sessionStorage.getItem("userData")).userData.username;
    return (
      <div className="content">
        <div className="greeting-box">
          <p className="greeting-text">Welcome, {username}</p>
          <input type="button" className="btn" value="Logout" onClick={this.logout} />
        </div>
        <hr />
        <Icons />
        <FullCalendar className="col-sm-10"
          header={{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'listWeek,dayGridMonth, timeGridWeek,timeGridDay'
          }}

          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          defaultView='dayGridMonth'
          fixedWeekCount={false}

          selectable={true}
          selectConstraint={{
            start: this.state.startDate,
            end: this.state.endDate
          }}
          dateClick={this.handleDateClick}

          eventRender={this.eventRender}
          events={{
            url: 'https://online-calendar-backend.herokuapp.com/?type=renderEvents',
          }}
          displayEventEnd={true}
          eventMouseEnter={this.handleEventMouseEnter}
          eventClick={this.handleEventClick}

          contentHeight={550}
        />

        <ReactTooltip id='eventTooltip' place="top" type="dark" effect="solid">
          <span>Click to view/edit event</span>
        </ReactTooltip>

        <AddEventWindow
          showModal={this.state.showAddEventModal}
          onCloseModal={this.handleCloseAddEventModel}
          modalTitle={this.state.modalTitle}

          startTime={this.state.startTime}
          endTime={this.state.endTime}
          onTimeChange={this.handleTimeChange}

          onSave={this.addEvent}
          btnText={'Cancel'}
        />

        <UpdateEventWindow
          showModal={this.state.showUpdateEventModal}
          onCloseModal={this.handleCloseUpdateEventModel}
          modalTitle={this.state.modalTitle + ": " + this.state.event.title}

          startTime={this.state.startTime}
          endTime={this.state.endTime}
          onTimeChange={this.handleTimeChange}

          timeCheckboxNeeded={true}
          timeCheckboxDisabled={this.state.timeCheckboxDisabled}
          timeCheckbox={this.state.timeCheckbox}
          onInputChange={this.handleInputChange}

          dailySummaryNeeded={true}
          dailySummaryInputDisabled={this.state.dailySummaryInputDisabled}
          dailySummary={this.state.dailySummary}

          deleteBtnNeeded={true}
          btnText={this.state.btnText}
          btnVisability={this.state.btnVisability}
          onSave={this.updateEvent}
          onDelete={this.deleteEvent}
        />
      </div>
    );
  }

  /**
   * Get the "yyyy-mm-dd" format from the given date object.
   * @param {*} dateObj The given date object.
   */
  getDateStr(dateObj) {
    const year = dateObj.getFullYear();
    // add prefix '0' if "month" or "date" < 10 (note: month begins from 0)
    const month = dateObj.getMonth() < 9 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
    const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
    return `${year}-${month}-${date}`;
  }

  logout = () => {
    sessionStorage.clear();
    this.setState({ isLoggedout: true });
  }

  handleDateClick = arg => {
    if (arg.dateStr >= this.state.startDate && arg.dateStr < this.state.endDate) {
      this.setState({
        date: arg.dateStr,
        modalTitle: arg.dateStr + ": Add working time",
        showAddEventModal: true
      });
    }
  }

  handleCloseAddEventModel = () => {
    this.setState({ showAddEventModal: false });
  }

  handleTimeChange = (time, type) => {
    this.setState({ [type]: time });
  }

  addEvent = () => {
    const data = {
      userId: JSON.parse(sessionStorage.getItem("userData")).userData.user_id,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    };

    postData('addEvent', data)
      .then(result => {
        if (result.success) {
          window.location.reload();
        } else {
          alert(result.error);
        }
      });
    this.resetPopupWindow();
  }

  // ----- methods for updating event -----

  /** 
   * Show tooltip when hovering event.
   */
  handleEventMouseEnter(arg) {
    arg.el.setAttribute("data-tip", "React-tooltip");
    arg.el.setAttribute("data-for", "eventTooltip");
    ReactTooltip.rebuild();
  }

  handleEventClick = arg => {
    const start = arg.event.start;
    const end = arg.event.end;
    const dateStr = this.getDateStr(start);

    this.setState({
      event: arg.event,
      modalTitle: dateStr,
      showUpdateEventModal: true,
      startTime: start.getHours() * 3600 + start.getMinutes() * 60,
      endTime: end.getHours() * 3600 + end.getMinutes() * 60,
      timeCheckbox: arg.event.extendedProps.isTimeChecked === "0" ? false : true,
      dailySummary: arg.event.extendedProps.dailySummary
    });

    const userId = JSON.parse(sessionStorage.getItem("userData")).userData.user_id;
    const eventId = arg.event.id;
    this.setPermissions(userId, eventId);

    if (this.state.startDate === dateStr && new Date() > end) {
      this.setState({ timeCheckboxDisabled: false });
    } else {
      this.setState({ timeCheckboxDisabled: true });
    }
  }

  setPermissions(userId, eventId) {
    const data = {
      userId: userId,
      eventId: eventId
    }
    postData('checkUserId', data)
      .then(result => {
        if (result.success) {
          this.setState({
            dailySummaryInputDisabled: false,
            btnVisability: "visible",
            btnText: "Cancel"
          })
        } else {
          this.setState({
            timeCheckboxDisabled: true,
            dailySummaryInputDisabled: true,
            btnVisability: "invisible",
            btnText: "Close"
          })
        }
      });
  }

  handleCloseUpdateEventModel = () => {
    this.setState({ showUpdateEventModal: false });
  }

  /**
   * Handle timeCheckBox & dailySummary value changes.
   * @param {*} e The event object
   */
  handleInputChange = e => {
    const name = e.target.name;
    const value = name === "timeCheckbox" ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  updateEvent = () => {
    const data = {
      eventId: this.state.event.id,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      isTimeChecked: this.state.timeCheckbox,
      dailySummary: this.state.dailySummary
    };

    postData('updateEvent', data)
      .then(result => {
        if (result.success) {
          window.location.reload();
        } else {
          alert(result.error);
        }
      });

    this.resetPopupWindow();
  }

  resetPopupWindow = () => {
    this.setState({
      showAddEventModal: false,
      showUpdateEventModal: false,
      startTime: 34200,
      endTime: 64800,
    })
  }

  /**
   * Only show summary in list view
   * @param {Object} arg A plain object that contains multiple properties.
   */
  eventRender(arg) {
    const dailySummary = arg.event.extendedProps.dailySummary;
    if (arg.view.type === 'listWeek' && dailySummary) {
      const dailySummaryEl = document.createElement('div');
      dailySummaryEl.innerHTML = "Daily Summary: " + dailySummary;
      arg.el.lastChild.append(dailySummaryEl);
    }
  }

  deleteEvent = () => {
    const response = window.confirm("Are you sure to delete this event?");
    if (response === true) {
      const data = { eventId: this.state.event.id }
      postData('deleteEvent', data)
        .then(result => {
          if (result.success) {
            window.location.reload();
          } else {
            alert(result.error);
          }
        });
    }
  }
}