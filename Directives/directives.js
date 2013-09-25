CWApp.directive('cwCalendar', ['cwConfig', '$compile', function (cwConfig, $compile) {

    return {

        restrict: 'A',
        link: function (scope, elem, attrs) {

            cwConfig.dayClick = function (date, allDay, jsEvent, view) {
                scope.modal.title = "";
                scope.modal.allday = false;
                scope.modal.start = date;
                scope.modal.clickMode('dayclick');
            };
            cwConfig.eventClick = function (event, element) {
                scope.modal.id = event.id;
                scope.modal.title = event.title;
                scope.modal.allday = event.allday;
                scope.modal.start = event.start;
                scope.modal.clickMode('eventclick');
                scope.modal.event = event;
            };

            cwConfig.eventDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                // resize and translate
                scope.modal.id = event.id;
                scope.modal.title = event.title;
                scope.modal.allday = event.allday;
                scope.modal.start = event.start;
                scope.modal.clickMode('dnd');
                scope.modal.event = event;
                scope.persistEvent();
            },
            cwConfig.drop = function (date) {
                // external drop
                scope.modal.title = scope.selectedService;
                scope.modal.clickMode('externaldnd');
                scope.modal.start = date;
                //scope.modal.color = scope.Hairdresser.color;
                scope.persistEvent();
                console.log("Dropped at: " + date);
            },
            cwConfig.viewRender = function (view, element) {
                var tableElement = $(element[0]).attr('ng-click', 'openModal()');
                $compile(tableElement)(scope);
            };
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
                placeholder: "Välj Frisör"
            });

            elem.on("select2-selecting", function (e) {
                scope.filter.Hairdresser = e.object.text;
                scope.modal.color = scope.hairdresserColor = e.val;
                scope.hairdresserBorderStyle = { border: '1px solid ' + scope.hairdresserColor };
                scope.hairdresserColorStyle = { color: scope.hairdresserColor };
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