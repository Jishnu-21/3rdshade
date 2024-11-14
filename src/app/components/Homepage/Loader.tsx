import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <p className='text-4xl font-bold'>Loading...</p>
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, transition: { delay: 1, duration: 0.4 } }}
                exit={{ opacity: 1 }}
            ></motion.div>  
        </AnimatePresence>
    </div>
  )
}

export default Loader