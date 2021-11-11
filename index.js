const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const weatherKey = API_KEY;

// current weather info.
app.get('/weather/current/:cityName', async (req, res) => {
	try {
		const { cityName } = req.params;
		const fetchRequest = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherKey}`
		);
		const data = await fetchRequest.json();
		res.json(data);
	} catch {
		err => console.log(err);
	}
});

// weather forecast in 3 hrs interval
app.get('/weather/forecast/3hours/:cityName', async (req, res) => {
	try {
		const { cityName } = req.params;
		const fetchRequest = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${weatherKey}`
		);
		const data = await fetchRequest.json();
		res.json(data);
	} catch {
		err => console.log(err);
	}
});

// 5 days weather forecast
app.get('/weather/forecast/5days/:lat/:lng', async (req, res) => {
	try {
		const { lat, lng } = req.params;
		const fetchRequest = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${Number(lat)}&lon=${Number(
				lng
			)}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherKey}`
		);
		const data = await fetchRequest.json();
		res.json(data);
	} catch {
		err => console.log(err);
	}
});

app.listen(process.env.PORT || 5500, () => {
	console.log('server is listening on port 5500...');
});
