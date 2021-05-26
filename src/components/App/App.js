import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.apiPath = "https://api.openweathermap.org/data/2.5/weather";
    this.apiLang = "ru";

    this.state = {
      city: "Краснодар",
      // data api
      data: {
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
      },
    };

    this.getResoures(this.state.city);
  }

  async getResoures(city) {
    const res = await axios.get(
      `${this.apiPath}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&lang=${this.apiLang}`
    );
    console.log(res.data);
  }

  render() {
    return (
      <div>
        <h1>App</h1>
      </div>
    );
  }
}

export default App;
