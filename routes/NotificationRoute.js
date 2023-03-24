const express = require('express');
const { fetchAllNotifications, seeAllNotifications, DeleteAllNotifications } = require('../controllers/NotificationControllers');
const NotificationRoute = express.Router();

NotificationRoute.get('/',fetchAllNotifications);
NotificationRoute.post('/see',seeAllNotifications);
NotificationRoute.delete('/',DeleteAllNotifications)

module.exports = NotificationRoute;