const {Router} = require('express');
const { updateApplicationSetting, getapplicationSetting } = require('../controllers/ApplicationSettingControllers');
const requirePermission = require('../utils/requirePermission');

const ApplicationSettingRouter = Router();
ApplicationSettingRouter.patch('/',requirePermission("Setting"),updateApplicationSetting);
ApplicationSettingRouter.get('/',requirePermission(""),getapplicationSetting);
module.exports = ApplicationSettingRouter;