var functionTools;
document.getElementById("functionsBox").style.display = "none"
document.getElementById("functionsBox").style.opacity = 0

function showFunctions(v,h) {
  $fade("functionsBox", 100);
  functionTools = v;
}

function switchFunctions(p) {
  document.getElementById("basicFunctionsBtn").style.borderBottom = "3px solid transparent"
  document.getElementById("otherFunctionsBtn").style.borderBottom = "3px solid transparent"
  document.getElementById("varFunctionsBtn").style.borderBottom = "3px solid transparent"
  document.getElementById("basicFunctionsBox").style.display = "none"
  document.getElementById("otherFunctionsBox").style.display = "none"
  document.getElementById("varFunctionsBox").style.display = "none"
  
  if (p == 1) {
    document.getElementById("basicFunctionsBtn").style.borderBottom = "3px solid rgb(41,144,255)"
    document.getElementById("basicFunctionsBox").style.display = "block"
  } else if (p == 2) {
    document.getElementById("otherFunctionsBtn").style.borderBottom = "3px solid rgb(41,144,255)"
    document.getElementById("otherFunctionsBox").style.display = "block"
  } else if (p == 3) {
    document.getElementById("varFunctionsBtn").style.borderBottom = "3px solid rgb(41,144,255)"
    document.getElementById("varFunctionsBox").style.display = "block"
  }
}

function addFunction(v) {
  var n;
  
  //basic
  if (v == "sqrt") {
    n = "Math.sqrt(x)"
  } else if (v == "cbrt") {
    n = "Math.cbrt(x)"
  } else if (v == "abs") {
    n = "Math.abs(x)"
  } else if (v == "sin") {
    n = "Math.sin(x)"
  } else if (v == "cos") {
    n = "Math.cos(x)"
  } else if (v == "tan") {
    n = "Math.tan(x)"
  } else if (v == "asin") {
    n = "Math.asin(x)"
  } else if (v == "acos") {
    n = "Math.acos(x)"
  } else if (v == "atan") {
    n = "Math.atan2(x)"
  } else if (v == "log10") {
    n = "Math.log10(x)"
  } else if (v == "loge") {
    n = "Math.log(x)"
  } else if (v == "log2") {
    n = "Math.log2(x)"
  } else if (v == "factor") {
    n = "factorial(x)"
  }
  
  //other
  if (v == "round") {
    n = "Math.round(x)"
  } else if (v == "floor") {
    n = "Math.floor(x)"
  } else if (v == "ceil") {
    n = "Math.ceil(x)"
  } else if (v == "sign") {
    n = "Math.sign(x)"
  } else if (v == "sum") {
    n = "sum()"
  } else if (v == "adv") {
    n = "adv()"
  } else if (v == "max") {
    n = "max()"
  } else if (v == "min") {
    n = "min()"
  } else if (v == "random") {
    n = "Math.random()"
  }
  
  //var
  if (v == "pi") {
    n = "Math.PI"
  } else if (v == "e") {
    n = "Math.E"
  } else if (v == "sqrt-2") {
    n = "Math.SQRT2"
  } else if (v == "sqrt-0.5") {
    n = "Math.SQRT1_2"
  } else if (v == "nl-2") {
    n = "Math.LN2"
  } else if (v == "nl-10") {
    n = "Math.LN10"
  } else if (v == "log-2e") {
    n = "Math.LOG2E"
  } else if (v == "log-10e") {
    n = "Math.LOG10E"
  }
  
  document.getElementById("equation" + functionTools + "input").value = document.getElementById("equation" + functionTools + "input").value + n
}


// FUNCTIONS

function sum(l) { // sum of a list
  var s = 0;
  for (var i = 0;i < l.length;i++) {
    s += l[i]
  }
  return s;
}

function adv(l) { // adverage of a list
  return sum(l)/l.length;
}

function max(l) { // finds the max value of a list
  var h = l[0];
  for (var i = 0;i < l.length;i++) {
    if (h < l[i]) {h = l[i]}
  }
  return h;
}

function min(l) { // finds the min value of list
  var low = l[0]
  for (var i = 0; i < l.length;i++) {
    if (low > l[i]) {low = l[i]}
  }
  return low;
}

function factorial(v) { // x!
  var n = 1;
  for (var i = v;i > 1;i--) {
    n = n*i
  }
  return n;
}

function deg(n) {return (n * 180/Math.PI)} // radians to degrees
function rad(n) {return (n * Math.PI/180)} // degrees to radians