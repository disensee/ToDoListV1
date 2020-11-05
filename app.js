const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let items = ["Buy food", "Cook food", "Eat food"];

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    date: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  var addedItem = req.body.toDoListItem;

  if(addedItem){
    items.push(req.body.toDoListItem);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
