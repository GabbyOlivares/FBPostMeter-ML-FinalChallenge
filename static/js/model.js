const url = "/postmeter";

document.querySelector("#send").addEventListener("click", function(event) {
    event.preventDefault();
    var avgpagelikes = document.getElementById("avgpagelikes").value;
    console.log(avgpagelikes);
    var posttype = document.getElementById("posttype").value;
    console.log(posttype);
    var postcategory = document.getElementById("postcategory").value;
    console.log(postcategory);
    var month = document.getElementById("month").value;
    console.log(month);
    var weekday = document.getElementById("weekday").value;
    console.log(weekday);
    var hour = document.getElementById("hour").value;
    console.log(hour);
    var paid = document.getElementById("paid").value;
    console.log(paid);
    var unique = document.getElementById("unique").value;
    console.log(unique);
    
    d3.json(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avgpagelikes: avgpagelikes,
          posttype : posttype,
          postcategory : postcategory,
          month : month,
          weekday : weekday,
          hour : hour,
          paid : paid,
          unique : unique
        })
        
    })
    .then(json => {
        console.log(json)
        document.getElementById("result").innerHTML = json.result>0?'successful':'unsuccessful'  
    });
}, false);

