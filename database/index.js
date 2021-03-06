const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'airbnb',
  'root',
  // '',
  'root',
  {
    host: 'localhost',
    // the host value below is exposed in IPv4 adress of docker container
    // host: '172.17.0.2',
    dialect: 'mysql',
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize;