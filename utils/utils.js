const { getDaysInThisMonth, getDateOfWeek } = require("./dateUtils");

const change_idToid = (Schema)=>{
    Schema.method('toClient', function() {
        var obj = this.toObject();

        //Rename fields
        obj.id = obj._id;
        delete obj._id;
    
        return obj;
    });
};

const reshapeChartData = (data, type)=>{
    const existingData = data.map((data)=>(parseFloat(data.amount)));

        //convert the aggregated data to the desired shape
        if(type==="monthly"){
            for(let i=1;i<getDaysInThisMonth()+1;i++){
                if(existingData.indexOf(i)===-1){
                    let amount = i<10?"0"+i:i.toString();
                    data.push({amount,total:0});
                }
            }
        }if(type==="yearly"){
            for(let i=1;i<13;i++){
                if(existingData.indexOf(i)===-1){
                    let amount = i<10?"0"+i:i.toString();
                    data.push({amount,total:0});
                }
            }
        }if(type==="weekly"){
            const datesOfWeek = getDateOfWeek();
            console.log(datesOfWeek)
            for(let i=1;i<8;i++){
                if(existingData.indexOf(datesOfWeek[i])===-1){
                    let amount = datesOfWeek[i]<10?"0"+datesOfWeek[i]:datesOfWeek[i].toString();
                    data.push({amount,total:0});
                }
            }
        }
        return data
}

module.exports={
    change_idToid,
    reshapeChartData,
} 