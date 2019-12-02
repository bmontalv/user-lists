const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
})

let favoruriteUserSaved = {}

app.get('/users/:nickname', function (req, res) {
  const nickname = req.params.nickname;
  res.send(favoruriteUserSaved[nickname]);
});

app.post('/users/:nickname', function (req, res) {
  const nickname = req.params.nickname;
  const userList = req.body;

  Object.assign(favoruriteUserSaved, {[nickname]: userList})
  res.send(favoruriteUserSaved);
});

app.listen(3000, function () {
  console.log('Endpoint running and listening on port 3000!');
});
