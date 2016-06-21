
var currentLocation = [1,1];
//first index EW second NS
var mapLocation = [

    [["0,0"], ["1,0"], ["2,0", "Stick" ]],
    [["0,1"], ["1,1"], ["2,1"]],
    [["0,2"], ["1,2", "Key"], ["2,2", "Knife"]],

];

var moveLocation = function(direction) {
  var currentMapLocation = mapLocation[direction[1]][direction[0]];
  $("#main_output p").text(currentMapLocation);
}
var visibleLocation = function(inputLocation) {
  $(".location").hide();
  var locationId = "#" + inputLocation[0].toString() + "-" + inputLocation[1].toString();
  $(locationId).show();
}

function Player() {
  this.hitPoints = 10;
  this.itemInventory = [];
  this.hasKey = false;
  this.currentLocation = currentLocation;
  this.weaponDamage = this.weaponCheck();
}

Player.prototype.itemsInLocation = function() {
  var locationItems = mapLocation[currentLocation[0]][currentLocation[1]]
  return locationItems;
}

Player.prototype.weaponCheck = function() {
  for (i = 0; i < this.itemInventory.length; i += 1) {
    if (this.itemInventory[i] === "Knife") {
      this.weaponDamage = 3;
    } else if (this.itemInventory[i] === "Stick") {
      this.weaponDamage === 2;
    } else {
      this.weaponDamage === 1;
    }
  }
}

$(document).ready(function() {
  var playerOne = new Player();
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
  visibleLocation(currentLocation);
  $("#interactable").text(playerOne.itemsInLocation());
});
