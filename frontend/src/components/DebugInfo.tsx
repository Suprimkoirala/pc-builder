import React from 'react';

const DebugInfo: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded z-50">
      <h3>Debug Info</h3>
      <p>Frontend is working!</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default DebugInfo; 