const app = require("./app");
const port = '4000';
const mongoose = require('mongoose');

main().then(()=>{
    app.listen(port,()=>{
        console.log(`Example app listening on port ${port}`);
    })
}).catch(err=>{
    console.log("Error while connecting to the database");
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/restaurant-menu')
}


