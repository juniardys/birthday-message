require('dotenv').config()

const config = {
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    port: process.env.PORT || '3000',
};

console.log('App successfully loaded environment');
module.exports = config;