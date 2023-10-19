function WeatherCard({ weather, loading, errors, capital }) {
  return (
    <div>
      {errors && (
        <p>Sorry, we don't have weather information for this country</p>
      )}
      {!errors && weather && (
        <div>
          <p>
            Right now it is <strong>{parseInt(weather.main.temp)}</strong>{" "}
            degrees in {capital} and {weather.weather[0].description}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather[0].description}`}
          />
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
