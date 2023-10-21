import Loader from "./Loader";

function WeatherCard({ weather, loading, errors, capital }) {
  if (loading) return <Loader />;
  if (errors) return <div>weater data can not be found</div>;
  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col col-md-4">
          <p>
            Temperature : <strong>{parseInt(weather.main.temp)} °C</strong>
          </p>
          <p>
            Feels Like : <strong>{parseInt(weather.main.feels_like)} °C</strong>
          </p>
          <p>
            Humidity : <strong>{parseInt(weather.main.humidity)} %</strong>
          </p>
        </div>
        <div className="col col-md-4">
          <img
            className="img-fluid "
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather[0].description}`}
          />
        </div>
      </div>
      <div className="row justify-content-start">
        <p>
          The weather in {capital} is {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
