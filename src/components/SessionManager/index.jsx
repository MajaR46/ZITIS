import React, { useState, useEffect } from "react";

const SessionManager = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshToken");

  console.log("refreshtoken:" + refreshToken)

  useEffect(() => {
    const tokenExpirationTime = sessionStorage.getItem('expiresAt');
    if (tokenExpirationTime) {
      const expiresIn = tokenExpirationTime - Date.now();
      const notificationTimer = setTimeout(() => {
        setShowNotification(true);
      }, expiresIn - 60000); // Show notification 1 minute before session expiration

      return () => clearTimeout(notificationTimer);
    }
  }, []);

  const prolongSession = async () => {
    try {
      if (refreshToken) {
        const response = await fetch("http://localhost:3001/api/user/token/refreshtoken", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('expiresAt', data.expiresAt);
          console.log("Token refreshed successfully:", data);
          setShowNotification(false);
        } else {
          throw new Error("Token refresh failed");
        }
      } else {
        console.log("No refresh token found.");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <>
      {showNotification && (
        <div>
          <p>Your session will expire soon. Do you want to prolong your session?</p>
          <button onClick={prolongSession}>Prolong Session</button>
        </div>
      )}
      {children}
    </>
  );
};

export default SessionManager;
