const express = require('express');
const { fetchAllNotifications, seeAllNotifications } = require('../controllers/NotificationControllers');
const NotificationRoute = express.Router();

NotificationRoute.get('/',fetchAllNotifications);
NotificationRoute.post('/see',seeAllNotifications);

module.exports = NotificationRoute;