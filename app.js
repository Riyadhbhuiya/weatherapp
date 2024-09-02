//api key = 776fa5a50d900bea47b673948bf4d52f

console.log("Alive")

const sButton = document.querySelector(".sbutton");

const getWeather = () => {
    const input = document.getElementsByClassName("input")[0];
    //const sButton = document.getElementsByClassName("sbutton")[0];
    const cityName = input.value;

    const apiKey = "776fa5a50d900bea47b673948bf4d52f";
    const gApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=`;

    const getCityName = async function () {
        try {
            const response = await fetch(gApiUrl + apiKey);
            const data = await response.json();

            //console.log(data)
            //console.log(data[0])
            cityDetails(data[0])
            //console.log("clicked")
            //return data[0];

        } catch (e) {
            console.log("This went wrong: ", e)
        }
    }

    getCityName();

    const cityDetails = async function (data) {
        try {
            //console.log("here")
            //console.log(data)


            const wApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=`;

            const response = await fetch(wApiUrl + apiKey);
            const weather = await response.json();
            //console.log(weather.name);

            showDetails(weather);
            convertTimestamptoTime(weather);

            //return weather;
        } catch (e) {
            console.log("This went wrong: ", e)
        }
    }


    const showDetails = function (weather) {
        //console.log("from showdetails")
        //console.log(weather)
        // console.log(typeof(weather))
        // console.log(weather.base)
        // console.log(weather.name)

        const cond = weather.weather[0].icon;

        document.querySelector(".city").innerHTML = weather.name;
        document.querySelector(".condition").src = `https://openweathermap.org/img/wn/${cond}@2x.png`;
        document.querySelector(".temperature").innerHTML = weather.main.temp;
        document.querySelector(".hinfo").innerHTML = weather.main.humidity + "%";
        document.querySelector(".winfo").innerHTML = weather.wind.speed + "KM/h";

    }

    //convert time
    function convertTimestamptoTime(weather) {

        let unixTimestamp = weather.dt;
    
        // Convert to milliseconds and
        // then create a new Date object
        let dateObj = new Date(unixTimestamp * 1000);
        let utcString = dateObj.toUTCString();
    
        let time = utcString.slice(-11, -7);
    
        //console.log(time);
        //console.log(utcString)

        //document.querySelector(".time").innerHTML = time;
    }
}


sButton.addEventListener("click", () => {
    //console.log("clicked here")
    getWeather()
});