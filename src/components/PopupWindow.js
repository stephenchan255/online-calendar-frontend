import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

function TimePickerRow(props) {
  return (
    <div className="time-picker-box">
      <label htmlFor="time-picker">{props.label}</label>
      <TimePicker id="time-picker" className="col-sm-4"
        start={props.start} end="19:00"
        initialValue={props.initialValue} onChange={props.onTimeChange} value={props.time}
      />
    </div>
  );
}

export default class PopupWindow extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
        <Modal.Header closeButton={this.props.onCloseModal} className="modal-title">
          <Modal.Title>{this.props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Time picker */}
          <div className="time-pickers">
            <TimePickerRow
              label="Start Time: "
              start="09:00" initialValue="09:30"
              onTimeChange={(time) => this.handleTimeChange(time, "startTime")}
              time={this.props.startTime}
            />
            <TimePickerRow
              label="End Time: "
              start={this.toTimeFormat(this.props.startTime + 1800)} initialValue="18:00"
              onTimeChange={(time) => this.handleTimeChange(time, "endTime")}
              time={this.props.endTime}
            />
          </div>

          {/* Time Check box */}
          {this.props.timeCheckboxNeeded &&
            <div className="text-left mb-4">
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
        <Modal.Footer className="modal-footer">
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