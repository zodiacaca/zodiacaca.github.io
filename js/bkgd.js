(function() {

// gradients
var gradients = [
    { start: { r: 35, g: 166, b: 213 }, stop: { r: 231, g: 60, b: 126 } },
    { start: { r: 133, g: 196, b: 170 }, stop: { r: 170, g: 196, b: 133 } },
    { start: { r: 231, g: 60, b: 126 }, stop: { r: 35, g: 166, b: 213 } }
];
    
// transition control variables
var current_gradient = { start: { r: 0, g: 0, b: 0 }, stop: { r: 0, g: 0, b: 0 } };
var gradient_indexes = { current: 0, next: 1 };
var current_time = 0;
var next_change_time = 0;
var current_changing_start = 0;
var change_interval = 3000;
    
// browser prefixes
var prefixes = ["-webkit-","-moz-","-o-","-ms-",""];

    
function getColorDelta(pos, chan, d) {
    
    d = d / change_interval;
    var different = gradients[gradient_indexes["next"]][pos][chan] - gradients[gradient_indexes["current"]][pos][chan];
    d = d * different;
    d = Math.round(d);
    
    return d;
}

function getGradientIndexes() {

    for (var index in gradient_indexes) {
        if (gradient_indexes[index] === gradients.length - 1) {
            gradient_indexes[index] = 0;
        }
        else {
            gradient_indexes[index] += 1;
        }
    }
    
}

function getColor() {
    
    var time = new Date();
    current_time = time.getTime();
    if (current_time >= next_change_time) {
        next_change_time = current_time + change_interval;
        current_changing_start = current_time;
        getGradientIndexes();
    }
    
    var delta = (current_time - current_changing_start);
    
//    console.log(delta);
 
    for (var position in current_gradient) {
        for (var channel in current_gradient[position]) {
            current_gradient[position][channel] = gradients[gradient_indexes["current"]][position][channel] + getColorDelta(position, channel, delta);
        }
    }

}

function updateGradient() {
    
    getColor();
    var color1 = "rgba("+current_gradient["start"]["r"]+","+current_gradient["start"]["g"]+","+current_gradient["start"]["b"]+",1)";
    var color2 = "rgba("+current_gradient["stop"]["r"]+","+current_gradient["stop"]["g"]+","+current_gradient["stop"]["b"]+",1)";
    document.body.style.background = "-webkit-gradient(linear, left bottom, right top, from("+color1+"), to("+color2+"))";
    for (var i = 0; i < 4; i++) {
      document.body.style.background = prefixes[i]+"linear-gradient(45deg, "+color1+", "+color2+")";
    }

    if (true) {
        window.requestAnimationFrame(updateGradient);
    }
}

//window.requestAnimationFrame(updateGradient);
}) ();
