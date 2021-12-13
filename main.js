//**************** 'npm run dev' in the terminal ****************
const http = require('http')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const _ = require('lodash')
const chalk = require('chalk')

let allAppointments = []

http.createServer(() => {

    axios.get('https://randomuser.me/api/')
        .then(({ data }) => {

            const patientData = data.results[0].name; // Data     

            const name = patientData.first; //Patient name
            const lastName = patientData.last; //Patient last name
            const id = uuidv4().slice(0, 6); //Unique Id with uuid
            const date = moment().format('MMMM Do YYYY, h:mm:ss a'); //Timestamp

            allAppointments.push(`Nombre: ${name} - Apellido: ${lastName} - ID: ${id} - Timestamp: ${date}`);

            const color = chalk.blue.bgWhite; //Blue color and white background

            _.forEach(allAppointments, (value, key)=>{
                console.log(color(`${key}. ${value}`));
            });
            
        })
        .catch((error) => {
            console.log(error);
        });

}).listen(8080, () => console.log('Server ON'));
