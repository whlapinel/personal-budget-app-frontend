'use client'

// context/SessionContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { SessionContextType, User } from '@/app/lib/data/definitions';
import { refreshToken } from './lib/data/auth';


let SessionContext = createContext<SessionContextType>({
  user: null,
  setUser: () => { } // default value for setUser
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  // const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);

  function getSecondsLeft() {
    return Math.round((user?.expiration! - Date.now()) / 1000);
  }

  function signOut() {
    alert('You have been logged out.');
    setIsActive(false)
    setAlertShown(false)
    setUser(null)
  }

  function onInactive(){
    setIsActive(false)
    console.log('User is inactive');
    if (!confirm('You will be logged out in 20 seconds due to inactivity. Do you wish to remain signed in?')) {
      setTimeout(()=> {
        signOut();
      }, 20000)
    } else {
      console.log('user chose to remain signed in. Refreshing token...')
      refreshToken();
      // call refresh token action
    }
  }


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function resetTimeout() {
      console.log("user active, resetting timeout");
      setIsActive(true)
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        onInactive();
      }, 40000); // 40 seconds of inactivity
    };

    // Define user activities to monitor
    const events = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      console.log("adding event listener: " + event);
      window.addEventListener(event, resetTimeout);
    });

    resetTimeout(); // Initialize the activity check

    return () => {
      clearTimeout(timeoutId); // Clean up on component unmount
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [user?.expiration]);

  useEffect(() => {
    // check every second
    const interval = setInterval(() => {
      if (user) {
        const secondsLeft = getSecondsLeft();
        console.log('SessionProvider setInterval running! user:', user);
        console.log('Seconds left: ' + secondsLeft);
        if (secondsLeft <= 0) {
          signOut()
        }
        if (secondsLeft < 10 && isActive) {
          console.log('User is active and 10 seconds remain. Refreshing token...')
          refreshToken();
        }
      }
      // if user is active and 20 seconds remain before expiration, alert user
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
