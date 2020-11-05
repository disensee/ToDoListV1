const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  let addedItem = req.body.toDoListItem;

  if(req.body.list === "Work List"){
      workItems.push(addedItem)
      res.redirect("/work");
  }else{
    items.push(req.body.toDoListItem);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render('list',{listTitle: "Work List", newListItems: workItems})
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
})
