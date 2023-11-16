const express = require('express');
const { AllEmail, scheduleEmail } = require('../controller/user.controller');
const Router = express.Router()

// Schedule an email
Router.post('/schedule-email',scheduleEmail );

//Getting email-status
Router.get('/email-status', AllEmail);


module.exports = {
    Router
}