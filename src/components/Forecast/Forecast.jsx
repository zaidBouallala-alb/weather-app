import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styles from './Forecast.module.scss';
import { formatWeekday } from '../../utils/dateFormat';

const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.08,
            duration: 0.3,
            ease: 'easeOut',
        },
    }),
};

export const Forecast = () => {
    const { forecast, isLoaded } = useSelector((state) => state.weather);

    if (!isLoaded || !forecast) return null;

    // Helper to get daily forecast (API returns 3-hour intervals)
    const dailyForecast = forecast.filter((reading) => reading.dt_txt.includes("12:00:00"));

    return (
        <div className={styles.forecastContainer} role="list" aria-label="5-day forecast">
            {dailyForecast.map((day, index) => (
                <motion.article
                    key={day.dt}
                    className={`${styles.forecastCard} glass-panel`}
                    role="listitem"
                    tabIndex="0"
                    aria-label={`Forecast for ${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}: ${day.weather[0].main}, ${Math.round(day.main.temp)} degrees`}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className={styles.day} aria-hidden="true">
                        {formatWeekday(day.dt_txt)}
                    </div>
                    <img
                        className={styles.icon}
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        width="50"
                        height="50"
                    />
                    <div className={styles.temp} aria-hidden="true">
                        {Math.round(day.main.temp)}°
                    </div>
                    <div className={styles.desc} aria-hidden="true">
                        {day.weather[0].main}
                    </div>
                </motion.article>
            ))}
        </div>
    );
};
