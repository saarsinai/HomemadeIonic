import 'dotenv/config';
import restful from 'node-restful';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import babelRegister from 'babel-register';

const mongoose = restful.mongoose;
const app = express();

console.logJson = (obj) => console.log(JSON.stringify(obj));
console.errorJson = (obj) => console.error(JSON.stringify(obj));

babelRegister();
expressConfig(app);
routesConfig(app);
mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);

app.get('/', function (req, res) {
  res.send('Homemade server is up!')
});

app.listen(process.env.PORT);
