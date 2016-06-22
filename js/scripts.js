
var currentLocation = [0,0];
var playerOne = new Player();
var visibleLocation = function(inputLocation) {
  currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
  if (currentRoom.roomName === "Gate") {
    playerOne.keyCheck();
  }
  $(".location").hide();
  var locationId = "#" + inputLocation[0].toString() + "-" + inputLocation[1].toString();
  $(locationId).show();
  $("#interactable").text(currentRoom.items);
  $("#inventory").text(this.itemInventory);
}

function Player() {
  this.hitPoints = 10;
  this.itemInventory = [];
  this.hasKey = false;
  this.currentLocation = currentLocation;
  this.weaponDamage = 1;
}

Player.prototype.keyCheck = function() {
  for (i = 0; i < this.itemInventory.length; i += 1) {
    if (this.itemInventory[i] === "Key") {
      this.hasKey = true;
      alert("you have the key to open the door");
    } else {
      this.hasKey = false;
      alert("you still don't have the key");
    }
  }
}
Player.prototype.weaponCheck = function() {
  var haveKnife = false;
  for (i = 0; i < this.itemInventory.length; i += 1) {
    if (this.itemInventory[i] === "Knife") {
      this.weaponDamage = 3
      haveKnife = true;
    } else if (this.itemInventory[i] === "Stick") {
      if (haveKnife === false) {
        this.weaponDamage = 2;
      }
    } else {
      this.weaponDamage = 1;
    }
  }
}


$(document).ready(function() {
  $("#interactable").text(currentRoom.items);
  $("#button-north").click(function() {
    if (currentRoom.north) {
      currentLocation[1] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-south").click(function() {
    if (currentRoom.south) {
      currentLocation[1] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-east").click(function() {
    if (currentRoom.east) {
      currentLocation[0] += 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-west").click(function() {
    if (currentRoom.west) {
      currentLocation[0] -= 1;
      visibleLocation(currentLocation);
    } else {
      alert("You Ran Into A Wall");
    }
  });
  $("#button-interact").click(function() {
    if (currentRoom.items.length > 0) {
      playerOne.itemInventory.push(currentRoom.items[0]);
      playerOne.weaponCheck();
      currentRoom.items.shift(0,1);
      $("#interactable").text(currentRoom.items);
      $("#inventory").html("");
      for (i = 0; i < playerOne.itemInventory.length; i += 1) {
        $("#inventory").append("<li>" + playerOne.itemInventory[i] + "</li>");
      }
    } else {
      alert("There is nothing here to pick up.");
    }
  });
  $("#button-drop").click(function() {
    if (playerOne.itemInventory.length > 0 ) {
      currentRoom.items.push(playerOne.itemInventory[0]);
      playerOne.itemInventory.shift();
      playerOne.weaponCheck();
      $("#inventory").text(playerOne.itemInventory);
      visibleLocation(currentLocation);
    } else {
      alert("You have nothing to drop!");
    }
  });
});
function Directions(north, south, east, west, items, roomName) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
  this.items = items;
  this.roomName = roomName;
}
var Forest = new Directions(false,false,true,false,["Stick"],"Forest"); //0,0 Forest
var Gate = new Directions(false,false,true,true,[" "],"Gate"); //1,0 Gate
var Cave = new Directions(true,false,false,true,[" "],"Cave");  //2,0 Cave
var ArchedRoom = new Directions(true,true,false,true,[" "],"ArchedRoom"); //2,1 ArchedRoom
var GreatRoom = new Directions(true,false,true,true,[" "],"GreatRoom");  //1,1 GreatRoom
var StairDown = new Directions(true,true,true,false,[" "],"StairDown"); //0,1 StairDown
var Celler = new Directions(false,true,false,false,[" "],"Celler"); //0,2 Celler
var Well = new Directions(false,true,false,false,["Key"],"Well"); //1,2 Well
var Coffin = new Directions(false,true,false,false,["Knife"],"Coffin"); //2,2 Coffin

var arrayOfDirections = [
[Forest,StairDown,Celler],[Gate,GreatRoom,Well],[Cave,ArchedRoom,Coffin]
];

var currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
