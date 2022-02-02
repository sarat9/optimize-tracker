import React, { useEffect } from "react";
import useLocalStorageStateless from "../hooks/useLocalStorageStateless";
// import simpleheat from ".././vanilla-js-poc/heatmap";
import ScrollMapLib from ".././lib/ScrollMapLib";

function ScrollMap() {
    const [getScrollTracks, setScrollTracks] = useLocalStorageStateless('scrollTracks')

    const calculatePercentageOfNum = (num, per) =>
    {
      return (num/100)*per;
    }
              
    useEffect(()=>{
        var tracks = JSON.parse(getScrollTracks())
        var data = [200,200,200,200,300,200,300,450,800,700,800,1000,1800];
        // if(tracks){
        //     let pagePath = window.location.href;
        //     data = tracks[pagePath]&&tracks[pagePath].clicks.map(track=>[track.xAxis,track.yAxis])
        // }

        // Converting scrolled heights to values from 0 to n; scrollSplit = n
        let scrollSplit = 4
        let scrollCount = {}
        console.log(data)

        data = data.map(scrolled=>{
            // multiplying with no of splits we want and dividing by total height 
            // we get 0, 1, 2, 3 ... n of all values
            let value =  Math.floor((scrollSplit*scrolled)/document.body.clientHeight)
            // adding value count to a map to later on calculate percentage
            scrollCount[value]=scrollCount[value]?(scrollCount[value]+1):1
            return value
        })
        let scrollPercentage = {}
        let bufferScrolls = 0
        Object.keys(scrollCount).reverse().forEach(count=>{
            // adding each level from last section to first and calculate percentage
            bufferScrolls = bufferScrolls + scrollCount[count]
            if(+count<scrollSplit){
                scrollPercentage[count] = ((bufferScrolls*100)/data.length)
            }
        })

        console.log(data)
        console.log(scrollCount)
        console.log(scrollPercentage)

        var canvas = document.getElementById("scrollMapCanvas");
        canvas.width = document.body.clientWidth || window.innerWidth || window.outerWidth;
        canvas.height = document.body.clientHeight || window.innerHeight || window.outerHeight;
        
        var scrollMapGen = new ScrollMapLib('scrollMapCanvas');
        scrollMapGen.fillGrey()
        // Object.keys(scrollPercentage).sort().forEach((key)=>{
        //     let percentage = scrollPercentage[key]
        //     let sectionHeight = calculatePercentageOfNum(percentage,document.body.clientHeight)
        //     let message = percentage + '% of your customers scrolled up to here'
        //     scrollMapGen.addSection(0,sectionHeight, 'lime', message)
        // })

        let colors = ['lime','red','cyan','yellow']
        let lastHeight = 0
        for(let i = 0;i<=scrollSplit;i++){
            let percentage = scrollPercentage[i]
            let message = percentage + '% of your customers scrolled up to here'
            let startHeight
            if(i==0){
                startHeight = 0
                lastHeight = window.outerHeight
            }else{
                startHeight = (document.body.clientHeight/scrollSplit)*(i+1)
            }
            console.log('scrollSplit',i)
            console.log('startHeight',startHeight)
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
