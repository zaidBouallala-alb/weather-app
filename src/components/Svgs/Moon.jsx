import React from 'react';
import { SvgHoc } from "./SvgHoc";
import { motion } from "framer-motion";

function Moon({ width = '25px', height = '25px', color = 'currentColor' }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ rotate: -15, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            />
        </svg>
    );
}

export default SvgHoc(Moon);
