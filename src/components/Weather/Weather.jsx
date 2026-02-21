import styles from './Weather.module.scss'
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import { SEO } from "../SEO/SEO";
import Wind from "../Svgs/Wind";
import { useSelector } from "react-redux";
import SpeedoMeter from "../Svgs/SpeedoMeter";
import Humidity from "../Svgs/Humidity";
import Sunny from "../Svgs/Sunny";
import Cloudy from "../Svgs/Cloudy";
import Thunder from "../Svgs/Thunder";
import Rainy from "../Svgs/Rainy";
import Windy from "../Svgs/Windy";
import { formatFullDateTime, formatTime } from "../../utils/dateFormat";
import { motion, AnimatePresence } from "framer-motion";

// Maps OWM icon codes (first 2 chars) to custom SVG components
const ICON_SIZE = { width: '120px', height: '120px' };
const ICON_MAP = {
    '01': Sunny,        // clear sky
    '02': Cloudy,       // few clouds
    '03': Cloudy,       // scattered clouds
    '04': Cloudy,       // broken clouds
    '09': Rainy,        // shower rain
    '10': Rainy,        // rain
    '11': Thunder,      // thunderstorm
    '13': DefaultWeather, // snow (reuse default until a Snow SVG is added)
    '50': Windy,        // mist / fog
};

const WeatherIcon = ({ iconCode }) => {
    const code = iconCode?.substring(0, 2);
    const IconComponent = ICON_MAP[code] || DefaultWeather;
    return <IconComponent {...ICON_SIZE} />;
};

// Animation variants
const fadeSlide = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.07 } },
};

const fadeItem = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
};

// Skeleton shimmer for loading state
const WeatherSkeleton = () => (
    <motion.div
        className={`${styles.container} glass-panel`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
    >
        <div className={styles.skeletonHeader}>
            <div className={styles.skeletonLine} style={{ width: '60%', height: '2rem' }} />
            <div className={styles.skeletonLine} style={{ width: '40%', height: '1rem' }} />
        </div>
        <div className={styles.skeletonMain}>
            <div className={styles.skeletonCircle} />
            <div className={styles.skeletonLine} style={{ width: '120px', height: '4rem' }} />
        </div>
        <div className={styles.skeletonLine} style={{ width: '30%', height: '1.2rem', margin: '0 auto' }} />
        <div className={styles.skeletonGrid}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={styles.skeletonGridItem}>
                    <div className={styles.skeletonCircleSm} />
                    <div className={styles.skeletonLine} style={{ width: '100%', height: '0.7rem' }} />
                    <div className={styles.skeletonLine} style={{ width: '60%', height: '1rem' }} />
                </div>
            ))}
        </div>
    </motion.div>
);

export const Weather = () => {
    const weather = useSelector((state) => state.weather)

    return (
        <AnimatePresence mode="wait">
            {weather.loading ? (
                <WeatherSkeleton key="skeleton" />
            ) : (
                <motion.div
                    key={weather.isLoaded ? `weather-${weather.name}` : 'empty'}
                    className={`${styles.container} glass-panel`}
                    variants={fadeSlide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    {weather.isLoaded ? (
                        <>
                            <SEO
                                title={`Weather in ${weather.name} - ${weather.weather?.main}`}
                                description={`Current weather in ${weather.name}, ${weather.sys.country}: ${weather.weather?.description}. Temperature: ${Math.round(weather.main.feels_like)}°${weather.dataUnit === 'metric' ? 'C' : 'F'}.`}
                                name="Weather App"
                                type="website"
                            />
                            <script type="application/ld+json">
                                {JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "WeatherForecast",
                                    "name": `Weather in ${weather.name}`,
                                    "validFrom": new Date().toISOString(),
                                    "location": {
                                        "@type": "Place",
                                        "name": weather.name,
                                        "address": {
                                            "@type": "PostalAddress",
                                            "addressCountry": weather.sys.country
                                        }
                                    },
                                })}
                            </script>

                            <motion.header
                                className={styles.header}
                                variants={fadeItem}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <h1>
                                        {weather.name}, {weather.sys.country}
                                        <PositionSvg color={'var(--accent)'} width="24px" height="24px" />
                                    </h1>
                                    <div className={styles.date}>
                                        <div>{formatFullDateTime()}</div>
                                    </div>
                                </div>
                            </motion.header>

                            <section className={styles.mainWeather} aria-label="Current Weather">
                                <motion.div
                                    className={styles.iconContainer}
                                    role="img"
                                    aria-label={weather.weather?.description || "Current weather icon"}
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                                >
                                    <WeatherIcon iconCode={weather.weather?.icon} />
                                </motion.div>
                                <motion.div
                                    className={styles.temperature}
                                    aria-label={`Current temperature: ${Math.round(weather.main.feels_like)} degrees ${weather.dataUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.35, delay: 0.15 }}
                                >
                                    {Math.round(weather.main.feels_like)}
                                    <span aria-hidden="true">{weather.dataUnit === 'metric' ? '°C' : '°F'}</span>
                                </motion.div>
                            </section>

                            <motion.div
                                className={styles.message}
                                variants={fadeItem}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                {weather.weather?.main || "Clear Sky"}
                            </motion.div>

                            <motion.div
                                className={styles.detailsGrid}
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <motion.div className={styles.detailItem} variants={fadeItem}>
                                    <DefaultWeather color={'var(--text-secondary)'} width="24px" height="24px" />
                                    <span className={styles.label}>Sunrise</span>
                                    <span className={styles.value}>
                                        {formatTime(weather.sys.sunrise)}
                                    </span>
                                </motion.div>
                                <motion.div className={styles.detailItem} variants={fadeItem}>
                                    <Wind color={'var(--text-secondary)'} width="24px" height="24px" />
                                    <span className={styles.label}>Wind</span>
                                    <span className={styles.value}>
                                        {weather.wind.speed} {weather.dataUnit === 'metric' ? 'm/s' : 'mph'}
                                    </span>
                                </motion.div>
                                <motion.div className={styles.detailItem} variants={fadeItem}>
                                    <SpeedoMeter color={'var(--text-secondary)'} width="24px" height="24px" />
                                    <span className={styles.label}>Pressure</span>
                                    <span className={styles.value}>{weather.main.pressure} hPa</span>
                                </motion.div>
                                <motion.div className={styles.detailItem} variants={fadeItem}>
                                    <Humidity color={'var(--text-secondary)'} width="24px" height="24px" />
                                    <span className={styles.label}>Humidity</span>
                                    <span className={styles.value}>{weather.main.humidity}%</span>
                                </motion.div>
                                <motion.div className={styles.detailItem} variants={fadeItem}>
                                    <Thermometer color={'var(--text-secondary)'} width="24px" height="24px" />
                                    <span className={styles.label}>Max</span>
                                    <span className={styles.value}>
                                        {Math.round(weather.main.temp_max)}°
                                    </span>
                                </motion.div>
                            </motion.div>
                        </>
                    ) : (
                        <div className={styles.message}>
                            Please search for a city to see the weather.
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
