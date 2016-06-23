var currentLocation = [0,0];
var playerOne = new Player();
var goldRoller = function() {
  goldTotal = Math.floor(Math.random() * 5) - 2;
  if (goldTotal <= 0) {
    return;
  } else {
    return goldTotal;
  }
};
var visibleLocation = function(inputLocation) {
  currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
  var statusMessage = []
  statusMessage = []
  if (currentRoom.room === "Gate") {
    if (playerOne.hasKey === true) {
      statusMessage.push("The gate opens when you use your key.")
    } else {
      statusMessage.push("The gate is locked tight.")
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
    $("#button-south").hide();
  } else {
    $("#button-south").show();
  }
  if (currentRoom.east === false) {
    $("#button-east").hide();
  } else {
    $("#button-east").show();
  }
  if (currentRoom.west === false) {
    $("#button-west").hide();
  } else {
    $("#button-west").show();
  }
  return statusMessage;
}
function Player() {
  this.hitPoints = 10;
  this.itemInventory = [];
  this.hasKey = false;
  this.currentLocation = currentLocation;
  this.weaponDamage = 1;
  this.goldCount = 0;
}
Player.prototype.weaponCheck = function() {
  weaponMessage = [];
  var haveKnife = false;
  this.hasKey = false;
  this.weaponDamage = 1;
  for (i = 0; i < this.itemInventory.length; i += 1) {
    if (this.itemInventory[i] === "Key") {
      this.hasKey = true;
      weaponMessage.push("You found a key.");
    } else if (this.itemInventory[i] === "Knife") {
      this.weaponDamage = 3
      haveKnife = true;
      weaponMessage.push("You found a rusty knife.");
    } else if (this.itemInventory[i] === "Stick") {
      if (haveKnife === false) {
        this.weaponDamage = 2;
      weaponMessage.push("You have a heavy stick.");
      }
    }
  }
  return weaponMessage;
}
$(document).ready(function() {
  $("#interactable").html("<li>" + currentRoom.items + "</li>");
  visibleLocation(currentLocation);
  var statusMessage = []
  statusMessage = [];
  $("#button-north").click(function() {
    if (currentRoom.north) {
      currentLocation[1] += 1;
    }
  });
  $("#button-south").click(function() {
    if (currentRoom.south) {
      currentLocation[1] -= 1;
    }
  });
  $("#button-east").click(function() {
    if (currentRoom.east) {
      currentLocation[0] += 1;
    }
  });
  $("#button-west").click(function() {
    if (currentRoom.west) {
      currentLocation[0] -= 1;
    }
  });
  $("#button-interact").click(function() {
    if (currentRoom.items.length > 0) {
      if (currentRoom.items[0] === "Potion") {
        playerOne.hitPoints += 5;
        currentRoom.items.shift(0,1);
        $("#interactable").html("<li>" + currentRoom.items + "</li>");
      } else {
        playerOne.itemInventory.push(currentRoom.items[0]);
        currentRoom.items.shift(0,1);
        $("#interactable").html("<li>" + currentRoom.items + "</li>");
        $("#inventory").html("");
        for (i = 0; i < playerOne.itemInventory.length; i += 1) {
        $("#inventory").append("<li>" + playerOne.itemInventory[i] + "</li>");
        }
      }
      if (currentRoom.treasure[0] === true && currentRoom.treasure[1] != 0)
        currentRoom.treasure[0] = false;
        playerOne.goldCount += currentRoom.treasure[1];
        alert(playerOne.goldCount)
        $("#coin-counter").text("You have " + playerOne.goldCount.toString() + " gold coins.");
    } else {
      statusMessage.push("There is nothing here to pick up.");
    }
  });
  $("#button-drop").click(function() {
    if (playerOne.itemInventory.length > 0 ) {
      currentRoom.items.push(playerOne.itemInventory[0]);
      playerOne.itemInventory.shift();
      statusMessage.push(playerOne.weaponCheck());
      $("#inventory").html("<li>" + playerOne.itemInventory + "</li>");
      $("#interactable").html("");
      for (i = 0; i < currentRoom.items.length; i += 1) {
        $("#interactable").append("<li>" + currentRoom.items[i] + "</li>");
      }
    } else {
      statusMessage.push("You have nothing to drop!");
    }
  });
  $("button").click(function() {
    statusMessage.push(visibleLocation(currentLocation));
    var goldInRoom = goldRoller();
    if ( goldInRoom > 0 && currentRoom.treasure[0] === true) {
      currentRoom.treasure[1] = goldInRoom;
      statusMessage.push("There are a few dirty gold coins scattered about the room.");
      $("#interactable").append("<li> Gold Coins </li>");
    }
    $("#action-text").html(statusMessage.join(" "));
    statusMessage = [];
  });
});
function Directions(north, south, east, west, items, room, treasure) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
  this.items = items;
  this.room = room;
  this.treasure = treasure;
}
var Forest = new Directions(false,false,true,false,["Stick"],"Forest",[true,0]); //0,0 Forest
 var Gate = new Directions(false,false,true,true,["Potion"],"Gate",[true,0]); //1,0 Gate
 var Cave = new Directions(true,false,false,true,[],"Cave",[true,0]);  //2,0 Cave
 var ArchedRoom = new Directions(true,true,false,true,[],"ArchedRoom",[true,0]); //2,1 ArchedRoom
 var GreatRoom = new Directions(true,false,true,true,[],"GreatRoom",[true,0]);  //1,1 GreatRoom
 var StairDown = new Directions(true,false, true,false,[],"StairDown",[true,0]); //0,1 StairDown
 var Celler = new Directions(false,true,false,false,[],"Celler",[true,0]); //0,2 Celler
 var Well = new Directions(false,true,false,false,["Key"],"Well",[true,0]); //1,2 Well
 var Coffin = new Directions(false,true,false,false,["Knife"],"Coffin",[true,0]); //2,2 Coffin
var arrayOfDirections = [
[Forest,StairDown,Celler],[Gate,GreatRoom,Well],[Cave,ArchedRoom,Coffin]
];
var currentRoom = (arrayOfDirections[currentLocation[0]][currentLocation[1]]);
