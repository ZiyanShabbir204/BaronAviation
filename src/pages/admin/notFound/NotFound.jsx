import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../../../src/lotties/not-found-lotti.json';

export default function NotFound() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div style={{marginTop:"20px"}}>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={600}
          
        />
      </div>
    );
  }