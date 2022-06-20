import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Lottie from 'react-lottie';
import images from '../../constants/images'

import * as animationData from '../../assets/95088-success.json'

const index = () => {

    const route = useRouter()

    const [state, setState] = useState({
        isStopped: false, isPaused: false
    })

    const [timeLeft, setTimeLeft] = useState(10);

    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

      useEffect(() => {
        if(timeLeft===0){
           route.replace('/')
           setTimeLeft(null)
        }
    
        // exit early when we reach 0
        if (!timeLeft) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
    
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);

  return (
    <div className='min-vh-100 bg-light d-flex align-items-center justify-content-center' style={{background: `url(${images.guitarStoreBg.src}) no-repeat`, backgroundSize: '100%'}}>
        <div className="card p-4">
            <div>
                <Lottie options={defaultOptions} width={400} height={400}  isStopped={state.isStopped} isPaused={state.isPaused}/>              
            </div>
            <h1 className='display-1 fw-bold text-uppercase text-success text-center'>
                Thank you!!!
            </h1>
            <h4 className='text-secondary text-center h1 my-5'>
                Payment done Successfully
            </h4>
            <p className='h3 d-flex ms-auto me-auto mb-5' style={{width: '310px', textAlign: 'center'}}>
                You will be redirect to the home page in {timeLeft} seconds or click in the button below to return to home
            </p>
            <button className='btn-success btn btn-lg mt-4' style={{fontSize: '2rem'}}>Home</button>
        </div>
    </div>
  )
}

export default index