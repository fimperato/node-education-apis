import dateFormat, { masks } from "dateformat";
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express()

// cors available:
// app.use(cors({origin: ['https://ifrancesco.web.app']}, {methods: ['GET']} ));
// app.use(cors({ origin: '*' }));
const whitelist = ['https://ifrancesco.web.app']
const dinamycWhitelistCorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

// APIs
app.all('/', (req, res) => {
    console.log("Request parsed succesfully")

    res.send('Express application is now up and running.')
})

// education api and custom cors apply
app.all('/education',
  cors(
      { origin: ['https://ifrancesco.web.app'] },
      { methods: ['GET'] } ),
  (req, res) => {
    let rawdata = fs.readFileSync('assets/about_education.json');
  	let educationData= JSON.parse(rawdata);

  	// Logs
  	let dateNow = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  	let dateLogPrefix = "[" + dateNow + "] - ";
  	let educationStr = JSON.stringify(educationData);
  	console.log(dateLogPrefix + 'Education data read : ' + educationStr);

  	res.send(educationData)
})



app.listen(process.env.PORT || 3000)
