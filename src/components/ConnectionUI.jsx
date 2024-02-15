import React, { useState, useEffect } from 'react';

const ConnectionUI = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="w-full flex justify-center text-white bg-[#f44747]">
      <p>No internet connection. Please check your connection.</p>
    </div>
  );
};

export default ConnectionUI;
