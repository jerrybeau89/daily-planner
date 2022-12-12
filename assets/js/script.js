// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let weekDay = dayjs().format('dddd MMM D');
let allHourStyles = $('[hour-style]');
let currentHourStyle;
let allSavBtns = $('.saveBtn');
let fieldID;
let fieldContent;

//$(function () {
  
  function hourStyle() {
    for (let i = 0; i < allHourStyles.length; i++) {
      currentHourStyle = parseInt(allHourStyles[i].dataset.hour);
      if (currentHourStyle < dayjs().format("HH")) {
        allHourStyles[i].classList.add('past');
      } else if (currentHourStyle > dayjs().format("HH")) {
        allHourStyles[i].classList.add("future");
      } else {
        allHourStyles[i].classList.add("present");
      }
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function findEvents() { //gets stored data and puts it on the page
    $('textarea').each(function () {
        fieldID = this.id;
        $(this).val(JSON.parse(localStorage.getItem(this.id)));
    });
}

function saveData() { //saves entered data to local storage
    fieldID = this.id + "field";
    fieldContent = $('#' + fieldID).val();
    localStorage.setItem(fieldID, JSON.stringify(fieldContent));
}
  // TODO: Add code to display the current date in the header of the page.

  function setClock () {
    $('#clock').html(dayjs().format('hh:mm:ss a'));
  }

  $('#currentDay').text(weekDay);
  setClock();
  setInterval(setClock, 1000);

  hourStyle();
  setInterval(hourStyle, 1000)

  findEvents();
  $('#9, #10, #11, #12, #13, #14, #15, #16, #17').click(saveData);
//});
