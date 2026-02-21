import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/weather/WeatherSlice';
import Sunny from '../Svgs/Sunny';
import Moon from '../Svgs/Moon';
import { IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.weather);

    return (
        <IconButton
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            sx={{
                width: 44,
                height: 44,
                p: 1,
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                bgcolor: 'var(--surface)',
                border: '1px solid var(--surface-border)',
                transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease',
                '&:hover': {
                    bgcolor: 'var(--surface-hover)',
                    borderColor: 'var(--accent)',
                    transform: 'scale(1.08)',
                },
                '&:focus-visible': {
                    outline: 'none',
                    boxShadow: 'var(--focus-ring)',
                },
            }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                    <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{ display: 'flex' }}
                    >
                        <Sunny width="24px" height="24px" color="var(--accent-secondary)" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{ display: 'flex' }}
                    >
                        <Moon width="24px" height="24px" color="var(--text-primary)" />
                    </motion.span>
                )}
            </AnimatePresence>
        </IconButton>
    );
};

export default ThemeToggle;
