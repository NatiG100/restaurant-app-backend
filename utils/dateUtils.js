function parseDate (date=""){
    const dateObj = new Date(date);
    const parsedDate = {};
    parsedDate.date = dateObj.getDate();
    parsedDate.day = dateObj.getDay();
    parsedDate.month = dateObj.getMonth()+1;
    parsedDate.year = dateObj.getFullYear();
    return parsedDate;
}
module.exports = {
    parseDate
}