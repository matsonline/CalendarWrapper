CWApp.directive('cwCalendar', ['cwConfig', '$compile', function (cwConfig, $compile) {

    return {

        restrict: 'A',
        link: function (scope, elem, attrs) {

            cwConfig.dayClick = function (date, allDay, jsEvent, view) {
                scope.modal.title = "";
                scope.modal.allday = false;
                scope.modal.eventStart = date;
                scope.modal.eventEnd = new Date(date.toUTCString());
                scope.modal.eventEnd.setUTCHours(date.getUTCHours() + 1);
                scope.modal.hairdresser = "";
                scope.modal.color = "";
                scope.modal.customer = "";
                scope.modal.phone = "";
                scope.modal.email = "";
                scope.modal.clickMode('dayclick');
                scope.$apply();
            };
            cwConfig.eventClick = function (event, element) {
                scope.modal.id = event.id;
                scope.modal.title = event.title;
                scope.modal.allday = event.allday;
                scope.modal.eventStart = event.start;
                scope.modal.eventEnd = event.end;
                scope.modal.hairdresser = event.hairdresser;
                scope.modal.color = event.color;
                scope.modal.customer = event.customer;
                scope.modal.phone = event.phone;
                scope.modal.email = event.email;
                scope.modal.clickMode('eventclick');
                scope.modal.event = event;
                scope.$apply();
            };

            cwConfig.eventDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                
                // move event
                scope.modal.id = event.id;
                scope.modal.title = event.title;
                scope.modal.allday = event.allday;
                scope.modal.eventStart = event.start;
                scope.modal.eventEnd = event.end;
                scope.modal.hairdresser = event.hairdresser;
                scope.modal.color = event.color;
                scope.modal.customer = event.customer;
                scope.modal.phone = event.phone;
                scope.modal.email = event.email;
                scope.modal.clickMode('dnd');
                scope.modal.event = event;
                scope.$apply();
                scope.persistEvent();
            },
            cwConfig.eventResize = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                // resize event
                scope.modal.id = event.id;
                scope.modal.title = event.title;
                scope.modal.allday = event.allday;
                scope.modal.eventStart = event.start;
                scope.modal.eventEnd = event.end;
                scope.modal.hairdresser = event.hairdresser;
                scope.modal.color = event.color;
                scope.modal.customer = event.customer;
                scope.modal.phone = event.phone;
                scope.modal.email = event.email;
                scope.modal.clickMode('dnd');
                scope.modal.event = event;
                scope.$apply();
                scope.persistEvent();
            },
            cwConfig.drop = function (date) {
                // external drop
                scope.modal.title = scope.selectedService;
                scope.modal.clickMode('externaldnd');
                scope.modal.eventStart = date;
                scope.modal.eventEnd = new Date(date.toUTCString());
                scope.modal.eventEnd.setUTCHours(date.getUTCHours() + 1);
                scope.modal.customer = "";
                scope.modal.phone = "";
                scope.modal.email = "";
                scope.$apply();
                scope.persistEvent();
                console.log("Dropped at: " + date);
            },
            cwConfig.viewRender = function (view, element) {
                var tableElement = $(element[0]).attr('ng-click', 'openModal()');
                $compile(tableElement)(scope);
            };
            cwConfig.eventRender = function (event, element) {
                element.find('.fc-event-title').append("<br/>" + event.customer + "<br/>" + event.phone);
            }
            elem.fullCalendar(cwConfig);


            $('.draggable').draggable({
                revert: true,      // immediately snap back to original position
                revertDuration: 100  //
            });

        }
    };
}]);

CWApp.directive('hairdresserSelectbox', ['modalService', function (modalService) {

    return {
        restrict: 'A',
        link: function (scope, elem, attr) {

            elem.select2({
                placeholder: "Välj Frisör",
                });

            elem.on("select2-selecting", function (e) {
                scope.modal.hairdresser = e.object.text;
                scope.modal.color = scope.hairdresserColor = e.val;
                scope.hairdresserBorderStyle = { border: '1px solid ' + scope.hairdresserColor };
                scope.hairdresserColorStyle = { color: scope.hairdresserColor };
                scope.filter.hairdresser = e.object.text;
                scope.$apply();
                scope.getEvents();
            });
        }
    }
}]);

CWApp.directive('serviceSelectbox', function () {

    return {
        restrict: 'A',
        link: function (scope, elem, attr) {

            elem.select2({
                placeholder: "Välj Behandling"
            });

            elem.on("select2-selecting", function (e) {
                
                console.log(e.object.text);
                scope.selectedService = e.object.text;
                scope.showservice = true;
                scope.$apply();
            });
        }
    }
});

CWApp.directive('timepicker', ['$compile', function ($compile) {

    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            // hack in jquery-simple-dtpicker.js line 897
            
            elem.timepicker({
                timeFormat: 'H:i',
                step: 15});
        }
    }
}]);


