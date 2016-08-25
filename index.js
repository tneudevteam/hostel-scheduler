window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('moment');
require('fullcalendar');
require('fullcalendar-scheduler');

var bootbox = require('bootbox');

var addResidentTemplate = require('./templates/add-resident.handlebars');
var editResidentTemplate = require('./templates/edit-resident.handlebars');

var events = require('./lib/events');
var floors = require('./lib/floors');

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

      select: function(start, end, jsEvent, view, resource) {
        bootbox.dialog({
          title: 'Форма поселення',
          message: addResidentTemplate({
            birthDate: start.format('YYYY-MM-DD'),
            livingStartDate: start.format('YYYY-MM-DD'),
            livingStartTime: start.format('HH:mm'),
            livingEndDate: end.format('YYYY-MM-DD'),
            livingEndTime: end.format('HH:mm')
          }),
          buttons: {
            success: {
              label: 'Зберегти',
              className: 'btn-success',
              callback: function() {
                var $surname = $('input[name=surname]');
                var $name = $('input[name=name]');
                var $middlename = $('input[name=middlename]');

                var title = $surname.val() + ' ' + $name.val() + ' ' + $middlename.val();
                if (title) {
                  var newEvent = {
                    surname: $surname.val(),
                    name: $name.val(),
                    title: title,
                    resourceId: resource.id,
                    start: start,
                    end: end,
                    backgroundColor: 'yellow',
                    textColor: 'black'
                  };
                  calendar.fullCalendar('renderEvent',
                    newEvent,
                    true // make the event 'stick'
                  );

                  events.save(newEvent);
                }
                calendar.fullCalendar('unselect');
              }
            }
          }
        });
      },

      editable: true,

      eventClick: function(event, element) {
        var x = $('tr[data-resource-id=C]');
        x.focus();

        bootbox.dialog({
          title: 'Форма поселення',
          message: editResidentTemplate({
            name: event.name,
            surname: event.surname,
            birthDate: event.start.format('YYYY-MM-DD'),
            livingStartDate: event.start.format('YYYY-MM-DD'),
            livingStartTime: event.start.format('HH:mm'),
            livingEndDate: event.end.format('YYYY-MM-DD'),
            livingEndTime: event.end.format('HH:mm')
          }),
          buttons: {
            success: {
              label: 'Зберегти',
              className: 'btn-success',
              callback: function() {
                event.surname = $('input[name=surname]').val();
                event.name = $('input[name=name]').val();
                event.title = event.surname + ' ' + event.name;
                event.backgroundColor = 'green';
                $('#calendar').fullCalendar('updateEvent', event);

                var eventToUpdate = {
                  surname: event.surname,
                  name: event.name,
                  title: event.title,
                  backgroundColor: event.backgroundColor
                };

                events.update(event.id, eventToUpdate);
              }
            }
          }
        });
      },

      events: [],

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
