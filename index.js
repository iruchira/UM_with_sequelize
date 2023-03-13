const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const routes = require ("./Routes/userRoutes.js");
require ("./Models/indexx");

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port,() => console.log("API server is running...."));

app.get('/',(request,response)=>{
    response.json({info: 'Node.js,Express,Postgesql API'})
});
app.use("/user",routes);