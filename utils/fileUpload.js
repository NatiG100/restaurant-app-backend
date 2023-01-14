const path = require('path');
const uuid= require('uuid');
const multer = require('multer');


function fileUpload(sbuPath="/"){
    const storage = multer.diskStorage({
        destination:path.join(path.dirname(require.main.filename),'/public',sbuPath),
        filename: function (req,file,cb){
            req.uploadedFileName = uuid.v4()+path.extname(file.originalname);
            cb(null,req.uploadedFileName);
            req.uploadedFileName = "/"+sbuPath+req.uploadedFileName;
        }
    });
    return multer({storage:storage});
}

module.exports = fileUpload;