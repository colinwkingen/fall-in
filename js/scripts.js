var currentLocation = [1,1];
//first index EW second NS
var moveLocation = function(direction) {
  var currentMapLocation = mapLocation[direction[1]][direction[0]];
  $("#main_output p").text(currentMapLocation);


if (currentLocation > -1 || currentLocation > 4){
  currentLocation = true;
} else {
  currentLocation = false;
}



};




$(document).ready(function() {
  $("#button-north").click(function() {
    currentLocation[0] += 1;
    moveLocation(currentLocation);
  });
  $("#button-south").click(function() {
    currentLocation[0] -= 1;
      moveLocation(currentLocation);
  });
  $("#button-east").click(function() {
    currentLocation[1] += 1;
      moveLocation(currentLocation);
  });
  $("#button-west").click(function() {
    currentLocation[1] -= 1;
      moveLocation(currentLocation);
  });
});
