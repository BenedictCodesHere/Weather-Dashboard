// 


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
var cityName = formInput;
var latLong = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=f2e440a79117f6995bf30b0b003b5680'
console.log(latLong);

$.ajax({
url: latLong,
method: "GET"
}).then(function(response) {
console.log(response);

console.log(response[0].lat)

localStorage.setItem('latitude', response[0].lat);
localStorage.setItem('longitude', response[0].lon);


var currentLatitude = localStorage.getItem('latitude');
var currentLongitude = localStorage.getItem('longitude');

var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLatitude + '&lon=' + currentLongitude + '&appid=f2e440a79117f6995bf30b0b003b5680&units=metric'

$.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    console.log(`temp: ${response.list[0].main.temp},   
    humidity: ${response.list[0].main.humidity}, 
    wind: ${response.list[0].wind.speed}`)
    })

})



var buttonText = formInput.trim().toUpperCase();
console.log(buttonText);
var newBtn = $('<button>');
newBtn.appendTo('.list-group');
newBtn.text(buttonText);
newBtn.addClass('btn-styled');
$('.form-input').val('');


})

