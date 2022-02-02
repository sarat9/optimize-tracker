import React, { useEffect } from "react";
import useLocalStorageStateless from "../hooks/useLocalStorageStateless";
import ScrollMapLib from ".././lib/ScrollMapLib";

function ScrollMap() {
    const [getScrollTracks, setScrollTracks] = useLocalStorageStateless('scrollTracks')
              
    useEffect(()=>{
        var tracks = JSON.parse(getScrollTracks())
        var data = [200,200,200,200,300,200,300,450,800,700,800,
            900,900,850,1013,
            1100,1100,1100,1100,
            1000,1200,1213,1300,1359, 1400,
             1800];
        // if(tracks){
        //     let pagePath = window.location.href;
        //     data = tracks[pagePath]&&tracks[pagePath].clicks.map(track=>[track.xAxis,track.yAxis])
        // }

        // Converting scrolled heights to values from 0 to n; scrollSplit = n
        let noOfSplits = 4
        let scrollCount = {}

        let initialScreenHeight = window.innerHeight
        let totalScreenHeight = document.body.clientHeight
        let remainingScreenHeight = totalScreenHeight - initialScreenHeight
        data = data.map(scrolled=>{
            // multiplying with no of splits we want and dividing by total height 
            // we get 0, 1, 2, 3 ... n of all values
            if(scrolled <= initialScreenHeight){
                scrollCount[0]=scrollCount[0]?(scrollCount[0]+1):1
                return 0
            }else{
                let value =  Math.floor((noOfSplits*(scrolled-initialScreenHeight))/remainingScreenHeight) + 1
                // adding value count to a map to later on calculate percentage
                scrollCount[value]=scrollCount[value]?(scrollCount[value]+1):1
                return value
            }
        })
        let scrollPercentage = {}
        let bufferScrolls = 0
        Object.keys(scrollCount).reverse().forEach((count)=>{
            // adding each level from last section to first and calculate percentage
            bufferScrolls = bufferScrolls + scrollCount[count]
            if(+count<noOfSplits){
                scrollPercentage[count] = ((bufferScrolls*100)/data.length).toFixed(2)
            }
        })

        //Filling missing percentage values to the scrollPercentage map
        for(let i = noOfSplits-1;i>0;i--){
            if(!scrollPercentage[i]&&i>=noOfSplits-1){
                // if last split and is not defined put 0 percent
                scrollPercentage[i]=0
            }
            else if(!scrollPercentage[i]&&scrollPercentage[i+1]!=undefined){
                // if mid element and is not defined pick the next index value that is next split
                scrollPercentage[i]=scrollPercentage[i+1]
            }
        }

        var canvas = document.getElementById("scrollMapCanvas");
        canvas.width = document.body.clientWidth || window.innerWidth || window.outerWidth;
        canvas.height = document.body.clientHeight || window.innerHeight || window.outerHeight;
        
        var scrollMapGen = new ScrollMapLib('scrollMapCanvas');
        scrollMapGen.fillGrey()

        // lime, cyan, violet, red
        let colors = ['#00ff0035','#00ffff35','#ee82ee82','#ff000054']
        let lastHeight = 0
        // let splitSections = Object.keys(scrollPercentage);
        for(let i = 0;i<noOfSplits;i++){
            let percentage = scrollPercentage[i]
            let message = percentage + '% of your customers scrolled up to here'
            let startHeight
            if(i==0){
                startHeight = 0
                lastHeight = initialScreenHeight
            }else{
                startHeight = lastHeight
                lastHeight = lastHeight + (remainingScreenHeight/noOfSplits)*(i)
            }
            scrollMapGen.addSection(startHeight, colors[i], message)
        }
        

    },[])


  return (
    <>
        <canvas id="scrollMapCanvas" style={{position:'absolute', top: '0px'}}></canvas>
    </>
  );
}

export default ScrollMap;
