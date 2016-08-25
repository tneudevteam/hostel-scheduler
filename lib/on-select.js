const $ = require('jquery');
const bootbox = require('bootbox');

const addResidentTemplate = require('../templates/add-resident.handlebars');
const events = require('./events');

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
          const $surname = $('input[name=surname]');
          const $name = $('input[name=name]');
          const $middlename = $('input[name=middlename]');
          const title = `${$surname.val()} ${$name.val()} ${$middlename.val()}`;

          if (title) {
            const newEvent = {
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
