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
    unit: 'metric', // User's preferred unit
    dataUnit: 'metric', // Unit of the currently displayed data
    isLoaded: false,
}

export const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
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
            state.error = null
        },
        setUnit: (state, action) => {
            state.unit = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.isLoaded = false
        },
        resetData: (state) => {
            state.isLoaded = false
            state.error = null
        }
    }
})
export const { setData, resetData, setUnit, setError } = WeatherSlice.actions
export default WeatherSlice.reducer