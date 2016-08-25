window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('moment');
require('fullcalendar');
require('fullcalendar-scheduler');

const events = require('./lib/events');
const floors = require('./lib/floors');
const onSelect = require('./lib/on-select');
const onClick = require('./lib/on-click');

$(document).ready(function() {
  const calendar = $('#calendar').fullCalendar(
    {
      header: {
        left: 'prev,next today',
        center: 'title'
      },
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      defaultView: 'timelineMonth',
      nowIndicator: true,
      selectable: true,
      selectHelper: true,
      editable: true,
      events: [],

      select: onSelect,
      eventClick: onClick,

      eventRender: function(event, element) {
        element.find('.fc-title').append(`<br/>`);
      },

      resourceColumns: [
        {
          labelText: 'Hostel #3',
          field: 'title'
        }
      ],

      resourceGroupField: 'groupId',
      resources: floors
    });

  displayStoredEvents(calendar);
});

function displayStoredEvents(calendar) {
  events.getAll().forEach(event => {
    calendar.fullCalendar('renderEvent', event, true);
  });
}
