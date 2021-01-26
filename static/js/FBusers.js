// Initializes the page with a default plot
function init() {

  data = [{
    x: ["2017", "2018", "2019", "2020", "2021", "2022","2023","2024","2025"],
    y: [68.14, 72.74, 76.99, 80.88, 84.4, 87.57, 90.41, 92.95, 95.22] }];
    
  var CHART = d3.selectAll("#plot").node();

  Plotly.newPlot(CHART, data);
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.node().value;

  var CHART = d3.selectAll("#plot").node();

  // Initialize x and y arrays
  var x = [];
  var y = [];

  switch(dataset) {
    case "dataset1":
      x = ["2017", "2018", "2019", "2020", "2021", "2022","2023","2024","2025"];
      y = [68.14, 72.74, 76.99, 80.88, 84.4, 87.57, 90.41, 92.95, 95.22];
      break;

    case "dataset2":
      x = ["2017", "2018", "2019", "2020", "2021", "2022","2023","2024","2025"];
      y = [54.6, 57.6, 60.3, 62.7, 64.8, 66.6, 68.1, 69.3, 70.4];
      break;

    default:
      x = ["2017", "2018", "2019", "2020", "2021", "2022","2023","2024","2025"];
      y = [68.14, 72.74, 76.99, 80.88, 84.4, 87.57, 90.41, 92.95, 95.22];
      break;
  }


  // Note the extra brackets around 'x' and 'y'
  Plotly.restyle(CHART, "x", [x]);
  Plotly.restyle(CHART, "y", [y]);
}

init();

