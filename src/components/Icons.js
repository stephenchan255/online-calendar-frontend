import React from 'react'
import { Icon } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip';

export default function Icons() {
  return (
    <div className="icons">
      {/* colored status */}
      <div className="status-box">
        <div className="status">
          <Icon color='blue' name='circle' />
          <span>Future time</span>
        </div>
        <div className="status">
          <Icon color='green' name='circle' />
          <span>Time checked and summary submitted</span>
        </div>
        <div className="status">
          <Icon color='yellow' name='circle' />
          <span> Time checked but no summary submitted</span>
        </div>
        <div className="status">
          <Icon color='red' name='circle' />
          <span className="mr-auto"> Working-time unchecked</span>
        </div>
      </div>
      <div className="user-guide-box">
        {/* user guide */}
        <Icon color='black' name='question circle outline' />
        <span data-tip data-for="intro">User Guide</span>
        <ReactTooltip id='intro' place="bottom" type="info" effect="solid" className="user-guide">
          <p>This system is used for employees to schedule future work hours and submit daily work summary.</p>
          <div>
            <ul>
              <li>Scheduling working hours is only available within 2 weeks (including today). Click on the date to select the start and end time.</li>
              <li>Then, there will be a new event displayed on the calendar. Click it to view / modify / delete it.</li>
              <li>Events are visible to all users, and are only editable to its creator.</li>
              <li>The working-time checking is only available for "today" after the end time.</li>
              <li>Work summary is not shown in the monthly view. It can by viewed by clicking the event or switch to the list view.</li>
              <li>Event colors are for different event status, which is shown in the top of the page.</li>
            </ul>
          </div>
        </ReactTooltip>
      </div>
    </div>
  )
}