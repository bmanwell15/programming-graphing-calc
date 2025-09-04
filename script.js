var equationHolder = [], pointHolder = []
var y = 0, startingY = 0.9;
var x = 0;
var equationNum = 0, pointNum = 0;
var graphScale = 6
var longestEqua, highestEqua;

document.getElementById("x-axis").style.width = "1000px"
document.getElementById("y-axis").style.height = "1000px"
document.getElementById("functionsBox").style.display = "none"
document.getElementById("functionsBox").style.opacity = 0
document.getElementById("toolsDropBox").style.display = "none"
document.getElementById("varDropBox").style.display = "none"

switchFunctions(1)
createEquation()

setInterval(calculatorTick, 200)

$("#toolsBtn").mouseenter(function() {
  document.getElementById("toolsDropBox").style.display = "block"
})
$("#toolsBtn").mouseleave(function() {
  document.getElementById("toolsDropBox").style.display = "none"
})

$("#toolsDropBox").mouseenter(function() {
  document.getElementById("toolsDropBox").style.display = "block"
})
$("#toolsDropBox").mouseleave(function() {
  document.getElementById("toolsDropBox").style.display = "none"
})

$("#varBtn").mouseenter(function() {
  document.getElementById("varDropBox").style.display = "block"
})
$("#varBtn").mouseleave(function() {
  document.getElementById("varDropBox").style.display = "none"
})

$("#varDropBox").mouseenter(function() {
  document.getElementById("varDropBox").style.display = "block"
})
$("#varDropBox").mouseleave(function() {
  document.getElementById("varDropBox").style.display = "none"
})


function createEquation() {
  $("#equationBox").append("<div class='equations' id='equation" + equationNum + "'><input id='equation" + equationNum + "input' type='text' value='y = x'><br><label>Length:</label><input style='width: 40px;margin-left:10px' type='number' value='100' id='equationLength" + equationNum + "'><label style='margin-left: 15px'>Interval:</label><input style='width: 40px;margin-left:10px' type='number' value='1' id='equationInterval" + equationNum + "'><br><label>f(</label><input type='text' value='0' id='calculator" + equationNum + "' style='width:40px;margin: 5px;border-radius:7px'><label>) = </label><label id='calculatorOut" + equationNum + "'></label><label style='margin-left: 28px'>y = </label><input id='equationStartY" + equationNum + "' type='number' style='width: 40px;margin-left:5px' value='0'><br><img class='deleteEquationBtn' src='" + IMG_trash + "' title='Delete Equation' onclick='equationHolder[" + equationNum + "].delete()'><img class='displayBtn' id='displayBtn" + equationNum + "' src='" + IMG_eye + "' onclick='equationHolder[" + equationNum + "].toggleDisplay()'><img class='functionsBtn' src='" + IMG_functions + "' onclick='showFunctions(" + equationNum + ")'><button onclick='equationHolder[" + equationNum + "].evaluate()'>Update</button><img class='errorSign' id='errorSign" + equationNum + "' src='" + IMG_error + "' title='At least one point is not a real number'><input class='equationColors' type='color' value='#ff0000' id='equationColor" + equationNum + "' ></div><hr id='hr" + equationNum + "'>")
  equationHolder.push(new Equation())
  equationHolder[equationHolder.length-1].evaluate()
  equationNum++
}

function Equation() {
  var num = equationNum;
  var xLength = 100, xInterval = 1;
  var startY = 0;
  document.getElementById("equationColor"+num).value = "#" + $randomInt(10) + "" + $randomInt(10) + "" + $randomInt(10) + "" + $randomInt(10) + "" + $randomInt(10) + "" + $randomInt(10)
  var color;
  var deleted = false, display = true;
  
  this.xLength = () => {return xLength}
  this.setXLength = (v) => {xLength = v}
  this.xInterval = () => {return xInterval}
  this.setXInterval = (v) => {xInterval = v}
  this.color = () => {return color}
  this.setColor = (v) => {color = v;}
  this.getDisplay = () => {return display}
  this.startY = () => {return startY}
  this.setY = (v) => {startY = v}
  
  this.toggleDisplay = () => {
    display = !display;
    doCalculations(num)
    if (display) {
      document.getElementById("displayBtn"+num).src = IMG_eye
    } else {
      document.getElementById("displayBtn"+num).src = IMG_eyeSelected
    }
  }
  
  this.evaluate = () => {
    color = document.getElementById("equationColor" + num).value
    doCalculations(num);
  }
  this.delete = () => {
    xLength = 0;
    document.getElementById("equationColor" + num).value = "transparent"
    document.getElementById("calculator" + num).value = 0
    document.getElementById("equation" + num).style.display = "none"
    document.getElementById("hr" + num).style.display = "none"
    deleted = true
    doCalculations(num)
  }
  this.deleteStatus = () => {return deleted}
}

function Point(px,py,equaId) {
  $("body").append("<div class='point' id='point" + pointNum + "' style='left:" + ((px*graphScale)+321) + "px;bottom:" + ((py*graphScale)-4937) + "px' onmouseover='hoverPoint(" + pointNum + "," + equaId + "," + (pointHolder[equaId].length) + ")' onmouseleave='hoverPointLeave()'></div>")
  var id = document.getElementById("point" + pointNum)
  pointNum++
  var pointEqua = equaId
  id.style.backgroundColor = equationHolder[equaId].color()
  var pointX = px, pointY = py
  var deleted = false
  
  this.X = () => {return pointX}
  this.Y = () => {return pointY}
  this.id = () => {return id}
  this.setY = (v) => {id.style.bottom = (pointY - highestEqua)*graphScale + "px"}
  this.equation = () => {return pointEqua}
  this.delete = () => {
    id.style.backgroundColor = "transparent"
    id.style.left = 0;id.style.bottom = 0
    deleted = true
  }
  this.deleteStatus = () => {return deleted}
}

var a,b,c,d

function doCalculations(id) {
  var error = false;
  
  equationHolder[id].setY(Number(document.getElementById("equationStartY" + id).value))
  
  y = equationHolder[id].startY();x = 0;
  
   a = document.getElementById("varA").value
   b = document.getElementById("varB").value
   c = document.getElementById("varC").value
   d = document.getElementById("varD").value
  
  equationHolder[id].setXLength(Number(document.getElementById("equationLength" + id).value))
  equationHolder[id].setXInterval(Number(document.getElementById("equationInterval" + id).value))
  
  if (id < pointHolder.length) {
    for (var i = 0;i < pointHolder[id].length;i++) {
      pointHolder[id][i].delete()
    }
    pointHolder[id] = new Array()
  } else {
    pointHolder.push(new Array())
  }
  
  if (!equationHolder[id].deleteStatus() && equationHolder[id].getDisplay()) {
    for (var i = 0;i <= equationHolder[id].xLength();i+= equationHolder[id].xInterval()) {
      eval(document.getElementById("equation" + id + "input").value)
      x += equationHolder[id].xInterval()
      
      if (y == Infinity || y == -Infinity || y == undefined || y == NaN) {error = true}
      
      pointHolder[id].push(new Point(x,y,id))
    }
  }
  
  if (error) {
    document.getElementById("errorSign" + id).style.display = "block"
  } else {
    document.getElementById("errorSign" + id).style.display = "none"
  }
  
  
  longestEqua = equationHolder[0].xLength()
  highestEqua = f(0,equationHolder[0].xLength()-1)
  
  for (var i = 0;i < equationHolder.length;i++) {
    if (equationHolder[i].xLength() > longestEqua) {
      longestEqua = equationHolder[i].xLength()
    }
    if (highestEqua < Math.abs(f(i,equationHolder[i].xLength()-1))) {
      highestEqua = f(i,equationHolder[i].xLength()-1)
    }
  }
  
  for (var k = 0;k < pointHolder.length;k++) {
    for (var i = 0;i < pointHolder[k].length;i++) {
      pointHolder[k][i].setY()
    }
  }
  
  document.getElementById("x-axis").style.width = (longestEqua+2600) + "px"
  document.getElementById("x-axis").style.bottom = -highestEqua*graphScale + "px"
  document.getElementById("y-axis").style.height = ((Math.abs(highestEqua)*graphScale)+(773)) + "px"
}

function f(id, S) {
  x = 0,y = equationHolder[id].startY();
  for (var i = 0;i <= S;i+= equationHolder[id].xInterval()) {
    eval(document.getElementById("equation" + id + "input").value)
    x += equationHolder[id].xInterval()
  }
  return y;
}

function hoverPoint(i,n1,n2) {
  if (!pointHolder[n1][n2].deleteStatus()) {
    document.getElementById("hoverBox").style.left = $removeLabel(document.getElementById("point"+ i).style.left)+20 + "px"
    document.getElementById("hoverBox").style.bottom = ($removeLabel(document.getElementById("point"+ i).style.bottom)-15) + "px"
    
    document.getElementById("hoverBox").innerHTML = "(" + $round((pointHolder[n1][n2].X()-1),2) + "," + $round(pointHolder[n1][n2].Y(),2) + ")"
  
    document.getElementById("hoverBox").style.display = "block"
  }
}

function hoverPointLeave() {
  document.getElementById("hoverBox").style.display = "none"
}

function calculatorTick() {
  a = document.getElementById("varA").value
  b = document.getElementById("varB").value
  c = document.getElementById("varC").value
  d = document.getElementById("varD").value
  for (var i = 0; i < equationNum;i++) {
    document.getElementById("calculatorOut"+i).innerHTML = $round(f(i, Number(eval(document.getElementById("calculator"+i).value))),3)
  }
}

function zoom(a) {
  graphScale += a
  
  if (graphScale < 1) {graphScale = 1}
  if (graphScale > 10) {graphScale = 10}
  
  for (var i = 0; i < equationHolder.length;i++) {
    equationHolder[i].evaluate()
  }
}