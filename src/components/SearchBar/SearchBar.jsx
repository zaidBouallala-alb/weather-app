import styles from './SearchBar.module.scss'
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData, setData, setUnit, setError } from "../../features/weather/WeatherSlice";
import PositionSvg from "../Svgs/PositionSvg";

export const SearchBar = () => {
    const dispatch = useDispatch()
    const { unit } = useSelector((state) => state.weather)
    const [cities, setCities] = useState([])
    const [geoLocation, setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setIsCurrentLocation] = useState(false)
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
            try {
                // Call our new serverless backend
                const response = await fetch(`/api/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=${unit}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data from server')
                }

                const data = await response.json()
                const { weather: weatherJson, forecast: forecastJson } = data

                const { clouds, main, name, sys, weather, wind } = weatherJson
                const forecast = forecastJson.list

                dispatch(setData({
                    clouds,
                    main,
                    name,
                    sys,
                    weather,
                    wind,
                    forecast,
                    dataUnit: unit
                }))
            } catch (error) {
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

    const handleInputChange = async (e) => {
        const { value } = e.currentTarget
        if (!value || value.trim().length < 2) {
            setCities([])
            return
        }

        try {
            // Call our new serverless backend
            const response = await fetch(`/api/geo?text=${value}`)
            if (!response.ok) {
                throw new Error('Geocoding API failed')
            }
            const json = await response.json()
            setCities(json.results?.map(data => {
                const { lat, lon, city, country, formatted } = data
                return { lat, lon, city, country, formatted }
            }) || [])
        } catch (error) {
            console.warn('City autocomplete failed:', error.message)
            setCities([]) // Clear suggestions on error
        }
    }
    const handleAutocompleteSelect = (e, value) => {
        if (value !== null) {
            const { lon, lat } = value
            setIsCurrentLocation(false)
            setGeoLocation({
                lon,
                lat,
            })

        } else {
            dispatch(resetData())
        }

    }
    return (
        <>
            <div
                className={styles.searchContainer}>
                <Autocomplete className={styles.searchInput}
                    clearOnBlur={false}
                    onChange={handleAutocompleteSelect}
                    getOptionLabel={(option) => option.formatted}
                    renderInput={(params) =>
                        <TextField onChange={handleInputChange} {...params}
                            label={'Enter your city ...'} />}
                    isOptionEqualToValue={(option, value) => option.city === value.city && option.lat === value.lat && option.lon === value.lon}
                    options={cities || []} />

                <Button disabled={geoLocation === undefined || isCurrentLocation === true} variant="contained"
                    onClick={() => getGeoLocation()}><PositionSvg color={'#fff'} /></Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch(setUnit(unit === 'metric' ? 'imperial' : 'metric'))}>
                    {unit === 'metric' ? '°F' : '°C'}
                </Button>
            </div>
        </>
    )
}