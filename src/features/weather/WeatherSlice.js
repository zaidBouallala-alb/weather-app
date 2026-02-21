import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clouds: undefined,
    main: {
        feels_like: undefined
    },
    name: undefined,
    sys: {
        country: undefined
    },
    weather: undefined,
    wind: {
        speed: undefined
    },
    forecast: [],
    error: null,
    loading: false,
    unit: 'metric',
    dataUnit: 'metric',
    isLoaded: false,
    theme: typeof window !== 'undefined' ? (localStorage.getItem('weather-theme') || 'dark') : 'dark',
}

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
            state.error = null
        },
        setData: (state, action) => {
            const { clouds, main, name, sys, weather, wind, forecast, dataUnit } = action.payload
            state.clouds = clouds
            state.main = main
            state.name = name
            state.sys = sys
            state.weather = weather[0]
            state.wind = wind
            state.forecast = forecast
            state.dataUnit = dataUnit
            state.isLoaded = true
            state.loading = false
            state.error = null
        },
        setUnit: (state, action) => {
            state.unit = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
            state.isLoaded = false
        },
        resetData: (state) => {
            state.isLoaded = false
            state.loading = false
            state.error = null
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('weather-theme', state.theme)
        }
    }
})
export const { setLoading, setData, resetData, setUnit, setError, toggleTheme } = WeatherSlice.actions
export default WeatherSlice.reducer