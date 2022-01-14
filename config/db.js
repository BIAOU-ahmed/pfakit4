// connection
const Sequelize = require('sequelize')
// let mysqlConection = mysql.createConnection({
//     host:'localhost',
//     user: 'root',
//     password:'',
//     database:'pjtakit4'
// })
// mysqlConection.connect((err)=>{
//     if (err) {
//         console.log('erreur lors de la connection');
//     } else {
//         console.log('success');
//     }
// })

const sequelize = new Sequelize('pjtfakit4', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
  });

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize