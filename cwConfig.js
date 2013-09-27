CWApp.value('cwConfig', {

    // General Display

    header: {
        left: 'month agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
    },
    defaultView: 'agendaWeek',

    firstDay: 1,
    weekNumbers: true,
    height: 650,
    timeFormat: 'HH:mm',
    axisFormat: 'HH:mm',
    allDayText: 'Heldag',
    firstHour: 8,
    slotMinutes: 15,
    monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli',
'Augusti', 'September', 'Oktober', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul',
'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag',
'Torsdag', 'Fredag', 'Lördag'],
    dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons',
'Tor', 'Fre', 'Lör'],
    buttonText: {
        prev: '&lsaquo;', // <
        next: '&rsaquo;', // >
        prevYear: '&laquo;',  // <<
        nextYear: '&raquo;',  // >>
        today: 'idag',
        month: 'månad',
        week: 'vecka',
        day: 'dag'
    },
    columnFormat: {
        month: 'ddd',    // Mån
        week: 'ddd dd MMM', // Mån 09 Sep
        day: 'dddd dd MMMM'  // Måndag 09 September
    },
    weekNumberTitle: "vecka",

    // drop etc
    editable: true,
    droppable: true,

    // Events
    startParam: 'eventStart',
    endParam: 'eventEnd'

    // etc...


});