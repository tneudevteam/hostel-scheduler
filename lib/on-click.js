const $ = require('jquery');
const bootbox = require('bootbox');
const Suggestions = require('suggestions');
const students = require('./students');

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
        callback() {
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

          console.log('SAVE EVENT CLICKED');
        }
      }
    }
  })
};

$(document).on("shown.bs.modal", () => {
  new Suggestions(document.querySelector('#student-search'), students, {
    minLength: 2,
    limit: 3
  });

  $('[data-action="search"]').on('click', () => {
    console.log('SEARCH CLICKED');
  });

  $('[data-action="refresh-search"]').on('click', () => {
    console.log('REFRESH SEARCH CLICKED');
  });

  $('[data-action="cancel-booking"]').on('click', () => {
    console.log('CANCEL BOOKING CLICKED');
  });

  $('[data-action="kick-out"]').on('click', () => {
    console.log('KICK OUT CLICKED');
  });

  $('[data-action="save-all"]').on('click', () => {
    console.log('SAVE ALL CLICKED');
  });

  $('[data-action="cancel-all"]').on('click', () => {
    console.log('CANCEL ALL CLICKED');
  });
});
