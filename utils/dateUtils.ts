const DATES_IN_MONTH = [0,30,30,30,30,30,30,30,30,30,30,30,30];
function getDatesInMonth (month=1){
    return DATES_IN_MONTH[month];
}

function parseDate (date:string|number){
    const dateObj = new Date(date);
    const parsedDate:{date:number,day:number,month:number,year:number}={date:1,year:1,day:1, month:1};
    parsedDate.date = dateObj.getDate();
    parsedDate.day = dateObj.getDay();
    parsedDate.month = dateObj.getMonth()+1;
    parsedDate.year = dateObj.getFullYear();
    return parsedDate;
}
type TypeFIlter = "weekly"|"monthly"|"yearly"
function genFilter (type:TypeFIlter){
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
        monthFilter =getPrevMonth(month);
        if(monthFilter===12){
            yearFilter-=1;
        } 
    }
    return ""+yearFilter+"-"+monthFilter+"-"+dateFilter;
}

//returns the previous month assuming the first month is 1 and the last is 12
function getPrevMonth(currentMonth:number){
    if(currentMonth==1){
        return 12;
    }else{
        return currentMonth-1;
    }
}
module.exports = {
    getDatesInMonth,
    parseDate,
    getPrevMonth,
    genFilter,
};