function compareDates(date1, date2)
{
    let dateArr1 = date1.split("/");
    let dateArr2 = date2.split("/");

    if(dateArr1[2] > dateArr2[2])
    {
        // console.log(date1 + " is 2greater than " + date2);
        return 1;
    }
    else if(dateArr1[2] < dateArr2[2])
    {
        return -1;
    }

    if(dateArr1[0] > dateArr2[0])
    {
        // console.log(date1 + " is 2greater than " + date2);
        return 1;
    }
    else if(dateArr1[0] < dateArr2[0])
    {
        return -1;
    }

    if(dateArr1[2] > dateArr2[2])
    {
        // console.log(date1 + " is 2greater than " + date2);
        return 1;
    }
    else if(dateArr1[2] < dateArr2[2])
    {
        return -1;
    }

    return 0;

}

var monthArr = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function addZero(num)
{
    if((""+num).length == 1)
    {
        return "0" + num;
    }
    return num;
}