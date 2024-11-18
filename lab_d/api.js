document.addEventListener("DOMContentLoaded", function() {
    const API_key = 'dfbabb73a542884e5ecb35ba2bee30be';
    let city_name = "Tokyo";
    // getForecast();
    getWeather();
    function getForecast() {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let icon = data.weather[0].icon;
                console.log(icon);
                let main = document.getElementById("main");
                main.innerHTML+=`<img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='weather icon'>`;
            })
        ;
    }

    function getWeather(){
        let req = new XMLHttpRequest();

        req.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`, true);
        req.addEventListener("load", function(event) {

            console.log(req.responseText);
        });
        req.send();
    }
});




