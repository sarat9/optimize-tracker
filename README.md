# optimize-tracker
Optimize Tracker   
Inbuilt Optimization Tool features without third party add ons

Many third party optimization tools online provide lot of optimization techniques like heatmaps, scrollmaps and funneling. Popular tools include Google analytics, VWO, Optimizaly, etc. The current POC **does not use any of them and is inbuilt.**

The current POC project offers generating **inbuit optimizing features like heatmaps, etc** without using or paying for any thirdparty vendor.
It generates heatmaps etc on basis of your user click data.

Current POC stores user events in local storage for demo. If you want to scale to a realtime project, please use a Database to store the events.

# Current POC features
- Generates HeatMap for Clicks
- Routing through pages gives page level heatmaps
- Uses Local Storage to save click events
- Scrollable Click HeatMap
- Does not use any third party tools like vwo, google analytics, etc..


HeatMap Tracking from user Clicks
<img width="1641" alt="image" src="https://user-images.githubusercontent.com/17333491/152161564-d914445f-d639-4c01-a51e-ca9b47e662e0.png">



# Future AddOns
Need to capture...

Mouse movements
User inputs
Scrolling
Where users clicks
Funneling
Ability to track more than one site
Do not display credit card information for sensitive forms
Record secure http and https pages


# Pattern to make it full pledged optimizer
- Send MouseEvents to DB every 5 min instead of saving it local storage
- Fetch from DB to display heatmaps

# Things to Consider while making it a full pledged app
- How better can we track the mouse events?
- Where do we save the mouse event data after each click before sending to DB?
- What DB is a good choice for a data of x,y axis codes.
- Better way to generate a heatmap
- How do we not accumulate the click events and consume the app memory leading it to crash?
    - At a time interval of every couple of seconds, An event keeps sending data to DB and clears the in-memory is an option.
    - Any better approach?
- What more data can we capture to make it more customizable?
- How to make this not affect the original app performance?
- Routing through Pages
- Handling Screen resolutions

#### Inspired By
- https://github.com/pa7/heatmap.js
- https://github.com/mourner/simpleheat

