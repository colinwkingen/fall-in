
var currentLocation = [0,0];

var visibleLocation = function(inputLocation) {
  $(".location").hide();
  var locationId = "#" + inputLocation[0].toString() + "-" + inputLocation[1].toString();
  $(locationId).show();
  $("#interactable").text(arrayOfDirections[currentLocation[0]][currentLocation[1]].items);
  $("#inventory").text(this.itemInventory);
}

function Player() {
  this.hitPoints = 10;
  this.itemInventory = [];
  this.hasKey = false;
  this.currentLocation = currentLocation;
  this.weaponDamage = this.weaponCheck();
}

Player.prototype.itemsInLocation = function() {
  var locationItems = mapLocation[currentLocation[0]][currentLocation[1]];
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
      alert("You Ran Into A Wall");
    }
  });
  $("#button-south").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].south === true) {
      currentLocation[1] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-east").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].east === true) {
      currentLocation[0] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-west").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].west === true) {
      currentLocation[0] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-interact").click(function() {
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].items.length > 0) {
      playerOne.itemInventory.push(arrayOfDirections[currentLocation[0]][currentLocation[1]].items[0]);
      arrayOfDirections[currentLocation[0]][currentLocation[1]].items.shift(0,1);
      $("#interactable").text(arrayOfDirections[currentLocation[0]][currentLocation[1]].items);
      $("#inventory").html("");
      for (i = 0; i < playerOne.itemInventory.length; i += 1) {
        $("#inventory").append("<li>" + playerOne.itemInventory[i] + "</li>");
      }
    } else {
      alert("There is nothing here to pick up.")
    }
  });
});
function Directions(north, south, east, west, items) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
  this.items = items;
}
var Forest = new Directions(false,false,true,false,[" "]); //0,0 Forest
var Gate = new Directions(false,false,true,true,[" "]); //1,0 Gate
var Cave = new Directions(true,false,false,true,["Stick"]);  //2,0 Cave
var ArchedRoom = new Directions(true,true,false,true,[" "]); //2,1 ArchedRoom
var GreatRoom = new Directions(true,false,true,true,[" "]);  //1,1 GreatRoom
var StairDown = new Directions(true,false, true,false,[" "]); //0,1 StairDown
var Celler = new Directions(false,true,false,false,[" "]); //0,2 Celler
var Well = new Directions(false,true,false,false,["Key"]); //1,2 Well
var Coffin = new Directions(false,true,false,false,["Knife"]); //2,2 Coffin

var arrayOfDirections = [
[Forest,StairDown,Celler],[Gate,GreatRoom,Well],[Cave,ArchedRoom,Coffin]
];
