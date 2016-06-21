
var currentLocation = [0,0];
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
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].north === true) {
      currentLocation[1] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall")
    }
  });
  $("#button-south").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].south === true) {
      currentLocation[1] -= 1;
      visibleLocation(currentLocation);
    } else {
      console.log(what);
      alert("You Ran Into A Wall")
    }
  });
  $("#button-east").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].east === true) {
      currentLocation[0] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall")
    }
  });
  $("#button-west").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].west === true) {
      currentLocation[0] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall")
    }
  });
  visibleLocation(currentLocation);
  $("#interactable").text(playerOne.itemsInLocation());
});

function Directions(north, south, east, west) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
}
var Forest = new Directions(false,false,true,false) //0,0 Forest
var Gate = new Directions(false,false,true,true)  //1,0 Gate
var Cave = new Directions(true,false,false,true)  //2,0 Cave
var ArchedRoom = new Directions(true,true,false,true) //2,1 ArchedRoom
var GreatRoom = new Directions(true,false,true,true)  //1,1 GreatRoom
var StairDown = new Directions(true,false, true,false) //0,1 StairDown
var Celler = new Directions(false,true,false,false) //0,2 Celler
var Well = new Directions(false,true,false,false) //1,2 Well
var Coffin = new Directions(false,true,false,false) //2,2 Coffin

var arrayOfDirections = [
[Forest,StairDown,Celler],[Gate,GreatRoom,Well],[Cave,ArchedRoom,Coffin]
]
console.log(arrayOfDirections[1][0].north)
