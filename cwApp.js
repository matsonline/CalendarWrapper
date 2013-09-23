var CWApp = angular.module('CWApp', ['$strap.directives']);

// Services

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
        removeEvents: function(){

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

CWApp.factory('eventFactory', function () {

    return {
        createEvent: function (titleParam, allDayParam, startParam, colorParam) {
            return {
                title: titleParam,
                allDay: allDayParam,
                start: startParam,
                color: colorParam
            };
        },
        extractTimeFromString: function (timestring) {
            // set start time from time field
            timeObject = {};
            timeObject.hh = timestring.slice(0, 2);
            timeObject.mm = timestring.slice(3, 5);
            return timeObject;


        },
        generateTimestring: function (datetime) {
            timestring = "";
            hh = datetime.getHours();
            mm = datetime.getMinutes();
            if (hh < 10) {
                hh = '0' + hh;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            timestring = hh + '.' + mm;
            return timestring;
        }


    };
});

