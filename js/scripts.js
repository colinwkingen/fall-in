var currentLocation = [0,0];
//first index EW second NS


var mapLocation = [
    ["0,0 : Southwest corner of a quiet meadow.", "1,0 : South side of a quiet meadow.", "2,0 : Southeast corner of a quiet meadow."],
    ["0,1 : West side of a quiet meadow.", "1,1 : Dead center of a quiet meadow.", "2,1 : East side of a quiet meadow."],
    ["0,2 : Northwest corner of a quiet meadow.", "1,2 : North side of a quiet meadow.", "2,2 : Northeast corner of a quiet meadow."],

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
$(document).ready(function() {
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
});

function Directions(north, south, east, west,item) {
  this.north = north;
  this.south = south;
  this.east = east;
  this.west = west;
  this.item = item;
}
var Forest = new Directions(false,false,true,false,"sword") //0,0 Forest
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
// arrayOfDirections.prototype.findDirection = function (direction) {
//   return this[currentLocation[0]][currentLocation[1]].direction
// };

findCoordinate = function(argument)  {
  var x = currentLocation[0];
  var y = currentLocation[1];
  debugger;
  if (argument === "west") {
    return arrayOfDirections[x][y].west;
  } else if (argument === "east") {
    return arrayOfDirections[x][y].east;
  } else if (argument === "north") {
    return arrayOfDirections[x][y].north;
  } else if (argument === "south") {
    return arrayOfDirections[x][y].south;
  } else if (argument === "item") {
    debugger;
    return arrayOfDirections[x][y].item;
  }
}
