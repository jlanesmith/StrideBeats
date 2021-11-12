
import Pedometer from '@t2tx/react-native-universal-pedometer';
import React, { Component, useEffect, useState } from 'react';

// Should be able call upon the "Pedometer" package and count the steps # of steps for 5 seconds every 5.5 seconds
export const monitorsteps = () =>{
    const [currentPace,setCurrentPace] = useState(0);
      useEffect(() => {
        const interval = setInterval(() =>{
          console.log('DetectBPM');
          setCurrentPace(12*Pedometer.queryPedometerDataBetweenDates(Date.now(),Date.now()+5000));
        }, 5500);
    
        return () => {
          clearInterval(interval);
        }
    
      }, []);
}
