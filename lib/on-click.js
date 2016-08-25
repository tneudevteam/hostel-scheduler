const $ = require('jquery');
const bootbox = require('bootbox');

const editResidentTemplate = require('../templates/edit-resident.handlebars');
const events = require('./events');

module.exports = function(event, jsEvent, view) {
  const x = $('tr[data-resource-id=C]');
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
          event.title = `${event.surname} ${event.name}`;
          event.backgroundColor = 'green';

          const eventToUpdate = {
            surname: event.surname,
            name: event.name,
            title: event.title,
            backgroundColor: event.backgroundColor
          };

          events.update(event.id, eventToUpdate);

          view.calendar.updateEvent(event);
        }
      }
    }
  });
};
