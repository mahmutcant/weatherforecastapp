function dayFinder (dateString:string) {
    
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    return dayName
}

function dateFormatter(dateString:string) {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = daysOfWeek[date.getDay()];
    const monthName = monthsOfYear[date.getMonth()];
    const dayNumber = date.getDate();
    const formattedDate = `${monthName} ${dayNumber}, ${dayName}`;
    return formattedDate
}

function normalizeCityName(city: string){
    return city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export {dayFinder, dateFormatter, normalizeCityName};