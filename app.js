const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

var items = ["Buy food", "Cook food", "Eat food"];

app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    date: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  items.push(req.body.toDoListItem);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
