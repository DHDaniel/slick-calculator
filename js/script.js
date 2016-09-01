

var $input = $(".input-field");
var $chain = $(".chain");

// initialising result as global
var result;

// clearing and retrieving past input
function updateInput() {
  var val = $.trim($input.html());
  $input.html("");
}

function updateChain(val) {
  if ($chain.html() == 0) {
    $chain.html(val);
  } else {
    $chain.append(val);
  }
}

// clears everything
function ac() {
  $input.html(0);
  $chain.html(0);
  currentOperation = null;
}

// clears last entry and operation
function ce() {
  $input.html(0);
  var chainStr = $.trim($chain.html());
  var exp = /\W(?!.*\W)/; // matches last operation
  var results = exp.exec(chainStr);
  if (results !== null) {
    var idx = results["index"];
    $chain.html(chainStr.substr(0, idx));
  } else {
    $chain.html(0);
  }
  currentOperation = null;
}

// variable to keep track of when to clear input field and get its value
var currentOperation = null;

// digits
$(".numbers td").click(function () {

  // clearing everything if we have already produced a result and are typing a number directly after
  if (currentOperation == "result") {
   ac();
  }

  if (currentOperation != "number") {
    updateInput();
    currentOperation = "number";
  }

  var num = $.trim($(this).html());
  $input.append(num);
  updateChain(num);
});

// operations
$("#calculations td").click(function () {

  var operation = $.trim($(this).html());

  // making new chain if we are entering an operation after getting a result
  if (currentOperation == "result") {
    $chain.html(result);
  }

  currentOperation = "calculation";

  updateChain(operation);

});

// clearing
$("#clear td").click(function () {
  var action = $.trim($(this).html());

  switch (action) {
    case "AC":
      ac();
      break;
    case "CE":
      ce();
      break;
  }
});

$("#equals").click(function () {

  if (currentOperation != "result") {

    currentOperation = "result";

    var chainStr = $.trim($chain.html());
    var getNums = /[^\+|\-|÷|×|=]+/g;
    var getOps = /[\+|\-|÷|×]/g;

    var numbers = [];
    var operations = [];

    do {
      var match = getNums.exec(chainStr);
      if (match) {
        numbers.push(parseFloat(match[0]));
      }
    } while (match)

    do {
      var match = getOps.exec(chainStr);
      if (match) {
        operations.push(match[0]);
      }
    } while (match)

    result = numbers[0];
    var resultStr = result;

    for (var i = 0; i < operations.length; i++) {

      // applying operation to number that follows
      switch (operations[i]) {
        case "+":
          resultStr += '+' + numbers[i + 1];
          break;
        case "-":
          resultStr += '-' + numbers[i + 1];
          break;
        case "÷":
          resultStr += '/' + numbers[i + 1];
          break;
        case "×":
          resultStr += '*' + numbers[i + 1];
          break;
      }

    }

    // easiest way to keep BIDMAS order
    result = eval(resultStr);

    if (result) {
      $input.html(result);
      $chain.append(result);
    } else {
      $input.html("Error");
    }
  }

});
