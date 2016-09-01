

var $input = $(".input-field");
var $chain = $(".chain");

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
function ac() {
  $input.html(0);
  $chain.html(0);
  currentOperation = null;
}

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

  currentOperation = "calculation";

  var operation = $.trim($(this).html());
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
