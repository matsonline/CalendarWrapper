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