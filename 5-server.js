// (A) SETTINGS - CHANGE TO YOUR OWN!
const port = 3000,
mail = "your@email.com",
publicKey = "BIFI6E9ATlIJdXHSVh4qI0KT2BnsnQ203BwlGQoc96ADBE78qnr9r0HhYZuqrZ9Ju-f13wjGvV5xUUE5rjkBG9A",
privateKey = "3riFOZbw6nZo1jeRJrHfCjniFlFx_KzdDqOAZhOiMrU";

// (B) LOAD MODULES
const express = require("express"),
bodyParser = require("body-parser"),
path = require("path"),
webpush = require("web-push");

// (C) HTTP SETUP SERVER
webpush.setVapidDetails("mailto:" + mail, publicKey, privateKey);
const app = express();
app.use(express.static(__dirname)); // SERVE STATIC FILES
app.use(bodyParser.json()); // JSON PARSER
console.log(__dirname)

// (D) SERVE TEST HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/3-perm-sw.html"));
});

// (E) SEND TEST PUSH NOTIFICATION
app.post("/", (req, res) => {
  res.status(201).json({}); // REPLY WITH 201 (CREATED)


  let i = 0;
  setInterval(() => {
    const payload = JSON.stringify({ title: 'Hello!', body: i++ });
    console.log('sending', i)
   webpush.sendNotification(req.body, JSON.stringify({
    title: "Welcome!",
    body: "Yes, it works!",
    icon: "i-loud.png",
    image: "i-zap.png"
  }))
  .catch((err) => { console.log(err); });
  }, 2500);


  
});

// (F) START!
app.listen(port, () => {
  console.log(`Server deployed at ${port}`)
});
