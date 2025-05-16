import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface YouTubePlayerProps {
  defaultVideoId?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ defaultVideoId = 'QGMFzltjygM' }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state when component first mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto relative"
    >
      <div className="card-3d">
        <div className="absolute top-[-30px] left-[-30px] w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-[-20px] right-[-20px] w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
        
        <motion.div 
          className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border-2 border-blue-100 card-3d-content relative z-10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50">
              <div className="w-14 h-14 border-4 border-t-primary border-r-primary/70 border-b-primary/50 border-l-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 text-sm">Loading video...</p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${defaultVideoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-6 flex justify-center space-x-4"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Play
        </span>
        
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
          </svg>
          HD
        </span>
        
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Subtitles
        </span>
      </motion.div>
    </motion.div>
  );
};

export default YouTubePlayer; 