

function ScrollMapLib(canvas) {

    this._canvas = canvas = document.getElementById(canvas);

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;
    this._scrollData = 0;
}


ScrollMapLib.prototype = {


    intensity: 1, //change to number for intensity
    

    // defaultGradient: {
    //     0.4: 'blue',
    //     0.6: 'cyan',
    //     0.7: 'lime',
    //     0.8: 'yellow',
    //     1.0: 'red'
    // },
    // defaultGradient: { 0.15: "rgb(0,0,255)", 0.45: "rgb(0,255,0)", 0.75: "yellow", 1.0: "rgb(255,0,0)"},
    defaultGradient: { 
        0.15: 'yellow', 0.25: 'yellow', 0.35: 'cyan', 0.45: 'cyan', 0.55: 'lime', 
        0.65: "lime",0.75: "lime",0.85: "lime", 0.95:'red', 1.0: "red"},

    fillGrey: function(){
        this._ctx.fillStyle = "#8080804d";
        this._ctx.fillRect(0, 0, this._width, this._height);
    },

    addSection: function(startHeight, paint, message="Some Percentage"){
        this._ctx.fillStyle = paint;
        this._ctx.fillRect(0, startHeight, this._width,this._height);
        this._ctx.font = "24px Comic Sans MS";
        this._ctx.fillStyle = "black";
        this._ctx.textAlign = "center";
        this._ctx.fillText(message, this._width/2, startHeight+45);
    },

};

export default ScrollMapLib;
