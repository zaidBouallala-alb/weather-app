import './App.module.scss';
import React from 'react';
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Wallpaper } from "./components/Wallpaper/Wallpaper";
import { Weather } from "./components/Weather/Weather";
import { Forecast } from "./components/Forecast/Forecast";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { motion } from "framer-motion";

const ErrorDisplay = () => {
    const { error } = useSelector((state) => state.weather)
    return error ? <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert> : null
}

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Wallpaper />
                <motion.div
                    className={'container'}
                    initial={{
                        x: '100vw'
                    }}
                    animate={{
                        x: 0
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut'
                    }}>
                    <SearchBar />
                    <ErrorDisplay />
                    <Weather />
                    <Forecast />
                </motion.div>
            </Provider>
        </div>
    );
}

export default App;
