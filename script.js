'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f2e440a79117f6995bf30b0b003b5680'
var queryURL = 'https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={f2e440a79117f6995bf30b0b003b5680}'

console.log('Hello World');


var button = $('<button>');
$(button).addClass('btn btn-styled')
$(button).text('LONDON');
$(button).appendTo('.list-group');

$('.form').on('submit', function(event) {
    event.preventDefault();
    alert('hey');
})

$('#search-button').on('click', function(event) {
event.preventDefault();
var formInput = $('.form-input').val();
var buttonText = formInput.trim().toUpperCase();
console.log(buttonText);
var newBtn = $('<button>');
newBtn.appendTo('.list-group');
newBtn.text(buttonText);
newBtn.addClass('btn-styled');
$('.form-input').val('');
})

