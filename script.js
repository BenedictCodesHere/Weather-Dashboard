// 


var button = $('<button>');
$(button).addClass('btn btn-styled')
$(button).text('LONDON');
$(button).appendTo('.list-group');

var cities = [];

$('.form').on('submit', function(event) {
    event.preventDefault();
    
    alert('hey');
    
})



$('#search-button').on('click', function(event) {
event.preventDefault();
var formInput = $('.form-input').val();
var cityName = formInput.trim().toUpperCase();
var latLong = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=f2e440a79117f6995bf30b0b003b5680'
console.log(latLong);

$.ajax({
url: latLong,
method: "GET"
}).then(function(firstResponse) {
    if (firstResponse.length < 1) {
        console.log(firstResponse);
        alert('Not a city, mate. Not a city.')
        return;
    }
    console.log(firstResponse);
console.log(firstResponse[0].lat)

localStorage.setItem('cityName', firstResponse[0].name);
localStorage.setItem('latitude', firstResponse[0].lat);
localStorage.setItem('longitude', firstResponse[0].lon);

var currentCityName = localStorage.getItem('cityName');
var currentLatitude = localStorage.getItem('latitude');
var currentLongitude = localStorage.getItem('longitude');

var currentCity = {
    currentCityName: currentCityName,
    currentLatitude: currentLatitude,
    currentLongitude: currentLongitude
}


cities.push(currentCity);

console.log(cities);
var buttonText = currentCityName.toUpperCase();
console.log(buttonText);
var newBtn = $('<button>');
newBtn.appendTo('.list-group');
newBtn.text(buttonText);
newBtn.addClass('btn-styled');
$('.form-input').val('');


let callTheApi = function() {
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLatitude + '&lon=' + currentLongitude + '&appid=f2e440a79117f6995bf30b0b003b5680&units=metric';

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(secondResponse) {
            var currentTempC = secondResponse.list[0].main.temp;
            var currentWind = secondResponse.list[0].wind.speed;
            var currentHumidity = secondResponse.list[0].main.humidity;
            var thisCity = localStorage.getItem('cityName');
            $('#today').children('h2').text(thisCity);
            $('#current-temp').children('span').text(currentTempC);
            $('#current-wind').children('span').text(currentWind);
            $('#current-humidity').children('span').text(currentHumidity);
        console.log(secondResponse);
        console.log(`temp: ${currentTempC},   
        humidity: ${currentHumidity}, 
        wind: ${currentWind}`);
        var iconcode = secondResponse.list[0].weather[0].icon;
        console.log(iconcode);
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl);
        });
};

callTheApi();

})




})



$('.btn-styled').on('click', function(event) {
    event.preventDefault();
    var queryCity = $(this).text();
    for (let i = 0; i < cities.length; i++)
})
