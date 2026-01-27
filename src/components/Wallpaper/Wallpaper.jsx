import React from 'react';
import { useSelector } from 'react-redux';
import './Wallpaper.scss';

// Import assets
import clearDay from '../../assets/img/clear_day.jpg';
import clearNight from '../../assets/img/clear_night.jpg';
import cloudy from '../../assets/img/cloudy.jpg';
import rainy from '../../assets/img/rainy.jpg';
import snowy from '../../assets/img/snowy.jpg';
import thunderstorm from '../../assets/img/thunderstorm.jpg';
import defaultWallpaper from '../../assets/img/mountain-landscape-lake-highlands-generative-ai_169016-28871.avif';

export const Wallpaper = () => {
    const { weather, isLoaded } = useSelector((state) => state.weather);

    const getWallpaper = () => {
        if (!isLoaded || !weather) return defaultWallpaper;

        const condition = weather.main.toLowerCase();
        const icon = weather.icon; // e.g., '01d', '01n'
        const isNight = icon.includes('n');

        if (condition.includes('clear')) {
            return isNight ? clearNight : clearDay;
        } else if (condition.includes('cloud')) {
            return cloudy;
        } else if (condition.includes('rain') || condition.includes('drizzle')) {
            return rainy;
        } else if (condition.includes('snow')) {
            return snowy;
        } else if (condition.includes('thunder')) {
            return thunderstorm;
        }

        return defaultWallpaper;
    }

    return (
        <div className={'wallpaper-container position-fixed d-flex top-0 bottom-0 end-0 start-0'}>
            <img className='wallpaper' src={getWallpaper()} alt="Wallpaper" />
        </div>
    )
}