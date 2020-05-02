import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

export default function PopupWindow(props) {
  let isUpdate = props.isUpdate;
  return (
    <Modal show={props.showModal} onHide={props.onCloseModal}>
      <Modal.Header closeButton={props.onCloseModal}>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Time pickers */}
        <div>
          <TimePickerRow
            label="Start Time: "
            start="09:00" initialValue="09:30"
            onTimeChange={time => props.onTimeChange(time, "startTime")}
            time={props.startTime}
          />
          <TimePickerRow
            label="End Time: "
            start={toTimeFormat(props.startTime + 1800)} initialValue="18:00"
            onTimeChange={time => props.onTimeChange(time, "endTime")}
            time={props.endTime}
          />
        </div>

        {/* Time Check box */}
        {isUpdate &&
          <div className="checkbox-row">
            <Form.Check type="checkbox"
              label="Check today's working time (only available after end time past)"
              disabled={props.timeCheckboxDisabled}
              checked={props.timeCheckbox}
              onChange={props.onInputChange}
              name="timeCheckbox"
            />
          </div>
        }

        {/* Daily summary */}
        {isUpdate &&
          <div>
            <label htmlFor="daily-summary">Daily Working Summary: </label>
            <Form.Control as="textarea" id="daily-summary" rows="5"
              placeholder="Enter your daily working summary here"
              disabled={props.dailySummaryInputDisabled}
              value={props.dailySummary}
              onChange={props.onInputChange}
              name="dailySummary"
            />
          </div>
        }
      </Modal.Body>

      {/* btns */}
      <Modal.Footer>
        {isUpdate &&
          <Button variant="danger" className={props.btnVisability + " mr-auto"}
            onClick={props.onDelete}>Delete</Button>
        }
        <Button variant="primary" className={props.btnVisability} onClick={props.onSave}>Save</Button>
        <Button variant="secondary" onClick={props.onCloseModal}>{props.btnText}</Button>
      </Modal.Footer>
    </Modal>
  );

  /**
    * convert number to "hh:mm" format, used to control
    * endTime.Timepicker >= startTime.value (Note: 1 hour = 3600)
    */
  function toTimeFormat(num) {
    const hours = Math.floor(num / 3600);
    const minutes = (num % 3600) / 60;
    return hours + ":" + minutes;
  }
}

// export default class PopupWindow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleTimeChange = this.handleTimeChange.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   render() {
//     return (
//       <Modal show={this.props.showModal} onHide={this.props.onCloseModal}>
//         <Modal.Header closeButton={this.props.onCloseModal}>
//           <Modal.Title>{this.props.modalTitle}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {/* Time pickers */}
//           <div>
//             <TimePickerRow
//               label="Start Time: "
//               start="09:00" initialValue="09:30"
//               onTimeChange={time => this.handleTimeChange(time, "startTime")}
//               time={this.props.startTime}
//             />
//             <TimePickerRow
//               label="End Time: "
//               start={this.toTimeFormat(this.props.startTime + 1800)} initialValue="18:00"
//               onTimeChange={time => this.handleTimeChange(time, "endTime")}
//               time={this.props.endTime}
//             />
//           </div>

//           {/* Time Check box */}
//           {this.props.timeCheckboxNeeded &&
//             <div className="checkbox-row">
//               <Form.Check type="checkbox"
//                 label="Check today's working time (only available after end time past)"
//                 disabled={this.props.timeCheckboxDisabled}
//                 checked={this.props.timeCheckbox}
//                 onChange={this.handleInputChange}
//                 name="timeCheckbox"
//               />
//             </div>
//           }

//           {/* Daily summary */}
//           {this.props.dailySummaryNeeded &&
//             <div>
//               <label htmlFor="daily-summary">Daily Working Summary: </label>
//               <Form.Control as="textarea" id="daily-summary" rows="5"
//                 placeholder="Enter your daily working summary here"
//                 disabled={this.props.dailySummaryInputDisabled}
//                 value={this.props.dailySummary}
//                 onChange={this.handleInputChange}
//                 name="dailySummary"
//               />
//             </div>
//           }
//         </Modal.Body>
//         <Modal.Footer>
//           {this.props.deleteBtnNeeded &&
//             <Button variant="danger" className={this.props.btnVisability + " mr-auto"}
//               onClick={() => this.props.onDelete()}>Delete</Button>
//           }
//           <Button variant="primary" className={this.props.btnVisability}
//             onClick={() => this.props.onSave()}
//           >
//             Save</Button>
//           <Button variant="secondary" onClick={this.props.onCloseModal}>{this.props.btnText}</Button>
//         </Modal.Footer>
//       </Modal>
//     )
//   }

//   /**
//    * convert number to "hh:mm" format, used to control
//    * endTime.Timepicker >= startTime.value (Note: 1 hour = 3600)
//    */
//   toTimeFormat(num) {
//     const hours = Math.floor(num / 3600);
//     const minutes = (num % 3600) / 60;
//     return hours + ":" + minutes;
//   }

//   handleTimeChange(time, type) {
//     this.props.onTimeChange(time, type);
//   }

//   handleInputChange(e) {
//     this.props.onInputChange(e);
//   }
// }

function TimePickerRow(props) {
  return (
    <div className="time-picker-box">
      <label htmlFor="time-picker">{props.label}</label>
      <TimePicker id="time-picker"
        start={props.start} end="19:00"
        initialValue={props.initialValue} onChange={props.onTimeChange} value={props.time}
      />
    </div>
  );
}