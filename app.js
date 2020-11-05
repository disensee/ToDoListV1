const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", (req, res) => {
  let day = date.generateDay();

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


app.get("/about", (req, res)=>{
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
