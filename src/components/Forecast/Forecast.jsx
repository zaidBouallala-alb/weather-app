import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import styles from './Forecast.module.scss';
import Moment from 'react-moment';

export const Forecast = () => {
    const { forecast, dataUnit, isLoaded } = useSelector((state) => state.weather);

    if (!isLoaded || !forecast) return null;

    // Helper to get daily forecast (API returns 3-hour intervals)
    const dailyForecast = forecast.filter((reading) => reading.dt_txt.includes("12:00:00"));

    return (
        <div className={styles.forecastContainer}>
            {dailyForecast.map((day, index) => (
                <Card key={index} className={styles.forecastCard}>
                    <Card.Body>
                        <Card.Title>
                            <Moment format="ddd">{day.dt_txt}</Moment>
                        </Card.Title>
                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                        <Card.Text>
                            {Math.round(day.main.temp)} {dataUnit === 'metric' ? '°C' : '°F'}
                        </Card.Text>
                        <Card.Text className={styles.description}>
                            {day.weather[0].main}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};
