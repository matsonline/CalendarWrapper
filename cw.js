


CWApp.controller('CWCtrl', ['$scope', '$modal', 'cwConfig', 'crudFactory', 'eventFactory', '$http', 'modalTimeTable', 'modalService', '$filter', function ($scope, $modal, cwConfig, crudFactory, eventFactory, $http, modalTimeTable, modalService, $filter) {
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
        hairdresser: "",
        customer: "",
        phone: "",
        email: "",
        allday: false,
        eventStart: "",
        eventEnd: "",
        timeStart: "",
        timeEnd: "",
        color: "orange",
        header: "",
        mode: "",
        event: "",
        clickMode: function (mode) {

            if (mode === 'dayclick') {
                this.header = 'Boka ny tid!';
                this.timeStart = modalService.getTimeString(this.eventStart);
                if (this.eventEnd)
                    this.timeEnd = modalService.getTimeString(this.eventEnd);
            } else if (mode === 'eventclick') {
                this.header = 'Ändra bokning';
                this.timeStart = modalService.getTimeString(this.eventStart);
                if (this.eventEnd)
                    this.timeEnd = modalService.getTimeString(this.eventEnd);
            } else if (mode === 'dnd'){
                
            }
            this.mode = mode;
            

        }
        
    };

    // time
    $scope.timeTable = modalTimeTable;
    $scope.timeStartSelect = function () {
        if ($scope.modal.timeStart.length == 5) {
            $scope.modal.eventStart = modalService.updateDateTimeFromTimestring($scope.modal.eventStart, $scope.modal.timeStart)
        }
    };
    $scope.timeEndSelect = function () {
        if ($scope.modal.timeEnd.length == 5){
            $scope.modal.eventEnd = modalService.updateDateTimeFromTimestring($scope.modal.eventEnd, $scope.modal.timeEnd)
        }
    };
    // Date
        $scope.dateSelect = function () {
            $scope.modal.eventStart = modalService.updateDateTimeFromTimestring($scope.modal.eventStart, $scope.modal.timeStart)
        
    };

    $scope.openModal = function () {
        
        $modal({ template: '/CalendarWrapper/modal2.html', persist: true, show: true, backdrop: 'static', scope: $scope });
    };

    // Hairdressers

    $scope.selctedHairdresser = "1";

    crudFactory.getHairdressers().then(function (promise) {
        $scope.Hairdressers = promise;
    });

    $scope.typeHairdressersFn = function () {
        return $.map($scope.Hairdressers, function (obj) {
            return obj.Name;
        });
    };

    $scope.$on('modal-shown', function () {
        $('#modalhdrslbx').select2("val", $scope.modal.color);
        $scope.filter.hairdresser = $scope.modal.hairdresser;
    });

    $scope.$on('modal-hidden', function () {
        $('.modal').remove();
    });

    
    // Services
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

    // *********************
    // *** Event sources ***
    // *********************
    $scope.status = "";
    $scope.events = [];
    var pendingEvent = {};
    var pendingEventSource = {};

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

    $scope.filter = { hairdresser: "" };
    // Get events
    $('#calendar').fullCalendar('removeEventSource', $scope.events);
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
        
        pendingEvent = eventFactory.createEvent($scope.modal.title, $scope.modal.allday, $scope.modal.eventStart, $scope.modal.eventEnd, $scope.modal.hairdresser, $scope.modal.customer, $scope.modal.phone, $scope.modal.email, $scope.modal.color);
        pendingEventSource = eventFactory.createEvent($scope.modal.title, $scope.modal.allday, $scope.modal.eventStart, $scope.modal.eventEnd, $scope.modal.hairdresser, $scope.modal.customer, $scope.modal.phone, $scope.modal.email, $scope.modal.color);
        
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
        updatedEv.eventStart = clickEvent.eventStart = $scope.modal.eventStart;
        updatedEv.eventEnd = clickEvent.eventEnd = $scope.modal.eventEnd;
        updatedEv.title = clickEvent.title = $scope.modal.title;
        updatedEv.allDay = clickEvent.allday = $scope.modal.allday;
        updatedEv.hairdresser = clickEvent.hairdresser = $scope.modal.hairdresser;
        updatedEv.customer = clickEvent.customer = $scope.modal.customer;
        updatedEv.phone = clickEvent.phone = $scope.modal.phone;
        updatedEv.email = clickEvent.email = $scope.modal.email;
        updatedEv.color = clickEvent.color = $scope.modal.color;

        $('#calendar').fullCalendar('updateEvent', clickEvent);
        crudFactory.updateEvent(updatedEv).then(function (promise) {
            $scope.getEvents();
        });
        
    };
 

}]);