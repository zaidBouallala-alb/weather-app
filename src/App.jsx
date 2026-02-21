import styles from './App.module.scss';
import React, { useEffect } from 'react';
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Weather } from "./components/Weather/Weather";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Forecast = React.lazy(() => import('./components/Forecast/Forecast').then(module => ({ default: module.Forecast })));

const ErrorDisplay = () => {
    const { error } = useSelector((state) => state.weather)
    return error ? (
        <Alert
            severity="error"
            sx={{
                mt: 2, mb: 2,
                borderRadius: 'var(--radius-md)',
                backdropFilter: 'var(--backdrop-blur)',
                bgcolor: 'var(--error-bg)',
                border: '1px solid var(--error-border)',
                color: 'var(--error-text)',
            }}
        >
            {error}
        </Alert>
    ) : null
}

function App() {
    const { theme } = useSelector((state) => state.weather)

    // #10: Sync theme to document.documentElement so CSS custom properties
    // in :root and [data-theme] respond across the entire page, not just inside the React root.
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className={styles.app} data-theme={theme}>
            <motion.div
                className={styles.mainContainer}
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <SearchBar />
                <ErrorDisplay />
                <div className={styles.dashboardGrid}>
                    <Weather />
                    <React.Suspense fallback={
                        <div className="glass-panel" style={{
                            height: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-secondary)',
                        }}>
                            Loading forecast…
                        </div>
                    }>
                        <Forecast />
                    </React.Suspense>
                </div>
            </motion.div>
        </div>
    );
}

export default App;
