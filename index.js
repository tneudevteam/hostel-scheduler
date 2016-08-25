window.$ = window.jQuery = require('jquery');

require('bootstrap');
require('moment');
require('fullcalendar');
require('fullcalendar-scheduler');

var bootbox = require('bootbox');
var _ = window._ = require('lodash');
var low = require('lowdb');
var cuid = require('cuid');

var addResidentTemplate = require('./templates/add-resident.handlebars');
var editResidentTemplate = require('./templates/edit-resident.handlebars');

$(document).ready(function() {
  var date = new Date();
  var db = low('db');
  db.defaults({events: []}).value();
  var events = db.get('events').value();

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
          title: "This is a form in a modal.",
          message: addResidentTemplate({
            birthDate: start.format("YYYY-MM-DD"),
            livingStartDate: start.format("YYYY-MM-DD"),
            livingStartTime: start.format("HH:mm"),
            livingEndDate: end.format("YYYY-MM-DD"),
            livingEndTime: end.format("HH:mm")
          }),
          buttons: {
            success: {
              label: "Save",
              className: "btn-success",
              callback: function() {
                var title = $("input[name='surname']").val() + ' ' + $("input[name='name']").val() + ' ' + $("input[name='middlename']").val();
                if (title) {
                  var newEvent = {
                    surname: $("input[name='surname']").val(),
                    name: $("input[name='name']").val(),
                    title: title,
                    resourceId: resource.id,
                    start: start,
                    end: end,
                    backgroundColor: 'yellow',
                    textColor: 'black',
                    id: cuid()
                  };
                  calendar.fullCalendar('renderEvent',
                    newEvent,
                    true // make the event "stick"
                  );
                  db.get('events').push(newEvent).value();
                }
                calendar.fullCalendar('unselect');
              }
            }
          }
        });
      },

      editable: true,

      eventClick: function(event, element) {
        var x = $('tr[data-resource-id="C"]');
        console.log(x);
        x.focus();

        bootbox.dialog({
          title: "This is a form in a modal.",
          message: editResidentTemplate({
            name: event.name,
            surname: event.surname,
            birthDate: event.start.format("YYYY-MM-DD"),
            livingStartDate: event.start.format("YYYY-MM-DD"),
            livingStartTime: event.start.format("HH:mm"),
            livingEndDate: event.end.format("YYYY-MM-DD"),
            livingEndTime: event.end.format("HH:mm")
          }),
          buttons: {
            success: {
              label: "Save",
              className: "btn-success",
              callback: function() {
                event.surname = $("input[name='surname']").val();
                event.name = $("input[name='name']").val();
                event.title = event.surname + " " + event.name;
                event.backgroundColor = 'green';
                $('#calendar').fullCalendar('updateEvent', event);

                db.get('events').find({id: event.id}).assign({
                  surname: event.surname,
                  name: event.name,
                  title: event.title,
                  backgroundColor: event.backgroundColor
                }).value();
                db.write('db');
              }
            }
          }
        });
      },

      events: [],

      eventRender: function(event, element) {
        element.find('.fc-title').append("<br/>" + event.description);
      },


      resourceColumns: [
        {
          labelText: 'Hostel',
          field: 'title'
        }
      ],

      resourceGroupField: 'groupId',
      resources: [
        {
          id: 'A',
          groupId: 'First floor',
          title: 'room 1',
          children: [
            {
              id: 'a1',
              title: 'bed 1'
            },
            {
              id: 'a2',
              title: 'bed 2'
            }
          ]
        },
        {
          id: 'B',
          groupId: 'First floor',
          title: 'room 2',
          children: [
            {
              id: 'b1',
              title: 'bed 1'
            },
            {
              id: 'b2',
              title: 'bed 2'
            }
          ]
        },
        {
          id: 'D',
          groupId: 'First floor',
          title: 'room 3',
          children: [
            {
              id: 'd1',
              title: 'bed 1'
            },
            {
              id: 'd2',
              title: 'bed 2'
            }
          ]
        },
        {
          id: 'E',
          groupId: 'Second floor',
          title: 'room 21',
          children: [
            {
              id: 'e1',
              title: 'bed 1'
            },
            {
              id: 'e2',
              title: 'bed 2'
            }
          ]
        },
        {
          id: 'C',
          groupId: 'Second floor',
          title: 'room 22',
          children: [
            {
              id: 'c1',
              title: 'bed 1'
            },
            {
              id: 'c2',
              title: 'bed 2'
            }
          ]
        }
      ]
    });

  // Render previously saved events from local storage
  events.forEach(function(event) {
    calendar.fullCalendar('renderEvent', event, true);
  });
});
