
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
  var circleCenter = [];
  var contactPoint = [];
  var radius = width * 0.05;
  var pi = Math.PI;
  var deg30 = pi/2/3;
  var deg60 = pi/2/3*2;
  var deg90 = pi/2;
  var deg180 = pi;
  var deg270 = pi + pi/2;
  
  
  function prt(c) {
    console.log(c);
  }
  function svgMove(x, y) {
    return "M " + x + " " + y + " ";
  }
  function svgLine(x, y) {
    return "L " + x + " " + y;
  }
  function svgArc(rx, ry, x, y) {
    return "A " + rx + " " + ry + " 0 0 0 " + x + " " + y;
  }
  
  function drawLogo() {
    
    function getContactPoint(x, y, a) {
      var cpx = x + radius * Math.cos(a);
      var cpy = y - radius * Math.sin(a);
      return {x:cpx, y:cpy};
    }
    
    // keyPoint 0
    keyPoint.push({x:width/2, y:0});
    // circleCenter 0
    circleCenter.push({x:keyPoint[0].x, y:keyPoint[0].y+radius*2});
    // contactPoint 0
    contactPoint.push(getContactPoint(circleCenter[0].x, circleCenter[0].y, deg270+deg90+deg30));
    // contactPoint 1
    contactPoint.push(getContactPoint(circleCenter[0].x, circleCenter[0].y, deg270+deg90+deg30+deg90+deg30));
    
    // keyPoint 1
    keyPoint.push({x:keyPoint[0].x-width/2, y:keyPoint[0].y+width/2*Math.sqrt(3)});
    // circleCenter 1
    circleCenter.push({x:keyPoint[1].x+radius*Math.sqrt(3), y:keyPoint[1].y-radius});
    // contactPoint 2
    contactPoint.push(getContactPoint(circleCenter[1].x, circleCenter[1].y, deg90+deg60));
    // contactPoint 3
    contactPoint.push(getContactPoint(circleCenter[1].x, circleCenter[1].y, deg270));
    
    // keyPoint 2
    keyPoint.push({x:keyPoint[1].x+width/2*0.72, y:keyPoint[1].y});
    // circleCenter 2
    circleCenter.push({x:keyPoint[2].x-radius/Math.sqrt(3), y:keyPoint[2].y-radius});
    // contactPoint 4
    contactPoint.push(getContactPoint(circleCenter[2].x, circleCenter[2].y, deg270));
    // contactPoint 5
    contactPoint.push(getContactPoint(circleCenter[2].x, circleCenter[2].y, deg270+deg60));
    
    // keyPoint 3
    keyPoint.push({x:keyPoint[2].x+width/2*0.4, y:keyPoint[2].y-width/2*Math.sqrt(3)*0.4});
    // keyPoint 4
    keyPoint.push({x:width/2+width/2*0.12, y:width/2*Math.sqrt(3)});
    
    // keyPoint 5
    keyPoint.push({x:width, y:keyPoint[4].y});
    // circleCenter 3
    circleCenter.push({x:keyPoint[5].x-radius*Math.sqrt(3), y:keyPoint[5].y-radius});
    // contactPoint 6
    contactPoint.push(getContactPoint(circleCenter[3].x, circleCenter[3].y, deg270));
    // contactPoint 7
    contactPoint.push(getContactPoint(circleCenter[3].x, circleCenter[3].y, deg270+deg90+deg30));
    
    // keyPoint 6
    keyPoint.push({x:keyPoint[5].x-width/2*0.8, y:keyPoint[5].y-width/2*Math.sqrt(3)*0.8});
    // circleCenter 4
    circleCenter.push({x:keyPoint[6].x, y:keyPoint[6].y+radius*2});
    // contactPoint 8
    contactPoint.push(getContactPoint(circleCenter[4].x, circleCenter[4].y, deg270+deg90+deg30));
    // contactPoint 9
    contactPoint.push(getContactPoint(circleCenter[4].x, circleCenter[4].y, deg270+deg90+deg30+deg90+deg30));
    
    // keyPoint 7
    keyPoint.push({x:keyPoint[6].x-width/2*0.52, y:keyPoint[6].y+width/2*0.52*Math.sqrt(3)});
    
    
    // path 0 (round 0)
    path.push(document.createElementNS(svgNS,"path"));
    path[0].setAttributeNS(null,"d",
      svgMove(contactPoint[0].x, contactPoint[0].y) + svgArc(radius, radius, contactPoint[1].x, contactPoint[1].y)
    );
    // path 1 (line 0)
    path.push(document.createElementNS(svgNS,"path"));
    path[1].setAttributeNS(null,"d",
      svgMove(contactPoint[1].x, contactPoint[1].y) + svgLine(contactPoint[2].x, contactPoint[2].y)
    );
    // path 2 (round 1)
    path.push(document.createElementNS(svgNS,"path"));
    path[2].setAttributeNS(null,"d",
      svgMove(contactPoint[2].x, contactPoint[2].y) + svgArc(radius, radius, contactPoint[3].x, contactPoint[3].y)
    );
    // path 3 (line 1)
    path.push(document.createElementNS(svgNS,"path"));
    path[3].setAttributeNS(null,"d",
      svgMove(contactPoint[3].x, contactPoint[3].y) + svgLine(contactPoint[4].x, contactPoint[4].y)
    );
    // path 4 (round 2)
    path.push(document.createElementNS(svgNS,"path"));
    path[4].setAttributeNS(null,"d",
      svgMove(contactPoint[4].x, contactPoint[4].y) + svgArc(radius, radius, contactPoint[5].x, contactPoint[5].y)
    );
    // path 5 (line 2)
    path.push(document.createElementNS(svgNS,"path"));
    path[5].setAttributeNS(null,"d",
      svgMove(contactPoint[5].x, contactPoint[5].y) + svgLine(keyPoint[3].x, keyPoint[3].y)
    );
    // path 6 (line 3)
    path.push(document.createElementNS(svgNS,"path"));
    path[6].setAttributeNS(null,"d",
      svgMove(keyPoint[4].x, keyPoint[4].y) + svgLine(contactPoint[6].x, contactPoint[6].y)
    );
    // path 7 (round 3)
    path.push(document.createElementNS(svgNS,"path"));
    path[7].setAttributeNS(null,"d",
      svgMove(contactPoint[6].x, contactPoint[6].y) + svgArc(radius, radius, contactPoint[7].x, contactPoint[7].y)
    );
    // path 8 (line 4)
    path.push(document.createElementNS(svgNS,"path"));
    path[8].setAttributeNS(null,"d",
      svgMove(contactPoint[7].x, contactPoint[7].y) + svgLine(contactPoint[8].x, contactPoint[8].y)
    );
    // path 9 (round 4)
    path.push(document.createElementNS(svgNS,"path"));
    path[9].setAttributeNS(null,"d",
      svgMove(contactPoint[8].x, contactPoint[8].y) + svgArc(radius, radius, contactPoint[9].x, contactPoint[9].y)
    );
    // path 10 (line 5)
    path.push(document.createElementNS(svgNS,"path"));
    path[10].setAttributeNS(null,"d",
      svgMove(contactPoint[9].x, contactPoint[9].y) + svgLine(keyPoint[7].x, keyPoint[7].y)
    );
    
    
    function pathSetAttributes(p) {
      p.setAttributeNS(null,"fill","none");
      p.setAttributeNS(null,"stroke-width","5");
      p.setAttributeNS(null,"stroke","rgb(0, 255, 255)");
    }
    
    for (var i = 0; i < path.length; i++) {
      pathSetAttributes(path[i])
      logo.appendChild(path[i]);
    }
    
  }
  
  drawLogo();
  
  
  // construct widgets
/*   var slider = document.getElementById("my_slider");
  var output = document.getElementById("slider_output");
  output.innerHTML = slider.value; // Display the default slider value
  
  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
    
  } */
  
}) ();