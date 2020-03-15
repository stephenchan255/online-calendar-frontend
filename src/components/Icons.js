import React from 'react'
import { Icon } from 'semantic-ui-react'
import ReactTooltip from 'react-tooltip';

export default function Icons(props) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="note">
      {/* colors */}
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
        <span data-tip data-for="introduction" style={{ textDecorationLine: 'underline' }}>User Guide</span>
        <ReactTooltip id='introduction' aria-haspopup='true' place="bottom" type="info" effect="solid"
          className="tool-tip-box" disable={isMobile}>
          <p>This system is used for employees to schedule future work hours and submit daily work summary.</p>
          <div>
            <ul>
              <li>Scheduling working hours is only available within the two weeks (including today). Click on the date to select the start and end time of the work hours under that date.</li>
              <li>Then, there will be a new event displayed on the calendar. You can view / modify / delete the corresponding event by clicking it within the date. The modification includes: adjusting the start and end time, checking the working-time and submitting the work summary.</li>
              <li>All users can view the events, but only the owner (creator) can modify and delete them.</li>
              <li>The working-time checking is only available for "today" after the work end time.</li>
              <li>The monthly view only shows the start and end time of the work hours and the corresponding user name. To view the work summary, click the specific event or switch to the list view.</li>
              <li>Different event status corresponds to different colors, which is shown in the home page.</li>
            </ul>
          </div>
        </ReactTooltip>
      </div>
    </div>
  )
}