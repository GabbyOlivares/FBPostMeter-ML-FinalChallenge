  console.log("here goes the bubble code")
  //Call data
  d3.csv("facebook_mock.csv").then((importedData) => {
      var data = importedData;
      //console.log(data);
      //Let's crea the arrays to make the plot
      var xArray =[]
      var yArray =[]
      var zArray=[]
      var tarray=[]
      var gArray =[]
      data.forEach(function(d) {
        var xn = +d.comment;
        var yn = +d.share;
        var zn = +d.like;
        var tn = d.Type;
        var gn = d.Clus_km;

        //console.log(zn);
        //Let's add each one to the correspondent array
        xArray.push(xn);
        yArray.push(yn);
        zArray.push(zn);
        tarray.push(tn);
        gArray.push(gn);
        
       //Plot
       var trace1 = {
        x: zArray,
        y: yArray,
        text: tarray,
        mode: 'markers',
        marker: {
          color: gArray,
          colorscale: 'Portland',
          size: xArray
        }
      };
      
      var dataBubble = [trace1];
      
      var layout = {
        title: 'Comparison between likes, shares and commets to render a successful post',
        xaxis: {
            title: {
              text: 'Likes'}},
        yaxis:{
            title:{
              text: 'Comment'
            }},
        height: 600,
        width: 1400
      };
      
      Plotly.newPlot('bubble', dataBubble, layout);
        
        
      });
  });

 