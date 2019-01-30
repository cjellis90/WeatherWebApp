import React, { Component } from "react";
import InputCity from "./InputCity.js";
import clouds from "./Images/clouds.png";
import sunny from "./Images/sunny.png";
import snowflake from "./Images/snowflake.png";
import umbrella from "./Images/umbrella.png";
import aqua from "./Images/aqua.png";
import "./App.css";

var myArr;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "Columbia",
      corrState: "SC",
      weather: "",
      kelTemp: "",
      celTemp: "",
      farTemp: "",
      windSpeed: "",
      cloudiness: "",
      humidty: "",
      statement: "",
      picture: aqua
    };
  }

  cityCallBack = dataFromChild => {
    const [tempcity, tempstate] = dataFromChild.split(", ");
    this.setState({
      city: tempcity,
      corrState: tempstate,
      statement: "You are viewing the weather in " + tempcity,
      picture: aqua
    });

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.state.city +
        "&APPID=df19b8a84cd20bc8dcd22bf143c6959a"
    )
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        var weather = json.weather[0].main;
        var kelTemp = json.main.temp;
        var wind = json.wind.speed;
        var cloud = json.clouds.all;
        var humid = json.main.humidity;

        myArr =
          weather + "," + kelTemp + "," + wind + "," + cloud + "," + humid;

        const [
          tempWeather,
          tempKel,
          tempWind,
          tempCloud,
          tempHumidity
        ] = myArr.split(",");

        this.setState({
          weather: tempWeather,
          kelTemp: tempKel,
          celTemp: tempKel - 273.15 + "° C",
          farTemp: (tempKel - 273.15) * 1.8 + 32 + "° F",
          windSpeed: tempWind + " m/s",
          cloudiness: tempCloud + "%",
          humidty: tempHumidity + "%"
        });
        
        if (this.state.celTemp.length > 5) {
          var temp = this.state.celTemp.slice(0, 6);
          this.setState({
            celTemp: temp + "° C"
          });
        }
        if (this.state.farTemp.length > 5) {
          var temp = this.state.farTemp.slice(0, 6);
          this.setState({
            farTemp: temp + "° F"
          });
        }

        if (
          this.state.weather.match("Rain") ||
          this.state.weather.match("Mist")
        ) {
          this.setState({
            picture: umbrella
          });
        } else if (this.state.weather.match("Clouds")) {
          this.setState({
            picture: clouds
          });
        } else if (this.state.weather.match("Clear")) {
          this.setState({
            picture: sunny
          });
        } else if (this.state.weather.match("Snow")) {
          this.setState({
            picture: snowflake
          });
        } else {
          this.setState({
            picture: aqua
          });
        }
      });
    return { tempcity, tempstate };
  };

  weatherCallBack = dataFromChild => {
    const [
      tempWeather,
      tempKel,
      tempWind,
      tempCloud,
      tempHumidity
    ] = dataFromChild.split(",");

    return { tempWeather, tempKel, tempWind, tempCloud, tempHumidity };
  };

  render() {
    return (
      <div>
        <div
          style={{ alignItems: "center", textAlign: "center", fontSize: 60 }}
        >
          Hows The Weather?
        </div>
        <div
          className="app"
          style={{ alignItems: "center", textAlign: "center", paddingTop: 5 }}
        >
          <InputCity
            text-align="center"
            callbackFromParent={this.cityCallBack}
            callbackFromParent2={this.weatherCallBack}
          />
          <h1>{this.state.statement}</h1>

          <h2>
            <li style={{ alignItems: "center", textAlign: "center" }}>
              Weather: {this.state.weather}
            </li>
            <li>Farenheit Temperature: {this.state.farTemp}</li>
            <li>Celsius Temperature: {this.state.celTemp}</li>
            <li>Wind Speed: {this.state.windSpeed}</li>
            <li>Cloudiness: {this.state.cloudiness}</li>
            <li>Humidity: {this.state.humidty}</li>
          </h2>

          <div>
            <img src={this.state.picture} width={50} height={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
