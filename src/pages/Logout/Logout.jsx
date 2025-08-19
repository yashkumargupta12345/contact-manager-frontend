import React, { useEffect, useState } from 'react';

const Logout = () => {
  const [logoutStatus, setLogoutStatus] = useState('logging_out');

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Clear any stored tokens/user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.clear();
        
        // Optional: Call logout endpoint if your API has one
        // const response = await fetch('http://localhost:4000/user/logout', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' }
        // });
        
        setLogoutStatus('success');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        
      } catch (error) {
        setLogoutStatus('error');
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="logout-page">
      {logoutStatus === 'logging_out' && (
        <div>
          <h2>Logging out...</h2>
          <p>Please wait while we log you out securely.</p>
        </div>
      )}
      
      {logoutStatus === 'success' && (
        <div>
          <h2>Logged out successfully!</h2>
          <p>You have been logged out. Redirecting to login page...</p>
        </div>
      )}
      
      {logoutStatus === 'error' && (
        <div>
          <h2>Logout Error</h2>
          <p>There was an error logging you out. Please try again.</p>
          <button onClick={() => window.location.href = '/login'}>
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
