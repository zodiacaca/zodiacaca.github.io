
(function() {
  
  var logo = document.getElementById("banner2");
  var rem = parseFloat(getComputedStyle(document.body).fontSize)
  
  var svgNS = "http://www.w3.org/2000/svg";
    
  var width = getComputedStyle(logo).width;
  var height = getComputedStyle(logo).height;
  width = parseFloat(width);
  height = parseFloat(height);
  
  var path = [];
  var keyPoint = [];
  
  
  function svgMove(x, y) {
    return "M " + x + " " + y + " ";
  }
  function svgLine(x, y) {
    return "L " + x + " " + y;
  }
  
  function drawLogo() {
    // keyPoint0
    keyPoint.push({x:width/2, y:0});
    // keyPoint1
    keyPoint.push({x:keyPoint[0].x-width/2, y:keyPoint[0].y+width/2*Math.sqrt(3)});
    // keyPoint2
    keyPoint.push({x:keyPoint[1].x+width/2*0.72, y:keyPoint[1].y});
    // keyPoint3
    keyPoint.push({x:keyPoint[2].x+width/2*0.4, y:keyPoint[2].y-width/2*Math.sqrt(3)*0.4});
    // keyPoint4
    keyPoint.push({x:width/2+width/2*0.1, y:width/2*Math.sqrt(3)});
    // keyPoint5
    keyPoint.push({x:width, y:keyPoint[4].y});
    // keyPoint6
    keyPoint.push({x:keyPoint[5].x-width/2*0.8, y:keyPoint[5].y-width/2*Math.sqrt(3)*0.8});
    // keyPoint7
    keyPoint.push({x:keyPoint[6].x-width/2*0.5, y:keyPoint[6].y+width/2*0.5*Math.sqrt(3)});
    
    // path0
    path.push(document.createElementNS(svgNS,"path"));
    path[0].setAttributeNS(null,"d",
      svgMove(keyPoint[0].x, keyPoint[0].y) + svgLine(keyPoint[1].x, keyPoint[1].y)
    );
    // path1
    path.push(document.createElementNS(svgNS,"path"));
    path[1].setAttributeNS(null,"d",
      svgMove(keyPoint[1].x, keyPoint[1].y) + svgLine(keyPoint[2].x, keyPoint[2].y)
    );
    // path2
    path.push(document.createElementNS(svgNS,"path"));
    path[2].setAttributeNS(null,"d",
      svgMove(keyPoint[2].x, keyPoint[2].y) + svgLine(keyPoint[3].x, keyPoint[3].y)
    );
    // path3
    path.push(document.createElementNS(svgNS,"path"));
    path[3].setAttributeNS(null,"d",
      svgMove(keyPoint[4].x, keyPoint[4].y) + svgLine(keyPoint[5].x, keyPoint[5].y)
    );
    // path4
    path.push(document.createElementNS(svgNS,"path"));
    path[4].setAttributeNS(null,"d",
      svgMove(keyPoint[5].x, keyPoint[5].y) + svgLine(keyPoint[6].x, keyPoint[6].y)
    );
    // path5
    path.push(document.createElementNS(svgNS,"path"));
    path[5].setAttributeNS(null,"d",
      svgMove(keyPoint[6].x, keyPoint[6].y) + svgLine(keyPoint[7].x, keyPoint[7].y)
    );
    
    function pathSetAttributes(p) {
      p.setAttributeNS(null,"fill","none");
      p.setAttributeNS(null,"stroke-width","3");
      p.setAttributeNS(null,"stroke","lime");
    }
    
    for (var i = 0; i < path.length; i++) {
      pathSetAttributes(path[i])
      logo.appendChild(path[i]);
    }
    
  }
  
  drawLogo();
  
  
  // construct widgets
  var slider = document.getElementById("my_slider");
  var output = document.getElementById("slider_output");
  output.innerHTML = slider.value; // Display the default slider value
  
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
    // keyPoint2
    keyPoint[2] = {x:keyPoint[1].x+width/2*this.value/100, y:keyPoint[1].y};
    // keyPoint3
    keyPoint[3] = {x:keyPoint[2].x+width/2*0.4, y:keyPoint[2].y-width/2*Math.sqrt(3)*0.4};
    path[2].setAttributeNS(null,"d",
      svgMove(keyPoint[2].x, keyPoint[2].y) + svgLine(keyPoint[3].x, keyPoint[3].y)
    );
  }
  
}) ();