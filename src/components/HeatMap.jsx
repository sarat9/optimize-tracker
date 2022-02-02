import React, { useEffect } from "react";
import useLocalStorageStateless from "../hooks/useLocalStorageStateless";
// import simpleheat from ".././vanilla-js-poc/heatmap";
import HeatMapLib from ".././lib/HeatMapLib";

function HeatMap() {
    const [getMouseTracks, setMouseTracks] = useLocalStorageStateless('mouseTracks')


    useEffect(()=>{
        var tracks = JSON.parse(getMouseTracks())
        // var data = [[38,20,2],[38,690,3],[48,30,2],[200,30,2], [900,60,80]];
        var data = []
        if(tracks){
            let pagePath = window.location.href;
            console.log(tracks[pagePath]);
            data = tracks[pagePath]&&tracks[pagePath].clicks.map(track=>[track.xAxis,track.yAxis])
        }
        
        var canvas = document.getElementById("canvas");
        canvas.width = document.body.clientWidth || window.innerWidth || window.outerWidth;
        canvas.height = document.body.clientHeight || window.innerHeight || window.outerHeight;
        // var heat = simpleheat('canvas');
        var heat = new HeatMapLib('canvas');
        // set data of [[x, y, value], ...] format
        heat.data(data);
        // set point radius and blur radius (25 and 15 by default)
        heat.radius(10, 10);

        // set gradient colors as {<stop>: '<color>'}, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
        // heat.gradient();
        // draw the heatmap with optional minimum point opacity (0.05 by default)
        heat.draw(0);
    },[])


  return (
    <>
        <canvas id="canvas" style={{position:'absolute', top: '0px', left: '0px'}}></canvas>
    </>
  );
}

export default HeatMap;
