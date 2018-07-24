//======================================
//INITIALIZE VARIABLES
//======================================

//Create map and set view, get tiles for map
var map = L.map('mapid').setView([34.13, -118.04], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);  

var maptwo = L.map('small_mapid').setView([34.13, -118.04], 12);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(maptwo);  

//Dictionary of intersections, from id to intersection
var intersections = [];
//Array of selected intersection ids
var selected = [];

//Load intersection csv file
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "./frontend/IntersectionDirectory.csv",
        dataType: "text",
        success: function(data) {loadIntersections(data);}
     });
});

//Adds all intersections to map and to intersection array
function loadIntersections(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    
    
    for (var i = 0; i < lines.length; i++) {
        var name = lines[i][0].split("_").join(" ");
        var streets = lines[i][0].split("_at_");
        var keys = streets[0].split("_").concat(name[1].split("_"));
        intersections[lines[i][1]] = new Intersection(name, lines[i][1], lines[i][6], lines[i][7], keys)
    }
}


//======================================
//FUNCTIONS
//======================================

//Intersection Object Constructor
function Intersection(name, id, lat, lon, keys) {
    this.name = name;
    this.id = id;
    this.lat = lat;
    this.lon = lon;
    
    this.marker = L.marker([lat, lon]).addTo(map)
    this.marker.bindPopup(name);
    this.marker.setOpacity(.5);
    this.marker.on('click', toggleIntersection);
    this.marker.id = id;
    
    this.dummy_marker = L.marker([lat, lon])
    this.dummy_marker.bindPopup(name);
    this.dummy_marker.setOpacity(1);
    this.dummy_marker.id = id;
    
    this.added = false;
}

//When something is searched, add to selected if unselected
$("input").keypress(function(e) {
    if (e.which == 13) {
        //if inputted an intesection ID
        if (intersections[this.value] && !intersections[this.value].added) {
            selectInter(this.value)
            this.value = "";
        } else {
            for (var inter in intersections) {
                if (intersections[inter].name.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                    selectInter(inter)
                }
            }
        }
    }
})

//When a marker is clicked on the map, toggle selected/unselecteed and opacity
function toggleIntersection(e) {
    var id = e.target.id;
    
    if (!intersections[id].added) {
        selectInter(id)
    } else {
        deselectInter(id)
    }
}

function selectInter(id) {
    if (current_tab == TabEnum.MAP) {
        var intersection = intersections[id]
        
        intersection.marker.setOpacity(1);
        intersection.dummy_marker.addTo(maptwo)
        intersection.added = true;
        
        //$("ul").append("<li>" + intersection.name + "</li>");
        selected.push(id)
        selected = Array.from(new Set(selected));
        refreshList()
    }
}



Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}



function deselectInter(id) {
    if (current_tab == TabEnum.MAP) {
        var intersection = intersections[id]
        
        intersection.marker.setOpacity(.5);
        intersection.dummy_marker.remove();
        intersection.added = false;
        
        var index = -1;
        for (var i = 0; i < selected.length; i++) {
            if (selected[i] == id) {
                index = i;
            }
        }
        if(index != -1) {
    	       selected.splice(index, 1);
        }
        refreshList();
    }
}

//Update list to reflect what is currently selected
function refreshList() {
    $("ul").empty();
    for (var i = 0; i < selected.length; i++) {
        $("ul").append("<li>" + intersections[selected[i]].marker._popup.getContent() + "</li>");
    }
}