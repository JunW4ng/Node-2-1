const http = require('http')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const _ = require('lodash')
const chalk = require('chalk')
const  url  = require('url')

let allAppointments = []

http.createServer((req, res) => {

    url.parse(req.url, true).query
    if (req.url.includes('/list')) {

        axios.get('https://randomuser.me/api/')
            .then(({ data }) => {

                const patientData = data.results[0].name; // Data     

                const name = patientData.first; //Patient name
                const lastName = patientData.last; //Patient last name
                const id = uuidv4().slice(0, 6); //Unique Id with uuid
                const date = moment().format('MMMM Do YYYY, h:mm:ss a'); //Timestamp

                allAppointments.push(`Nombre: ${name} - Apellido: ${lastName} - ID: ${id} - Timestamp: ${date}`);

                const color = chalk.blue.bgWhite; //Blue color and white background

                let htmlList = ''

                _.forEach(allAppointments, (value, i) => {
                    
                    const patient = `${i + 1}. ${value}`
                    console.log(color(patient))

                    htmlList += `<p>${patient}</p>`
                });

                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(htmlList)
            })
            .catch((error) => {
                console.log(error);
            });
    };
}).listen(8080, () => console.log('Server ON'));