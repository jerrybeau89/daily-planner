// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let weekDay = dayjs().format('dddd MMM D');
let allHourStyles = $('[data-hour]');
let currentHourStyle;
let allSavBtns = $('.saveBtn');
let spaceID;
let userContent;


//$(function () {
console.log(allHourStyles);
  function hourStyle() {
    for (let i = 0; i < allHourStyles.length; i++) {
      currentHourStyle = parseInt(allHourStyles[i].dataset.hour);
      if (currentHourStyle < dayjs().format("HH")) {
        allHourStyles[i].classList.add("past");
      } else if (currentHourStyle > dayjs().format("HH")) {
        allHourStyles[i].classList.add("future");
      } else {
        allHourStyles[i].classList.add("present");
      }
    }
  }
  
  function saveData() { //saves entered data to local storage
    spaceID = "space" + this.id;
    userContent = $('#' + spaceID).val();
    localStorage.setItem(spaceID, JSON.stringify(userContent));
  }
  function findEvents() { //gets stored data and puts it on the page
    $('textarea').each(function () {
        spaceID = this.id;
        $(this).val(JSON.parse(localStorage.getItem(this.id)));
    });
  }

  function setClock () {
    $('#clock').html(dayjs().format('h:mm:ss a'));
  }

  $('#currentDay').text(weekDay);
  setClock();
  setInterval(setClock, 1000);

  hourStyle();
  setInterval(hourStyle, 1000)

  findEvents();
  $('#9, #10, #11, #12, #13, #14, #15, #16, #17').click(saveData);

  console.log(allHourStyles);
//});
