function addMap(lat, long) {
    var mapsURL = `https://www.google.com/maps/embed/v1/view?key=AIzaSyD6OKZYlqBFxAlP8xkCF_DF9km2KddZUa4&center=${lat},${long}&zoom=11&maptype=satellite`

    var iFrame = $(`<iframe
    width="450"
    height="250"
    frameborder="0" style="border:0"
    referrerpolicy="no-referrer-when-downgrade"
    src="${mapsURL}"
    allowfullscreen>
    </iframe>`)
    
    $('#map').empty();
    iFrame.appendTo('#map');
}






// var button = $('<button>');
// $(button).addClass('btn btn-styled')
// $(button).text('LONDON');
// $(button).appendTo('.list-group');
var cities = [];

if (localStorage.getItem('cities') != null) {
    var newCities = JSON.parse(localStorage.getItem('cities'));
    console.log(newCities);
    cities = newCities;
}

function renderButtons() {


    $('.list-group').empty();

    for (let i = 0; i < cities.length; i++) {
        var buttonText = cities[i].currentCityName.toUpperCase();
        console.log(buttonText);
        var newBtn = $('<button>');
        newBtn.addClass('btn-styled');
        newBtn.attr('data-number', i);
        newBtn.attr('data-name', cities[i].currentCityName);
        newBtn.text(buttonText);
        newBtn.appendTo('.list-group');
    }
}

renderButtons();

$('.form').on('submit', function(event) {
    event.preventDefault();
    
    alert('hey');
    
})

$('#clear-button').on('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('cities');
    cities = [];
    $('.list-group').empty();
    alert('cleared');
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

    var allCityNames = [];
    for (let i = 0; i < cities.length; i++) {
        var thisIsCity = cities[i].currentCityName;
        allCityNames.push(thisIsCity);
    }
    var evaluatingCity = firstResponse[0].name;
    const checkIt = allCityNames.find(name => name === evaluatingCity)
    if (checkIt != undefined) {
        $('.form-input').val('');
        const foundIndex = allCityNames.findIndex(name => name === evaluatingCity);
        var cityExists = cities[foundIndex].currentCityName;

        var grabbedLatTime = cities[foundIndex].currentLatitude;
    var grabbedLongTime = cities[foundIndex].currentLongitude;
    callTheApi(grabbedLatTime, grabbedLongTime, cityExists);
    
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

addMap(currentLatitude, currentLongitude);

var currentCity = {
    currentCityName: currentCityName,
    currentLatitude: currentLatitude,
    currentLongitude: currentLongitude
}

cities.push(currentCity);

console.log(cities);
localStorage.setItem('cities', JSON.stringify(cities));



renderButtons();

$('.form-input').val('');




callTheApi(currentLatitude, currentLongitude, currentCityName);

})




})


let callTheApi = function(currentLatitudeX, currentLongitudeY, currentCityZ) {
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLatitudeX + '&lon=' + currentLongitudeY + '&appid=f2e440a79117f6995bf30b0b003b5680&units=metric';

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(secondResponse) {
            console.log(secondResponse);
            function putYourEyesIn(listIndex) {
                var currentTempC = secondResponse.list[listIndex].main.temp;
                var currentWind = (secondResponse.list[listIndex].wind.speed) * 3.6;
                var currentHumidity = secondResponse.list[listIndex].main.humidity;
                var thisCity = currentCityZ;
                var dateTime = secondResponse.list[listIndex].dt_txt;
                var formattedDateTime = moment(dateTime).format('dddd D MMM hh:mm A');
                var iconcode = secondResponse.list[listIndex].weather[0].icon;
                console.log(iconcode);
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var thisArray = [thisCity, formattedDateTime, currentTempC, currentWind, currentHumidity, iconurl];

                
                console.log(thisArray);
                return thisArray;

                
            }
            
           var todayArray =  putYourEyesIn(0);

           var oneDayFromNowArray = putYourEyesIn(4);
           var twoDaysFromNowArray = putYourEyesIn(12);
           var threeDaysFromNowArray = putYourEyesIn(20);
           var fourDaysFromNowArray = putYourEyesIn(28);
           var fiveDaysFromNowArray = putYourEyesIn(36);


           $('#today').children('h2').html(`${todayArray[0]} ${todayArray[1]} <div class="icon"><img id="wicon" src=""></div>` );
                $('#current-temp').children('span').text(todayArray[2]);
                $('#current-wind').children('span').text(todayArray[3].toFixed(2));
                $('#current-humidity').children('span').text(todayArray[4]);  
                $('#wicon').attr('src', todayArray[5]);


                for (let index2 = 0; index2 < ($('#forecast').children()).length; index2++) {
                   var thisCard = $('#forecast').children().eq(index2);
                   console.log(thisCard);
                   let dayArray;
                   switch(index2) {
                    case 0:
                    dayArray = oneDayFromNowArray;
                    break;
                    case 1:
                    dayArray = twoDaysFromNowArray;
                    break;
                    case 2:
                    dayArray = threeDaysFromNowArray;
                    break;
                    case 3: 
                    dayArray = fourDaysFromNowArray;
                    break;
                    case 4:
                    dayArray = fiveDaysFromNowArray;
                    break;
                   }

                var hello = thisCard.first();
                console.log(hello);
                var goodbye = thisCard.children().first();
                console.log(goodbye);
                goodbye.text(dayArray[1]);

                var cardBody = thisCard.children().eq(1);
                console.log(cardBody);
                var imgDiv = cardBody.children().first().children().first().children().first();
                console.log(imgDiv);
                imgDiv.attr('src', dayArray[5]);

                if (imgDiv.hasClass('hidden')) {
                    imgDiv.removeClass('hidden');
                    imgDiv.addClass('show');
                }
                

                var tempP = cardBody.children().eq(1);
                var windP = cardBody.children().eq(2);
                var humidityP = cardBody.children().eq(3);

                tempP.text(`Temp: ${dayArray[2].toFixed(1)} °C`);
                windP.text(`Wind: ${dayArray[3].toFixed(1)} KPH`);
                humidityP.text(`Humidity: ${dayArray[4]} `);
                //    console.log(dayArray);
                //    console.log('---------------');
                //    console.log(thisCard);
                //    $(thisCard).first().text(dayArray[1]);
                //    $(thisCard).children().eq(1).children();
                
                //    $(thisCard).children().eq(1).children().eq(0).first().first().attr('src', dayArray[5]);
                   
                //    $(thisCard).children().eq(1).children().eq(1).html(`<p class="card-text">Temp: ${dayArray[2]} </p>`);
                //    $(thisCard).children().eq(1).children().eq(2).html(`Wind: ${dayArray[3]}`);
                //    $(thisCard).children().eq(1).children().eq(3).html(`Wind: ${dayArray[4]}`);
                   //$(thisIcon).first().attr('src', dayArray[5])
                }
          


        console.log(secondResponse);
        // console.log(`temp: ${currentTempC},   
        // humidity: ${currentHumidity}, 
        // wind: ${currentWind}`);


        
        });
};














// The reason why I want to call the API every time is because each time the person clicks one of the buttons, you want fresh weather updates. Say if someone clicks the buttons hours apart, you don't want the forecast from hours ago, you want the present forecast.
function displayWeatherInfo() {
    var index = $(this).attr('data-number');
    var clickedCity = $(this).attr('data-name')
    var grabbedLat = cities[index].currentLatitude;
    var grabbedLong = cities[index].currentLongitude;
    addMap(grabbedLat, grabbedLong);
    callTheApi(grabbedLat, grabbedLong, clickedCity);

    console.log(grabbedLat);
    console.log(grabbedLong);

}

$(document).on('click', ".btn-styled", displayWeatherInfo); 

