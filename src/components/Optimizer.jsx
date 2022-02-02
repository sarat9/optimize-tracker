import React, { useEffect } from "react";
import useLocalStorageStateless from "../hooks/useLocalStorageStateless";
import { debounce } from "lodash";

/**
Sample Data Payload Structure
let eventData = {
    page:{
        '/characters/': {
          clicks : [{xAxis:10, yAxis: 10}],
          elements: {div:20},
          classes:{'submit-button':25},
        }
    },
    session: 'uuid'
} 

 */


function Optimizer() {

  const [getMouseTracks, setMouseTracks] = useLocalStorageStateless('mouseTracks')
  const [getScrollTracks, setScrollTracks] = useLocalStorageStateless('scrollTracks')

  let eventData = {}
  let scrollData = {}

  const populateClicksEventData = (event) => {
      event.preventDefault()
      let scrolledheight = window.pageYOffset || window.scrollY
      let mouseClick = {
          xAxis: event.x, yAxis: event.y+scrolledheight
      }
      console.log(mouseClick)
      let pagePath = window.location.href;
      if(!eventData){eventData={}}
      if(!eventData[pagePath]){
        eventData[pagePath] = {}
        eventData[pagePath].clicks = []
      }
      eventData[pagePath].clicks.push(mouseClick);
  }

  const populateScrollsEventData = (event) => {
    event.preventDefault()
    let initialHeight = document.body.clientHeight || window.innerHeight;
    let currentScrolledHeight = window.pageYOffset || window.scrollY || 0
    let pagePath = window.location.href;
    if(!scrollData[pagePath]){
      scrollData[pagePath] = {}
      scrollData[pagePath].scrolls = initialHeight
    }
    scrollData[pagePath].scrolls = Math.max((+initialHeight), +(initialHeight+currentScrolledHeight), +(scrollData[pagePath].scrolls))
}

  const trackClickHeatMap = () => {
    if(getScrollTracks()){
      eventData = JSON.parse(getMouseTracks())
    }
    let mouseDataPersistInterval = setInterval(()=>{
      let bufferEventData = JSON.stringify(eventData);
      setMouseTracks(bufferEventData)
    }, 5000);
    window.addEventListener('click', populateClicksEventData, false);
  }

  
  const trackScrollMap = () => {
    if(!getScrollTracks()){
      getScrollTracks({})
    }
    let scrollDataPersistInterval = setInterval(()=>{
      let bufferScrollData = JSON.stringify(scrollData);
      setScrollTracks(bufferScrollData)
    }, 5000);
    window.addEventListener('scroll', debounce((event)=>{
      populateScrollsEventData(event)
    },1800), false);
  }

  useEffect(()=>{
    trackClickHeatMap()
    trackScrollMap()
  },[])

  useEffect(()=>{
   return ()=>{
     console.log('delete listeners')
   }
  },[])

  

  return (
    <div className="optimizer-class">
        <h2>Optimizer</h2>
    </div>
  );
}

export default Optimizer;
