var $ = require('jquery');
var bootbox = require('bootbox');

var addResidentTemplate = require('../templates/add-resident.handlebars');
var events = require('./events');

module.exports = function(start, end, jsEvent, view, resource) {
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
            view.calendar.renderEvent(newEvent, true);

            events.save(newEvent);
          }
          view.calendar.unselect();
        }
      }
    }
  });
};
