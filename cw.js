


CWApp.controller('CWCtrl', ['$scope', '$modal', 'cwConfig', 'crudFactory', 'eventFactory', '$http', 'modalTimeTable', 'modalService', function ($scope, $modal, cwConfig, crudFactory, eventFactory, $http, modalTimeTable, modalService) {
    // *************
    // *** Panel ***
    // *************
    $scope.hairdresserColor = 'gray';
    $scope.hairdresserBorderStyle = { border: '1px solid ' + $scope.hairdresserColor };
    $scope.hairdresserColorStyle = { color: $scope.hairdresserColor };
    // *************
    // *** Modal ***
    // *************
    $scope.modal = {
        id:0,
        title: "", // Behandling
        customer: "",
        phone:"",
        allday: false,
        start: "",
        end: "",
        time: "",
        color: "orange",
        clickMode: function (mode) {

            if (mode === 'dayclick') {
                this.header = 'Boka ny tid!';
                this.time = modalService.getTimeString(this.start)
            } else if (mode === 'eventclick') {
                this.header = 'Ändra bokning';
                this.time = modalService.getTimeString(this.start)
            } else if (mode === 'dnd'){
                
            }
            this.mode = mode;
            

        },
        header: "",
        mode: "",
        event: ""
    };

    // time
    $scope.timeTable = modalTimeTable;
    $scope.timeSelect = function () {
        if ($scope.modal.time.length == 5)
            $scope.modal.start = modalService.updateStartFromTimestring($scope.modal.start, $scope.modal.time)
    };
    // Date
    $scope.dateSelect = function () {
        $scope.modal.start = modalService.updateStartFromTimestring($scope.modal.start, $scope.modal.time)
    };

    $scope.openModal = function () {
        
        $modal({ template: '/CalendarWrapper/modal2.html', persist: true, show: true, backdrop: 'static', scope: $scope });
    };

    // *********************
    // *** Event sources ***
    // *********************
    $scope.status = "";
    $scope.events = [];
    var pendingEvent = {};
    var pendingEventSource = {};

    // Services and Hairdressers

    crudFactory.getHairdressers().then(function (promise) {
        $scope.Hairdressers = promise;
    });

    $scope.typeHairdressersFn = function () {
        return $.map($scope.Hairdressers, function (obj) {
            return obj.Name;
        });
    };

    $scope.selectedService = "";
    crudFactory.getServices().then(function (promise) {
         $scope.Services = promise
    });

    $scope.typeServicesFn = function () {
        return $.map($scope.Services, function (obj) {
            return obj.text;
        });
    }

    $scope.showservice = false;

    // **********************
    // *** Event services ***
    // **********************
    $scope.persistEvent = function () {
        if (($scope.modal.mode === "dayclick") || ($scope.modal.mode == "externaldnd")){
            $scope.addEvent();
        }
        else if ($scope.modal.mode === "eventclick" || $scope.modal.mode === 'dnd') {
            $scope.updateEvent();
        }
        else
            console.log("semething is wrong here!")
    };

    $scope.filter = { Hairdresser: "" };
    // Get events
     crudFactory.getEvents($scope.filter).then(function (promise) {
         $scope.events = promise;
        
    });

    $scope.getEvents = function () {
        $('#calendar').fullCalendar('removeEventSource', $scope.events);
        crudFactory.getEvents($scope.filter).then(function (promise) {
            $scope.events = promise;
        });
    };


    // Add event
    $scope.addEvent = function () {
        
        pendingEvent = eventFactory.createEvent($scope.modal.title, $scope.modal.allday, $scope.modal.start, $scope.modal.color); 
        pendingEventSource = eventFactory.createEvent($scope.modal.title, $scope.modal.allday, $scope.modal.start, $scope.modal.color);
        
        crudFactory.addEvent(pendingEvent, [pendingEventSource]).then(function(promise){
            $scope.getEvents();
        });
        
    };

    // Delete event
    $scope.deleteEvent = function (id) {
        crudFactory.deleteEvent(id);
    };

    // Update event
    $scope.updateEvent = function () {

        clickEvent = $scope.modal.event;
        updatedEv = {};
        updatedEv.id = $scope.modal.id;
        updatedEv.start = clickEvent.start = $scope.modal.start;
        updatedEv.title = clickEvent.title = $scope.modal.title;
        updatedEv.allDay = clickEvent.allday = $scope.modal.allday;
        updatedEv.color = $scope.modal.color;

        $('#calendar').fullCalendar('updateEvent', clickEvent);
        crudFactory.updateEvent(updatedEv);
    };
 

}]);