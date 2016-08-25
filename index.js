window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('moment');
require('fullcalendar');
require('fullcalendar-scheduler');

var bootbox = require('bootbox');

var events = require('./lib/events');
var floors = require('./lib/floors');
var onSelect = require('./lib/on-select');
var onClick = require('./lib/on-click');

$(document).ready(function() {
  var calendar = $('#calendar').fullCalendar(
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
        element.find('.fc-title').append('<br/>' + event.description);
      },

      resourceColumns: [
        {
          labelText: 'Hostel',
          field: 'title'
        }
      ],

      resourceGroupField: 'groupId',
      resources: floors
    });

  // Render previously saved events from local storage
  events.getAll().forEach(function(event) {
    calendar.fullCalendar('renderEvent', event, true);
  });
});
