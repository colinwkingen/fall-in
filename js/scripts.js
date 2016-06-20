var currentLocation = [1,1];
var playerInventory = [];
//first index EW second NS
var mapLocation = [
    ["0,0 : Southwest corner of a quiet meadow.", "1,0 : South side of a quiet meadow.", "2,0 : Southeast corner of a quiet meadow."],
    ["0,1 : West side of a quiet meadow.", "1,1 : Dead center of a quiet meadow.", "2,1 : East side of a quiet meadow."],
    ["0,2 : Northwest corner of a quiet meadow.", "1,2 : North side of a quiet meadow.", "2,2 : Northeast corner of a quiet meadow."],
  ];

var moveLocation = function(direction) {
  var currentMapLocation = mapLocation[direction[1]][direction[0]];
  $("#main_output").text(currentMapLocation);


if (currentLocation > -1 || currentLocation > 3){
  currentLocation = true;
} else {
  currentLocation = false;
}
function player(inventory, player) {
  this.playerInventory = inventory;
  this.player = player;
};
function enviroment(gate, crank, pail){
  this.gate = gate;
  this.crank = crank;
  this.pail = pail;
};
function items(key){
this.key = key;
  };
  player.prototype.inventory = function(){
    if (playerInventory === this.key) {
      return playerInventory = [this.key];
    } else {
      return playerInventory = [];
    };
  };
  enviroment.prototype.interactive = function(){
    if (this.playerInventory === []){
      return this.gate = false;
    } if (this.playerInventory === [this.key]) {
      return this.gate = true;
    }
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
  $("#0-1").trigger(function(){
    alert("The gate has Opened, feel free to exit!");
  })
});
