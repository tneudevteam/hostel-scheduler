$(document).ready(function() {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
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
          message: '<div class="row">  ' +
          '<div class="col-md-12"> ' +
          '<form class="form-horizontal"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="surname">Прізвище</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="surname" name="surname" type="text" placeholder="Прізвище" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="name">Ім`я</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="name" name="name" type="text" placeholder="Ім`я" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="middlename">По-батькові</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="middlename" name="middlename" type="text" placeholder="По-батькові" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="isFamily" class="form-control">Сімейник</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="isFamily" name="isFamily" type="checkbox" value="">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="purpose">Мета поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<textarea id="purpose" name="purpose" style="resize:none" rows="2" placeholder="Мета поселення" class="form-control input-md"/> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="birthDate">Дата народження</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="birthDate" name="birthDate" type="date" class="form-control input-md" value="' + start.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="pasportInfo">Паспортні дані</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="pasportInfo" name="pasportInfo" type="text" placeholder="Паспортні дані" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="livesBy">Поселений за</label> ' +
          '<div class="col-md-4"> ' +
          '<select class="form-control" id="livesBy" name="livesBy">' +
          '<option>Поданням</option>' +
          '<option>Наказом</option>' +
          '<option>...</option>' +
          '</select>' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="startDate">Дата поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="startDate" name="startDate" type="date" class="form-control input-md" value="' + start.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="startTime">Час поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="startTime" name="startTime" type="time" class="form-control input-md" value="' + start.format("HH:mm") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="endDate">Дата виселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="endDate" name="endDate" type="date" class="form-control input-md" value="' + end.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="endTime">Час виселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="endTime" name="endTime" type="time" class="form-control input-md" value="' + end.format("HH:mm") + '">' +
          '</div>  </div>' +
          '</form> </div>  </div>',
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
          message: '<div class="row">  ' +
          '<div class="col-md-12"> ' +
          '<form class="form-horizontal"> ' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="surname">Прізвище</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="surname" name="surname" type="text" placeholder="Прізвище" class="form-control input-md" value="' + event.surname + '"></input> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="name">Ім`я</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="name" name="name" type="text" placeholder="Ім`я" class="form-control input-md" value="' + event.name + '"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="middlename">По-батькові</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="middlename" name="middlename" type="text" placeholder="По-батькові" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="isFamily" class="form-control">Сімейник</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="isFamily" name="isFamily" type="checkbox" value="">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="purpose">Мета поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<textarea id="purpose" name="purpose" style="resize:none" rows="2" placeholder="Мета поселення" class="form-control input-md"/> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="birthDate">Дата народження</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="birthDate" name="birthDate" type="date" class="form-control input-md" value="' + event.start.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="pasportInfo">Паспортні дані</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="pasportInfo" name="pasportInfo" type="text" placeholder="Паспортні дані" class="form-control input-md"> ' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="livesBy">Поселений за</label> ' +
          '<div class="col-md-4"> ' +
          '<select class="form-control" id="livesBy" name="livesBy">' +
          '<option>Поданням</option>' +
          '<option>Наказом</option>' +
          '<option>...</option>' +
          '</select>' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="startDate">Дата поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="startDate" name="startDate" type="date" class="form-control input-md" value="' + event.start.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="startTime">Час поселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="startTime" name="startTime" type="time" class="form-control input-md" value="' + event.start.format("HH:mm") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="endDate">Дата виселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="endDate" name="endDate" type="date" class="form-control input-md" value="' + event.end.format("YYYY-MM-DD") + '">' +
          '</div>  </div>' +
          '<div class="form-group"> ' +
          '<label class="col-md-4 control-label" for="endTime">Час виселення</label> ' +
          '<div class="col-md-4"> ' +
          '<input id="endTime" name="endTime" type="time" class="form-control input-md" value="' + event.end.format("HH:mm") + '">' +
          '</div>  </div>' +
          '</form> </div>  </div>',
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
