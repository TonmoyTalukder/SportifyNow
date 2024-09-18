import React from 'react';
import { motion } from 'framer-motion';

// Define props for AnimatedNode
interface AnimatedNodeProps {
  label: string;
  position: number; // position number for delay in animation
}

const AnimatedNode: React.FC<AnimatedNodeProps> = ({ label, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: position * 0.2 }}
      style={{
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#1A2638',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        margin: '10px',
        height: '25vh',
        width: '18.5vw'
      }}
    >
      {label}
    </motion.div>
  );
};

export default AnimatedNode;
