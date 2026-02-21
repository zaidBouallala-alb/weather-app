import styles from './SearchBar.module.scss'
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData, setData, setUnit, setError, setLoading } from "../../features/weather/WeatherSlice";
import { fetchWeather } from "../../services/weatherApi";
import { searchCities } from "../../services/geocodingApi";
import PositionSvg from "../Svgs/PositionSvg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const DEBOUNCE_MS = 350;

// Shared sx for glassmorphism icon buttons — replaces all !important SCSS overrides
const iconButtonSx = {
    width: 44,
    height: 44,
    minWidth: 44,
    p: 0,
    borderRadius: 'var(--radius-full)',
    color: 'var(--text-primary)',
    bgcolor: 'transparent',
    border: '1px solid var(--surface-border)',
    transition: 'all var(--transition-fast)',
    '&:hover': {
        bgcolor: 'var(--surface-hover)',
        borderColor: 'var(--accent)',
        transform: 'scale(1.08)',
    },
    '&:focus-visible': {
        outline: 'none',
        boxShadow: 'var(--focus-ring)',
    },
    '&.Mui-disabled': {
        opacity: 0.4,
        color: 'var(--text-tertiary)',
    },
};

export const SearchBar = () => {
    const dispatch = useDispatch()
    const { unit } = useSelector((state) => state.weather)
    const [cities, setCities] = useState([])
    const [geoLocation, setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setIsCurrentLocation] = useState(false)
    const debounceRef = useRef(null)

    const getGeoLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setIsCurrentLocation(true)
            setGeoLocation({
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            })
        }, (error) => {
            console.warn('Geolocation error:', error)
            if (error.code === error.PERMISSION_DENIED) {
                dispatch(setError("Location permission denied. Please enable it in your browser settings or search for a city."))
            } else {
                dispatch(setError("Unable to retrieve location."))
            }
        })
    }, [dispatch])

    const getData = useCallback(async () => {
        if (geoLocation) {
            dispatch(setLoading())
            try {
                const { lat, lon } = geoLocation
                const { weather, forecast } = await fetchWeather(lat, lon, unit)

                const { clouds, main, name, sys, weather: weatherArr, wind } = weather
                dispatch(setData({
                    clouds,
                    main,
                    name,
                    sys,
                    weather: weatherArr,
                    wind,
                    forecast,
                    dataUnit: unit
                }))
            } catch (error) {
                console.error(error);
                dispatch(setError(error.message))
            }
        }
    }, [geoLocation, unit, dispatch])

    useEffect(() => {
        getGeoLocation()
    }, [getGeoLocation]);

    useEffect(() => {
        getData()
    }, [getData]);

    const handleInputChange = (e) => {
        const { value } = e.currentTarget
        clearTimeout(debounceRef.current)

        if (!value || value.trim().length < 2) {
            setCities([])
            return
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const results = await searchCities(value)
                setCities(results)
            } catch (error) {
                console.warn('City autocomplete failed:', error.message)
                setCities([])
            }
        }, DEBOUNCE_MS)
    }

    // Clean up debounce timer on unmount
    useEffect(() => {
        return () => clearTimeout(debounceRef.current)
    }, [])

    const handleAutocompleteSelect = (e, value) => {
        if (value !== null) {
            const { lon, lat } = value
            setIsCurrentLocation(false)
            setGeoLocation({ lon, lat })
        } else {
            dispatch(resetData())
        }
    }

    return (
        <div className={`${styles.searchContainer} glass-panel`}>
            <Autocomplete
                className={styles.searchInput}
                fullWidth
                freeSolo
                disableClearable
                onChange={handleAutocompleteSelect}
                getOptionLabel={(option) => option.formatted || ""}
                options={cities || []}
                isOptionEqualToValue={(option, value) => option.city === value.city}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search city..."
                        variant="standard"
                        onChange={handleInputChange}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            style: { color: 'var(--text-primary)', fontSize: 'var(--text-lg)' },
                            'aria-label': 'Search for a city'
                        }}
                    />
                )}
                PaperComponent={({ children }) => (
                    <div style={{
                        background: 'var(--surface-hover)',
                        backdropFilter: 'var(--backdrop-blur)',
                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--surface-border)',
                        boxShadow: 'var(--shadow)',
                        marginTop: 'var(--space-sm)'
                    }}>
                        {children}
                    </div>
                )}
            />

            <IconButton
                sx={iconButtonSx}
                disabled={geoLocation === undefined || isCurrentLocation === true}
                onClick={() => getGeoLocation()}
                aria-label="Get current location"
            >
                <PositionSvg color={'currentColor'} width="20px" height="20px" />
            </IconButton>

            <IconButton
                sx={{ ...iconButtonSx, fontSize: '1rem', fontWeight: 'bold' }}
                onClick={() => dispatch(setUnit(unit === 'metric' ? 'imperial' : 'metric'))}
                aria-label={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
            >
                {unit === 'metric' ? '°C' : '°F'}
            </IconButton>
            <ThemeToggle />
        </div>
    )
}