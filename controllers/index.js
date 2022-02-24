const theNewsKey = "VE3YdSorNVS6l0t1lFyXdBGF6FxZJmwCfD0YOps7";
const mediastackKey = "abadfc35a0d80de67a5f774feeda27e3";
const openWeather = "bba303e82b6a1f3fef96dc94456ac8f1"
const axios = require("axios");

class Controller {
  static async getTopNews(req, res, next) { // from THE NEWS API
    try {
      // const { localeId } = req.params;
      let locale = "id";

      // if (localeId) {
      //   locale = localeId;
      // }
      // console.log(`https://api.thenewsapi.com/v1/news/top/1.1?api_token=${theNewsKey}&locale=${locale}`);
      const { data } = await axios.get(
        `https://api.thenewsapi.com/v1/news/top/1.1?api_token=${theNewsKey}&locale=${locale}`
      );

      res.status(200).json(data.data);
    } catch (error) {
      console.log(error, `masuk`);
      next(error);
    }
  }

  static async getMediastackNews(req, res, next) { // from MEDIASTACK
    try {
      const { localeId } = req.params;
      let locale = "id";

      if (localeId) {
        locale = localeId;
      }

      const { data } = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${mediastackKey}&countries=${locale}`
      );

      res.status(200).json(data.data);
    } catch (error) {
      next(error);
    }
  }

  static async getWeathers(req, res, next) { // from Open Weather
    try {
      const { lat, lon } = req.query;
      let locale = "id";

      const { data } = await axios.get(
        `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeather}`
      );// only get 1

      res.status(200).json(data.data);
    } catch (error) {
      next(error);
    }
  }

  static async getCovidData(req, res, next) {
    try {
      // const { localeId } = req.params;
      // let locale = "id";

      // if (localeId) {
      //   locale = localeId;
      // }
      const { data } = await axios.get(
        `https://data.covid19.go.id/public/api/prov.json`
        );
        
      console.log(data, `masuk`);
      res.status(200).json(data.list_data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller