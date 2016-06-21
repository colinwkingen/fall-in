
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
    if (findCoordinate("north")) {
      currentLocation[1] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-south").click(function() {
    if (findCoordinate("south")) {
      currentLocation[1] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-east").click(function() {
    if (findCoordinate("east")) {
      currentLocation[0] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-west").click(function() {
    if (findCoordinate("west")) {
      currentLocation[0] -= 1;
      debugger;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-interact").click(function() {
    var items = findCoordinate("items")
    alert(items);
    debugger;
    if (arrayOfDirections[currentLocation[0]][currentLocation[1]].items.length > 0) {
      playerOne.itemInventory.push(items);
      arrayOfDirections[currentLocation[0]][currentLocation[1]].items.shift(0,1);
      $("#interactable").text(items);
      $("#inventory").html("");
      alert(playerOne.itemInventory);
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

findCoordinate = function(argument)  {
  var x = currentLocation[0];
  var y = currentLocation[1];
  if (argument === "west") {
    return arrayOfDirections[x][y].west;
  } else if (argument === "east") {
    return arrayOfDirections[x][y].east;
  } else if (argument === "north") {
    return arrayOfDirections[x][y].north;
  } else if (argument === "south") {
    return arrayOfDirections[x][y].south;
  } else if (argument === "items") {
    return arrayOfDirections[x][y].items;
  }
}
