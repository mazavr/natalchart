var CENTER = {
  X: 300,
  Y: 300
};

var RADIUS = {
  1: 180,
  2: 212,
  3: 110,
  4: 190,
  5: 230,
  6: 270,
  7: 250
};

function toRadians(angle) {
  return angle * Math.PI / 180;
}

function handleVector(angle, f) {
  return f(
    Math.cos(toRadians(angle)),
    Math.sin(toRadians(angle))
  )
}

function handleTwoVectors(angle1, angle2, f) {
  return f(
    Math.cos(toRadians(angle1)),
    Math.sin(toRadians(angle1)),
    Math.cos(toRadians(angle2)),
    Math.sin(toRadians(angle2))
  )
}

function createElement(name, attrs) {
  var element = document.createElementNS('http://www.w3.org/2000/svg', name);
  for (var attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      element.setAttributeNS(null, attr, attrs[attr]);
    }
  }
  return element;
}

//-----------------

function createLine(r1, r2, cx, cy, params) {
  return function (x, y) {
    return createElement('line',
      $.extend({
          x2: x * r2 + cx,
          y2: -y * r2 + cy,
          x1: x * r1 + cx,
          y1: -y * r1 + cy
        }, params
      ));
  }
}

var createHomeLine = createLine(RADIUS[5], RADIUS[2], CENTER.X, CENTER.Y, {
  "stroke": "blue",
  "stroke-width": 2
});

var createZodiacLine = createLine(RADIUS[3], RADIUS[2], CENTER.X, CENTER.Y, {
  "stroke": "black",
  "stroke-width": 1
});

//-----------------

function createArcSector(r1, r2, cx, cy, params) {
  return function (x1, y1, x2, y2) {
    return createElement('path',
      $.extend({
          d: 'M' + (x1 * r1 + cx) + ' ' + (-y1 * r1 + cy) + ' ' +
          'A ' + r1 + ' ' + r1 + ', 0, 0, 0, ' + (x2 * r1 + cx) + ' ' + (-y2 * r1 + cy) + ' ' +

            'L ' + (x2 * r2 + cx) + ' ' + (-y2 * r2 + cy) + ' ' +
          'A ' + r2 + ' ' + r2 + ', 0, 0, 1, ' + (x1 * r2 + cx) + ' ' + (-y1 * r2 + cy) + ' ' +
            'Z'
        }, params
      ));
  }
}

var createZodiacArcSector = createArcSector(RADIUS[6], RADIUS[7], CENTER.X, CENTER.Y, {
  "stroke": "orange",
  "stroke-width": 1,
  fill: 'none'
});


//-----------------

var svg = document.getElementById('svg');

var dataArcLines = [[0, 80], [90, 170], [180,260], [270, 350]];

for (var i = 0; i < dataArcLines.length; i++) {
  svg.appendChild(handleTwoVectors(dataArcLines[i][0], dataArcLines[i][1], createZodiacArcSector));
}

var cc = createElement('circle', {
  "cx": CENTER.X,
  "cy": CENTER.Y,
  r: RADIUS[3],
  fill: 'none',
  "stroke": "black",
  "stroke-width": 1
});

svg.appendChild(cc);

var cc = createElement('circle', {
  "cx": CENTER.X,
  "cy": CENTER.Y,
  r: RADIUS[1],
  fill: 'none',
  "stroke": "black",
  "stroke-width": 1
});

svg.appendChild(cc);

var cc = createElement('circle', {
  "cx": CENTER.X,
  "cy": CENTER.Y,
  r: RADIUS[2],
  fill: 'none',
  "stroke": "black",
  "stroke-width": 1
});

svg.appendChild(cc);

for (var i = 0; i < 360; i += 30) {
  svg.appendChild(handleVector(i, createZodiacLine));
}

var homes = [10, 65, 100, 150, 190, 210, 220, 290];

for (var i = 0; i < homes.length; i++) {
  svg.appendChild(handleVector(homes[i], createHomeLine));
}

for (var i = 15; i < 360; i += 30) {
  svg.appendChild(handleVector(i, function (x, y) {
    var text = createElement('text', {
      "x": x * RADIUS[4] + CENTER.X,
      "y": -y * RADIUS[4] + CENTER.Y,
      'text-anchor': "middle",
      //'dominant-baseline':"middle",
      //width: 50,
      //height: 20,
      //fill: 'red',
      "stroke": "black",
      //"stroke-width": 1,
      style: "font-family:arial; font-size:18;  ",
      transform: 'rotate(' + (90 - i) + ',' + (x * RADIUS[4] + CENTER.X) + ',' + (-y * RADIUS[4] + CENTER.Y ) + ')'
    });

    var textNode = document.createTextNode((i + 15) / 30);

    text.appendChild(textNode);

    return text;
  }));
}


var dataLines = [[15, 276], [276, 30], [276, 160]];

for (var i = 0; i < dataLines.length; i++) {
  svg.appendChild(handleTwoVectors(dataLines[i][0], dataLines[i][1], function (x, y, x2, y2) {
    return createElement('line', {
      "x2": x2 * RADIUS[3] + CENTER.X,
      "y2": -y2 * RADIUS[3] + CENTER.Y,
      x1: x * RADIUS[3] + CENTER.X,
      y1: -y * RADIUS[3] + CENTER.Y,
      "stroke": "green",
      "stroke-width": 1
    });
  }));
}


var data = [15, 30, 276, 160];

for (var i = 0; i < data.length; i++) {
  svg.appendChild(handleVector(data[i], function (x, y) {
    return createElement('circle', {
      "cx": x * RADIUS[3] + CENTER.X,
      "cy": -y * RADIUS[3] + CENTER.Y,
      r: 3,
      fill: 'white',
      "stroke": "black",
      "stroke-width": 1
    });
  }));
}



