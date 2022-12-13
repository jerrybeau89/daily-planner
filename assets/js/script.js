let weekDay = dayjs().format('dddd, MMMM D');//Uses dayjs to pull and format the day, month, and date and add it to a variable
let allHourStyles = $('[data-hour]'); //used to target the textarea for hourly styling 
let currentHourStyle;//declares a variable
let allSavBtns = $('.saveBtn');//used to target all save buttons
let spaceID;//declares a variable
let userContent;//declares a variable

//wraps everything in a Jquery funtion to ensure the DOM loads first
$(function () {
  //Determines the current hour and sets the styling relative to a past, present, or future theme.
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
  //Saves entered data to local storage
  function saveData() { 
    spaceID = "space" + this.id;
    userContent = $('#' + spaceID).val();
    localStorage.setItem(spaceID, JSON.stringify(userContent));
  }
  //Gets stored data and puts it on the page
  function findEvents() { 
    $('textarea').each(function () {
        spaceID = this.id;
        $(this).val(JSON.parse(localStorage.getItem(this.id)));
    });
  }
//Sets the time of the clock and formats it. 
  function setClock () {
    $('#clock').html(dayjs().format('h:mm:ss a'));
  }
//sets and displays the current day of the week/month
  $('#currentDay').text(weekDay);
  //Calls the clock funtion and sets the intervals to realtime. 
  setClock();
  setInterval(setClock, 1000);
//Calls the hour funtion and sets the intervals to realtime.
  hourStyle();
  setInterval(hourStyle, 1000)
//Creates a click event that saves the data relative to the time slot.
  findEvents();
  $('#9, #10, #11, #12, #13, #14, #15, #16, #17').click(saveData);
});
