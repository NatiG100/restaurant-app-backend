const {Router} = require('express');
const { updateApplicationSetting, getapplicationSetting } = require('../controllers/ApplicationSettingControllers');

const ApplicationSettingRouter = Router();
ApplicationSettingRouter.patch('/',updateApplicationSetting);
ApplicationSettingRouter.get('/',getapplicationSetting);
module.exports = ApplicationSettingRouter;