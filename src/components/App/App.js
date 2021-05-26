import React, { Component } from "react";
import axios from "axios";

import { cities } from "../../utils/cities";

class App extends Component {
  constructor(props) {
    super(props);

    this.apiPath = "https://api.openweathermap.org/data/2.5/weather";
    this.apiLang = "ru";

    this.state = {
      city: "Краснодар",
      newCity: false,
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
      weather: [
        {
          description: null,
          icon: null,
          id: null,
          main: null,
        },
      ],
      wind: {
        deg: null,
        gust: null,
        speed: null,
      },
    };

    this.getResoures(this.state.city);
  }

  async getResoures(city) {
    const res = await axios.get(
      `${this.apiPath}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&lang=${this.apiLang}`
    );
    this.setState((state) => {
      return {
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
        weather: [
          {
            description: res.data.weather.description,
            icon: res.data.weather.icon,
            id: res.data.weather.id,
            main: res.data.weather.main,
          },
        ],
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

  render() {
    return (
      <>
        <h2>{this.state.name}</h2>
        {this.state.newCity ? (
          <form onSubmit={this.updateCity}>
            <input type="text" value={this.state.city} />
            <button>Submit</button>
          </form>
        ) : (
          <ul>
            {cities.map((item) => (
              <li key={item.id} onClick={() => this.readCity(item.city)}>
                {item.city}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default App;
