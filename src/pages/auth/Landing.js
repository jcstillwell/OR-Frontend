import React from "react";
import "./styles/landing.css"
import { motion } from "framer-motion";

const Landing = () => {

    return (
        <motion.div 
            className="container"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.08}}
        >

            <h3 className="text">All of your receipts.</h3>
            <h3 className="text-mid">One place.</h3>
            <h3 className="text">No email involved.</h3>
        </motion.div>
    )
}

export default Landing;