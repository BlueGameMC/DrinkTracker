class Calendar
{
    constructor(date,data,div)
    {
        this.date = date;
        this.data = data;
        this.parentEl = div;
        this.monthName = document.getElementById("calendarMonthName");
        this.dayParent = document.getElementById("calendarDaysParent");

        this.dateString = date.toString();

        this.month = date.getMonth() + 1;
        this.day = this.dateString.split(" ")[2];
        this.year = this.dateString.split(" ")[3];
        this.dayName = this.getDayName(this.day,this.month,this.year);

        this.createMonth(this.month,this.year)

    }

    clearCalendar()
    {
        this.dayParent.innerHTML = "";
        this.monthName.innerText = "";
    }

    createMonth()
    {
        var dayLetters = ["S","M","T","W","T","F","S"];

        var monthLength = daysInMonth(this.month,this.year);
        var firstDayName = this.getDayName("01",this.month,this.year);
        var firstDayNum = new Date(this.month + "/01/" + this.year).getDay();
        var lastDayNum = new Date(this.month + "/" + monthLength+ "/" + this.year).getDay();
        var rows = Math.ceil((monthLength + firstDayNum) / 7);

        // this.parentEl.innerHTML += "";
        this.monthName.innerText = monthArr[this.month-1] + " " + this.year;

        for(let j = 0; j < 7; j++)
        {
            this.dayParent.innerHTML += '<div style="height:30px; width: 40px; border-style: solid; margin-top:20px;">' + dayLetters[j] + '</div>';
        }

        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < 7; j++)
            {
                if(i == 0 && j < firstDayNum)
                {
                    this.dayParent.innerHTML += '<div style="height:40px; width: 40px; border-style: solid; margin-top:10px; background-color:black;"></div>';
                }
                else if(i == rows-1 && j > lastDayNum)
                {
                    this.dayParent.innerHTML += '<div style="height:40px; width: 40px; border-style: solid; margin-top:10px; background-color:black;"></div>';
                }
                else
                {
                    let matches = this.getAllOnDate(this.data, (i*7 + j + 1 - firstDayNum), this.month,this.year);
                    if(matches.length > 0)
                    {
                        this.dayParent.innerHTML += '<div title="' + matches
                        + '" style="height:40px; width: 40px; border-style: solid; margin-top:10px; text-align:left; background-color: rgb(255,' +(255-(matches.length * 40))+ ',' +(255-(matches.length * 40))+ '">'
                        + '<b style="font-size:10px; text-align:left; position:absolute; margin-left:2px;">' +(i*7 + j + 1 - firstDayNum)+ '</b>'
                        + '<p style="font-size:25px; text-align:center; margin:5px;">' +matches.length+ '</p>'
                        + '</div>';
                    }
                    else
                    {
                        this.dayParent.innerHTML += '<div style="height:40px; width: 40px; border-style: solid; margin-top:10px; text-align:left;">'
                        + '<b style="font-size:10px; text-align:left; position:absolute; margin-left:2px;">' +(i*7 + j + 1 - firstDayNum)+ '</b>'
                        + '</div>';
                    }
                }
            }
            // this.parentEl.dayParent += '<br>';
        }

    }

    getAllOnDate(data,day,month,year)
    {
        let checkDateString = addZero(month) + "/" + addZero(day) + "/"  + year;
        let allMatches = [];
        for(let i = 0; i < data.length; i++)
        {
            let drink = data[i].split("~");
            if(checkDateString == drink[1])
            {
                allMatches.push(drink[0]);
            }
        }
        return allMatches;
    }


    getDayName(day,month,year)
    {
        var date = new Date(month + "/" + day + "/" + year);
        return date.toLocaleDateString('en-US', { weekday: 'long' }); 
    }

}