require('dotenv').config()
const {PORT,MONGO_DB_CONNECTION} = process.env;

const app = require("./app");
const port =  process.env.PORT||PORT;

const mongoose = require('mongoose');

//connect to the db then start server
main().then(()=>{
    app.listen(port,()=>{
        console.log(`Restaurant menu app listening on port ${port}`);
    })
}).catch(err=>{
    console.log("Error while connecting to the database");
    console.log(err);
})

// function to connect to the db
async function main(){
    await mongoose.connect(`${MONGO_DB_CONNECTION}`)
}


