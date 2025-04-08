document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('weatherForm');
  const cityInput = document.getElementById('cityInput');
  const loader = document.getElementById('loader');
  const errorDiv = document.getElementById('errorMessage');
  const weatherCard = document.getElementById('weatherCard');
  const cityName = document.getElementById('cityName');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    // UI reset
    weatherCard.style.display = 'none';
    errorDiv.style.display = 'none';
    loader.style.display = 'block';

    const apiKey = 'b6907d289e10d714a6e88b30761fae22'; // Demo Key
    const url = `https://openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('City not found');
        return res.json();
      })
      .then(data => {
        loader.style.display = 'none';
        weatherCard.style.display = 'block';

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `🌡️ Temperature: ${data.main.temp} °C`;
        description.textContent = `🌥️ Condition: ${data.weather[0].description}`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `🌬️ Wind: ${data.wind.speed} m/s`;
      })
      .catch(err => {
        loader.style.display = 'none';
        errorDiv.textContent = 'Error: City not found or API error.';
        errorDiv.style.display = 'block';
      });
  });
});