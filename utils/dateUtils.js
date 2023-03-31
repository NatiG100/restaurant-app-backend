const DATES_IN_MONTH = [0,31,28,31,30,31,30,31,31,30,31,30,31];
function getDatesInMonth (month=1){
    return DATES_IN_MONTH[month];
}
function getDaysInThisMonth(){
    const {month}=parseDate(new Date())
    return getDatesInMonth(month);
}

function parseDate (date=""){
    const dateObj = new Date(date);
    const parsedDate = {};
    parsedDate.date = dateObj.getDate();
    parsedDate.day = dateObj.getDay();
    parsedDate.month = dateObj.getMonth()+1;
    parsedDate.year = dateObj.getFullYear();
    return parsedDate;
}
const types = ["weekly","monthly","yearly"]
function genFilter (type="weekly"){
    const {date,day,month,year} = parseDate(Date.now());
    let dateFilter = date;
    let monthFilter = month;
    let yearFilter = year;
    if(type="weekly"){
        dateFilter = date-day;
        if(dateFilter<1) {
            dateFilter+=getDatesInMonth(getPrevMonth(month));
            monthFilter = getPrevMonth(month);
            if(monthFilter=12){
                yearFilter-=1;
            }
        }
    }else if(type="monthly"){
        dateFilter = 1; 
    }else if(type="yearly"){
        dateFilter = 1;
        monthFilter = 1;
    }
    return ""+yearFilter+"-"+monthFilter+"-"+dateFilter;
}

//returns the previous month assuming the first month is 1 and the last is 12
function getPrevMonth(currentMonth=2){
    if(currentMonth==1){
        return 12;
    }else{
        return currentMonth-1;
    }
}

//returns a year format based on chart type;
function getDateFormat(type="all"){
    if(type==="all"){
        return "%Y";
    }else if(type==="weekly"||type==="monthly"){
        return "%d"
    }else{
        return "%m"
    }
}

//returns date match filter based on chart type
function getMatchFilter(type="all"){
    const {month,date,day,year} = parseDate(Date.now());
    let weekStarted = new Date();
    weekStarted.setDate(weekStarted.getDate()-day);
    const {month:wMonth,date:wDate,year:wYear} = parseDate(weekStarted);
    if(type==="all"){
        return "0001-01-01";
    }else if(type==="weekly"){
        return ""+wYear+"-"+wMonth+"-"+wDate;
    }else if(type==="monthly"){
        return ""+year+"-"+month+"-00";
    }else{
        return ""+year+"-0-00";
    }
};

//returns date number starting from monday to friday
const getDateOfWeek = ()=>{
    const dates = [""]
    const {month,date,day} = parseDate(Date.now());
    let monday = date-day+1;
    if(monday<1){
        monday+=getDatesInMonth(getPrevMonth(month));
    }
    for(let i=0; i<7;i++){
        let date = monday+i;
        if(date-day+1<1){
            if(i>getDatesInMonth(getPrevMonth(month))){
                date -= getDatesInMonth(getPrevMonth(month));
            }
        }else{
            if(i>getDatesInMonth(month)){
                date -= getDatesInMonth(month);
            }
        }

        dates.push(date);
    }
    return dates;
}
module.exports = {
    getDatesInMonth,
    getDaysInThisMonth,
    parseDate,
    getPrevMonth,
    genFilter,
    getDateFormat,
    getMatchFilter,
    getDateOfWeek,
};