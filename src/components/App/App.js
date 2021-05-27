import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import { cities } from "../../utils/cities";

import { FaLocationArrow } from "react-icons/fa";

class App extends Component {
  constructor(props) {
    super(props);

    this.apiPath = "https://api.openweathermap.org/data/2.5/weather";
    this.apiLang = "ru";

    this.state = {
      celsius: true,
      fahrenheit: false,
      localCity: "",
      localCityBool: false,
      city: "Краснодар",
      newCity: false,
      changeCityBtn: false,

      // data api
      base: null,
      clouds: {
        all: null,
      },
      coord: {
        lat: null,
        lon: null,
      },
      dt: null,
      id: null,
      main: {
        feels_like: null,
        grnd_level: null,
        humidity: null,
        pressure: null,
        sea_level: null,
        temp: null,
        temp_max: null,
        temp_min: null,
      },
      name: null,
      sys: {
        country: null,
        id: null,
        sunrise: null,
        sunset: null,
        type: null,
      },
      timezone: null,
      visibility: null,
      weather: {
        description: null,
        icon: null,
        id: null,
        main: null,
      },
      wind: {
        deg: null,
        gust: null,
        speed: null,
      },
    };

    this.getResoures(this.state.city);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const res = await axios.get(
          `${this.apiPath}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_API_KEY}&lang=${this.apiLang}`
        );
        console.log(res.data.name);
        this.setState((state) => {
          return {
            ...state,
            localCity: res.data.name,
          };
        });
      },
      (err) => console.log(err)
    );
  }

  async getResoures(city) {
    const res = await axios.get(
      `${this.apiPath}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&lang=${this.apiLang}`
    );
    this.setState((state) => {
      return {
        ...state,
        base: res.data.base,
        clouds: {
          all: res.data.clouds.all,
        },
        coord: {
          lat: res.data.coord.lat,
          lon: res.data.coord.lon,
        },
        dt: res.data.dt,
        id: res.data.id,
        main: {
          feels_like: res.data.main.feels_like,
          grnd_level: res.data.main.grnd_level,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          sea_level: res.data.main.sea_level,
          temp: res.data.main.temp,
          temp_max: res.data.main.temp_max,
          temp_min: res.data.main.temp_min,
        },
        name: res.data.name,
        sys: {
          country: res.data.sys.country,
          id: res.data.sys.id,
          sunrise: res.data.sys.sunrise,
          sunset: res.data.sys.sunset,
          type: res.data.sys.type,
        },
        timezone: res.data.timezone,
        visibility: res.data.visibility,
        weather: {
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          id: res.data.weather[0].id,
          main: res.data.weather[0].main,
        },
        wind: {
          deg: res.data.wind.deg,
          gust: res.data.wind.gust,
          speed: res.data.wind.speed,
        },
      };
    });
  }

  newCityWeather = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  readCity = (city) => {
    const idx = cities.findIndex((el) => el.city === city);

    this.setState((state) => {
      return {
        city: cities[idx].city,
        newCity: !state.newCity,
      };
    });
  };

  updateCity = (e) => {
    e.preventDefault();
    this.getResoures(this.state.city);
    this.setState((state) => {
      return {
        newCity: !state.newCity,
      };
    });
  };

  changedWeatherCityToLocal = () => {
    this.setState((state) => {
      return {
        city: state.localCity,
        localCityBool: !state.localCityBool,
        newCity: !state.newCity,
      };
    });
    this.getResoures(this.state.city);
  };

  addActive = () => {
    this.setState((state) => {
      return {
        celsius: !state.celsius,
        fahrenheit: !state.fahrenheit,
      };
    });
  };

  render() {
    return (
      <>
        <div className="box-city">
          <p className="city-name">{this.state.name}</p>
          <div className="btn-group">
            <input
              className="change-city"
              type="button"
              value="Сменить город"
            />
            <FaLocationArrow className="icon-location" />
            <input
              className="local-city"
              type="button"
              value="Мое местоположение"
              onClick={this.changedWeatherCityToLocal}
            />
          </div>
        </div>

        <div className="box-check-degrees">
          <div className="degree-icon">&deg;</div>
          {this.state.celsius && !this.state.fahrenheit ? (
            <>
              <div className="celsius active">C</div>
              <div className="fahrenheit" onClick={this.addActive}>
                F
              </div>
            </>
          ) : (
            <>
              <div className="celsius" onClick={this.addActive}>
                C
              </div>
              <div className="fahrenheit active">F</div>
            </>
          )}
        </div>

        {this.state.newCity ? (
          <form onSubmit={this.updateCity}>
            <input type="text" value={this.state.city} />
            <button>Submit</button>
          </form>
        ) : (
          <ul className="list-city">
            {cities.map((item) => (
              <li
                className="list-city-item"
                key={item.id}
                onClick={() => this.readCity(item.city)}
              >
                {item.city}
              </li>
            ))}
          </ul>
        )}

        <div className="box-weather">
          <p className="degrees">
            {this.state.celsius && !this.state.fahrenheit
              ? Math.floor(this.state.main.temp - 273.15)
              : Math.floor(((this.state.main.temp - 273.15) * 9) / 5 + 32)}
            &deg;
          </p>
          <p className="weather-description">
            {this.state.weather.description}
          </p>
        </div>

        <div className="list-city-info-weather">
          <ul>
            <li>
              <p className="title">Ветер</p>
              <p className="description">
                {Math.floor(this.state.wind.speed)} м/с, западный
              </p>
            </li>
            <li>
              <p className="title">Давление</p>
              <p className="description">
                {Math.floor((this.state.main.pressure / 133) * 100)} мм рт.ст.
              </p>
            </li>
            <li>
              <p className="title">Влажность</p>
              <p className="description">
                {Math.floor(this.state.main.humidity)}%
              </p>
            </li>
            <li>
              <p className="title">Вероятность дождя</p>
              <p className="description">
                {Math.floor(100 - this.state.clouds.all)}%
              </p>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default App;
