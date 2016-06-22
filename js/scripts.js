var currentLocation = [0,0];
var playerOne = new Player();
var visibleLocation = function(inputLocation) {
  currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
  if (currentRoom.room === "Gate") {
    if (playerOne.hasKey === true) {
      alert("you shall pass");
    } else {
      alert("go find the key to enter the secert room");
    }
  }
  $(".location").hide();
  var locationId = "#" + inputLocation[0].toString() + "-" + inputLocation[1].toString();
  $(locationId).show();
  $("#interactable").html("<li>" + currentRoom.items + "</li>");
  $("#inventory").text(this.itemInventory);
  if (currentRoom.north === false) {
    $("#button-north").hide()
  } else {
    $("#button-north").show()
  }
  if (currentRoom.south === false) {
    $("#button-south").hide()
  } else {
    $("#button-south").show()
  }
  if (currentRoom.east === false) {
    $("#button-east").hide()
  } else {
    $("#button-east").show()
  }
  if (currentRoom.west === false) {
    $("#button-west").hide()
  } else {
    $("#button-west").show()
  }
}

function Player() {
  this.hitPoints = 10;
  this.itemInventory = [];
  this.hasKey = false;
  this.currentLocation = currentLocation;
  this.weaponDamage = 1;
}

Player.prototype.keyCheck = function() {
  if (this.hasKey === true) {
    alert("you have the key to open the door");
  } else {
    alert("you still don't have the key");
  }
}
Player.prototype.weaponCheck = function() {
  var haveKnife = false;
  this.hasKey = false;
  this.weaponDamage = 1;
  for (i = 0; i < this.itemInventory.length; i += 1) {
    if (this.itemInventory[i] === "Key") {
      this.hasKey = true;
    } else if (this.itemInventory[i] === "Knife") {
      this.weaponDamage = 3
      haveKnife = true;
    } else if (this.itemInventory[i] === "Stick") {
      if (haveKnife === false) {
      this.weaponDamage = 2;
      }
    }
  }
}

$(document).ready(function() {
  $("#interactable").html("<li>" + currentRoom.items + "</li>");
  visibleLocation(currentLocation);
  $("#button-north").click(function() {
    if (currentRoom.north) {
      currentLocation[1] += 1;
      visibleLocation(currentLocation);
    }
  });
  $("#button-south").click(function() {
    if (currentRoom.south) {
      currentLocation[1] -= 1;
      visibleLocation(currentLocation);
    }
  });
  $("#button-east").click(function() {
    if (currentRoom.east) {
      currentLocation[0] += 1;
      visibleLocation(currentLocation);
    }
  });
  $("#button-west").click(function() {
    if (currentRoom.west) {
      currentLocation[0] -= 1;
      visibleLocation(currentLocation);
    }
  });
  $("#button-interact").click(function() {
    if (currentRoom.items.length > 0) {
      playerOne.itemInventory.push(currentRoom.items[0]);
      currentRoom.items.shift(0,1);
      $("#interactable").html("<li>" + currentRoom.items + "</li>");
      $("#inventory").html("");
      for (i = 0; i < playerOne.itemInventory.length; i += 1) {
        $("#inventory").append("<li>" + playerOne.itemInventory[i] + "</li>");
      }
    } else {
      alert("There is nothing here to pick up.");
    }
    playerOne.weaponCheck();
  });
  $("#button-drop").click(function() {
    if (playerOne.itemInventory.length > 0 ) {
      currentRoom.items.push(playerOne.itemInventory[0]);
      playerOne.itemInventory.shift();
      playerOne.weaponCheck();
      $("#inventory").html("<li>" + playerOne.itemInventory + "</li>");
      $("#interactable").html("");
      for (i = 0; i < currentRoom.items.length; i += 1) {
        $("#interactable").append("<li>" + currentRoom.items[i] + "</li>");
      }
    } else {
      alert("You have nothing to drop!");
    }
    playerOne.weaponCheck();
  });
});
function Directions(north, south, east, west, items, room) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
  this.items = items;
  this.room = room;
}
var Forest = new Directions(false,false,true,false,["Stick"],"Forest"); //0,0 Forest
 var Gate = new Directions(false,false,true,true,[],"Gate"); //1,0 Gate
 var Cave = new Directions(true,false,false,true,[],"Cave");  //2,0 Cave
 var ArchedRoom = new Directions(true,true,false,true,[],"ArchedRoom"); //2,1 ArchedRoom
 var GreatRoom = new Directions(true,false,true,true,[],"GreatRoom");  //1,1 GreatRoom
 var StairDown = new Directions(true,false, true,false,[],"StairDown"); //0,1 StairDown
 var Celler = new Directions(false,true,false,false,[],"Celler"); //0,2 Celler
 var Well = new Directions(false,true,false,false,["Key"],"Well"); //1,2 Well
 var Coffin = new Directions(false,true,false,false,["Knife"],"Coffin"); //2,2 Coffin

var arrayOfDirections = [
[Forest,StairDown,Celler],[Gate,GreatRoom,Well],[Cave,ArchedRoom,Coffin]
];

var currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
