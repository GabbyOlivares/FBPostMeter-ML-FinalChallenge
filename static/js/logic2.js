// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its users
function markerSize(users) {
  return users * 1500;
}

// Each city object contains the city's name, location and users
var countries = [
  {
    name: "India",
    location: [20.593684, 78.96288],
    users: 310
  },
  {
    name: "United States",
    location: [37.09024,	-95.712891],
    users: 190
  },
  {
    name: "Indonesia",
    location: [-0.789275, 113.921327],
    users: 140
  },
  {
    name: "Brazil",
    location: [-14.235004, -51.92528],
    users: 130
  },
  {
    name: "Mexico",
    location: [23.634501, -102.552784],
    users: 92
  },
  {
    name: "Philippines",
    location: [12.879721, 121.774017],
    users: 81
  },
  {
    name: "Vietnam",
    location: [14.058324,	108.277199],
    users: 65
  },
  {
    name: "Thailand",
    location: [15.870032, 100.992541],
    users: 50
  },
  {
    name: "Egypt",
    location: [26.820553, 30.802498],
    users: 44
  },
  {
    name: "Bangladesh",
    location: [23.684994, 90.356331],
    users: 39
  },
  {
    name: "Pakistan",
    location: [30.375321, 69.345116],
    users: 39
  },
  {
    name: "United Kingdom",
    location: [55.378051, -3.435973],
    users: 38
  },
  {
    name: "Turkey",
    location: [38.963745, 35.243322],
    users: 37
  },
  {
    name: "Colombia",
    location: [4.570868,-74.297333],
    users: 36
  },
  {
    name: "France",
    location: [46.227638, 2.213749],
    users: 32
  },
  {
    name: "Argentina",
    location: [-38.416097, -63.616672],
    users: 31
  },
  {
    name: "Italy",
    location: [41.87194,12.56738],
    users: 30
  },
  {
    name: "Germany",
    location: [51.165691, 10.451526],
    users: 28
  },
  {
    name: "Nigeria",
    location: [9.081999, 8.675277],
    users: 28
  },
  {
    name: "Myanmar",
    location: [21.913965, 95.956223],
    users: 26
  }
];

// Loop through the countries array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    //color: "white",
    fillColor: "blue",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its users
    radius: markerSize(countries[i].users)
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>FB users (millions): " + countries[i].users + "</h3>").addTo(myMap);
}
