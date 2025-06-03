import React, { useState, useEffect } from 'react';

// Simple Router Implementation
export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handlePopstate = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);
  
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };
  
  return { currentPath, navigate };
};
