CWApp.constant('modalTimeTable', function () {
    return ['08.00', '08.15', '08.30', '08.45', '09.00', '09.15', '09.30', '09.45', '10.00', '10.15', '10.30', '10.45', '11.00', '11.15', '11.30', '11.45', '12.00', '12.15', '12.30', '12.45', '13.00', '13.15', '13.30', '13.45', '14.00', '14.15', '14.30', '14.45', '15.00', '15.15', '15.30', '15.45', '16.00', '16.15', '16.30', '16.45', '17.00', '17.15', '17.30', '17.45', '18.00', '18.15', '18.30', '18.45', '19.00', '19.15', '19.30', '19.45'];
});

var test = ['19.00', '19.19', '19.30', '19.45'];

CWApp.factory('modalService', function () {

    return {
        getTimeString: function (start) {
            var timestring = '08.45';
            var hh = (start.getUTCHours() + 2).toString(); // GMT + 2 hours
            var mm = start.getUTCMinutes().toString();
            mm = mm.length > 1 ? mm : "0" + mm;
            hh = hh.length > 1 ? hh : "0" + hh;
            timestring = hh + "." + mm
            
            return timestring
        },
        updateStartFromTimestring: function (start, timestring) {
            var hh = timestring.substring(0, 2);
            var mm = timestring.substring(3)
            start.setUTCHours(parseInt(hh)-2, parseInt(mm));

            return start;

        }
    }
});

CWApp.factory('eventFactory', function () {

    return {
        createEvent: function (titleParam, allDayParam, startParam, colorParam) {
            return {
                title: titleParam,
                allDay: allDayParam,
                start: startParam,
                color: colorParam
            };
        }
    };
});

CWApp.factory('crudFactory', ['$http', '$q', function ($http, $q) {

    var url = '/api/Event';

    var errorCallback = function (data, status, headers, config) {
        console.log("Error!");
    };
    var successCallback = function (data, status, headers, config) {
        console.log('Event action was successfuly handeled');
    };

    return {
        getEvents: function (filterobject) {
            var deferred = $q.defer();
            var config = { method: 'GET', url: '/api/Event', params: filterobject };
            var successGetEventsCallback = function (data, status) {
                $('#calendar').fullCalendar('addEventSource', data);
                deferred.resolve(data);
            };

            $http(config).success(successGetEventsCallback).error(errorCallback);

            return deferred.promise;
        },
        removeEvents: function () {

        },
        addEvent: function (event, eventSource) {
            var deferred = $q.defer();
            var addEventSuccessCallback = function (data, status) {
                deferred.resolve(status);
            }
            //$('#calendar').fullCalendar('addEventSource', eventSource);
            $http.post(url, event).success(addEventSuccessCallback).error(errorCallback);
            return deferred.promise;
        },
        deleteEvent: function (id) {
            $('#calendar').fullCalendar('removeEvents', id);
            $http.delete(url + '/' + id).success(successCallback).error(errorCallback);
        },
        updateEvent: function (event) {
            //$('#calendar').fullCalendar('updateEvent', event);
            var ev = {}
            $http.put(url, event).success(successCallback).error(errorCallback);
        },
        getHairdressers: function () {
            var deferred = $q.defer();
            // resolve

            $http({ method: 'GET', url: '/api/Hairdresserapi' }).
success(function (data, status, headers, config) {
    deferred.resolve(angular.fromJson(data));
});

            // end resolve
            return deferred.promise;
        },
        getServices: function () {
            var deferred = $q.defer();

            $http({ method: 'GET', url: '/api/Serviceapi' }).
success(function (data, status, headers, config) {
    deferred.resolve(data);
});
            return deferred.promise;
        }
    };

}]);