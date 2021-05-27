import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import City from "../City";
import Degrees from "../Degrees";
import InfoWeather from "../InfoWeather";
import ImageWeather from "../ImageWeather";
import Temperature from "../Temperature";
import Description from "../Description";
import Forms from "../Forms";

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

  readCity = (city, cities) => {
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
        changeCityBtn: false,
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

  enterMenu = () => {
    this.setState((state) => {
      return {
        changeCityBtn: !state.changeCityBtn,
      };
    });
  };

  render() {
    const { name, celsius, fahrenheit, weather, main, wind, clouds } =
      this.state;
    const {
      state,
      enterMenu,
      changedWeatherCityToLocal,
      addActive,
      updateCity,
      readCity,
    } = this;

    return (
      <>
        <City
          name={name}
          enterMenu={enterMenu}
          changedWeatherCityToLocal={changedWeatherCityToLocal}
        />

        <Degrees
          celsius={celsius}
          fahrenheit={fahrenheit}
          addActive={addActive}
        />

        <Forms state={state} updateCity={updateCity} readCity={readCity} />

        <div className="box-weather">
          <div className="box-degrees">
            <ImageWeather weather={weather} />
            <Temperature
              celsius={celsius}
              fahrenheit={fahrenheit}
              main={main}
            />
          </div>

          <Description weather={weather} />
        </div>

        <InfoWeather wind={wind} main={main} clouds={clouds} />
      </>
    );
  }
}

export default App;
