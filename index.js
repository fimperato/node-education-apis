import dateFormat, { masks } from "dateformat";
import express from "express";
import fs from "fs";

const app = express()

app.all('/', (req, res) => {
    console.log("Request parsed succesfully")
	
    res.send('Express application is now up and running.')
})

app.all('/education', (req, res) => {
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