import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

export default class PopupWindow extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    const timePicker = (label, start, initialValue, handleTimeChange, time) => {
      return (
        <div className="form-group row align-items-center">
          <label htmlFor="time-picker" className="col-form-label col-sm-4 text-right">
            {label}
          </label>
          <TimePicker id="time-picker" className="col-sm-4"
            start={start} end="19:00"
            initialValue={initialValue} onChange={handleTimeChange} value={time}
          />
        </div>
      )
    }

    return (
      <Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Header closeButton={this.props.onCloseModal}>
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Time selector */}
          {timePicker("Start Time: ", "09:00", "09:30",
            (time) => this.handleTimeChange(time, "startTime"), this.props.startTime)}
          {timePicker("End Time: ", this.toTimeFormat(this.props.startTime + 1800), "18:00",
            (time) => this.handleTimeChange(time, "endTime"), this.props.endTime)}
          {/* Time Check box */}
          {this.props.timeCheckboxNeeded &&
            <div className="text-center mb-4">
              <Form.Check type="checkbox"
                label="Check today's working time (only available after end time past)"
                disabled={this.props.timeCheckboxDisabled}
                checked={this.props.timeCheckbox}
                onChange={this.handleInputChange}
                name="timeCheckbox"
              />
            </div>
          }
          {/* Daily summary */}
          {this.props.dailySummaryNeeded &&
            <div className="form-group row align-items-center">
              <label htmlFor="daily-summary" className="col-form-label mx-4">Daily Working Summary: </label>
              <Form.Control as="textarea" id="daily-summary" rows="5" className="mx-4"
                placeholder="Enter your daily working summary here"
                disabled={this.props.dailySummaryInputDisabled}
                value={this.props.dailySummary}
                onChange={this.handleInputChange}
                name="dailySummary"
              />
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {this.props.deleteBtnNeeded &&
            <Button variant="danger" className={this.props.btnVisability + " mr-auto"}
              onClick={() => this.props.onDelete()}>Delete</Button>
          }
          <Button variant="primary" className={this.props.btnVisability}
            onClick={() => this.props.onSave()}
          >
            Save</Button>
          <Button variant="secondary" onClick={this.props.onCloseModal}>{this.props.btnText}</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  /**
   * convert number to "hh:mm" format, used to control 
   * endTime.Timepicker >= startTime.value (Note: 1 hour = 3600)
   */
  toTimeFormat(num) {
    const hours = Math.floor(num / 3600);
    const minutes = (num % 3600) / 60;
    return hours + ":" + minutes;
  }

  handleTimeChange(time, type) {
    this.props.onTimeChange(time, type);
  }

  handleInputChange(e) {
    this.props.onInputChange(e);
  }
}