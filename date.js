function formatDate(Date){
    const yyyy = Date.getFullYear();
    const mm = String(Date.getMonth() + 1).padStart(2,'0');
    const dd =String(Date.getDate()).padStart(2, '0');
    return `${yyyy}- ${mm}-${dd}`;
}

function getDateNDaysAgo(n){
    const now = new Date();         //This code will show the current date
    now.setDate(now.getDate() - n); //This line here subtract the n days
    return formatDate(now)
}

export const dates = {
    startDate: getDateNDaysAgo(3), //This line here will alter days to increase/decrease data set
    endDate: getDateNDaysAgo(1) //with this line we leave 1 to get yesterday's data
}