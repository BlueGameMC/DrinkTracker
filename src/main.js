

//load current date as string in mm/dd/yyyy
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

//Get cookies and load every saved drink
var drinkString = getCookie("regDrinks");
var drinkArray = drinkString.split("|");
var recentList = document.getElementById("recentList");
var drinkHistory = arrayStringFix(getCookie("drinkHistory").split("|"));

var drinkDropdown = document.getElementById("savedDrinks");

for (var i = 0; i < drinkArray.length; i++) {
    drinkDropdown.innerHTML += '<option value="' + drinkArray[i] + '"></option>';
}

updateStats();
loadRecentDrinks();

createFlavorGraph();

function loadRecentDrinks() {
    let reDrinksArray = sortLastList();
    recentList.innerHTML = "";
    for (var i = 1; i <= reDrinksArray.length; i++) {
        let currentDrink = reDrinksArray[reDrinksArray.length - i].split("~");
        let drinkPar = "\'" + currentDrink[0] + "\'" + "," + "\'" + currentDrink[1] + "\'";
        recentList.innerHTML += '<a>' + currentDrink[0] + " - " + currentDrink[1] + '</a> <input id="editButton" style="float:right; position:relative; margin-right:10px" type="button" value="E" onclick="editDrink(' + drinkPar + ')"> <input id="deleteButton" style="float:right; margin-right:10px;" type="button" value="X" onclick="deleteDrink(' + drinkPar + ')"> <hr>';
    }
}

function switchSortOrder() {
    if (document.getElementById("sortDir").value == "▲") {
        document.getElementById("sortDir").value = "▼";
    }
    else {
        document.getElementById("sortDir").value = "▲";
    }
    loadRecentDrinks();
}

function sortLastList() {
    var crit = document.getElementById("sortCrit").value;
    var sortUp = document.getElementById("sortDir").value != "▲"

    var reDrinksArray = drinkHistory.slice();

    if(crit == "added")
    {
        if(!sortUp)
        {
            var flippedArray = [];
            for(let i = reDrinksArray.length-1; i >= 0; i--)
            {
                flippedArray.push(reDrinksArray[i]);
            }
            return flippedArray;
        }
        return drinkHistory;
    }

    while (true) {

        let valueChanged = false;
        for (let i = 0; i < reDrinksArray.length - 1; i++) {
            let element1 = reDrinksArray[i];
            let element2 = reDrinksArray[i + 1];
            if (crit == "alpha") {
                if ((element1.localeCompare(element2) == -1 && sortUp) || (element1.localeCompare(element2) == 1 && !sortUp)) {
                    reDrinksArray[i] = element2;
                    reDrinksArray[i + 1] = element1;
                    valueChanged = true;
                }
            }
            if(crit == "drank")
            {
                if ((compareDates(element1.split("~")[1],element2.split("~")[1]) == 1 && sortUp) || (compareDates(element1.split("~")[1],element2.split("~")[1]) == -1 && !sortUp)) {
                    reDrinksArray[i] = element2;
                    reDrinksArray[i + 1] = element1;
                    valueChanged = true;
                }
            }

        }
        if(!valueChanged)
        {
            break;
        }
    }

    return reDrinksArray;

}

function createFlavorGraph()
{
    var flavorData = [];
    for(let i = 0; i < drinkHistory.length; i++)
    {
        if(flavorDataArray(flavorData, drinkHistory[i].split("~")[0]) != false)
        {
            let index = flavorDataArray(flavorData, drinkHistory[i].split("~")[0]);
            flavorData[index][1] += 1;
        }
        else
        {
            flavorData.push([drinkHistory[i].split("~")[0],1]);
        }
    }

    console.log(flavorData);

    var graph = new barGraph(flavorData, document.getElementById("flavorCanvas"), 120);
}

function flavorDataArray(arr, value)
{
    for(let i = 0; i < arr.length; i++)
    {
        element = arr[i];
        if(element[0] == value)
        {
            return i;
        }
    }
    return false;
}

function compareDates(date1, date2)
{
    let dateArr1 = date1.split("/");
    let dateArr2 = date2.split("/");

    if(dateArr1[2] > dateArr2[2])
    {
        return 1;
    }
    if(dateArr1[0] > dateArr2[0])
    {
        return 1;
    }
    if(dateArr1[1] > dateArr2[1])
    {
        return 1;
    }
    if(date1 == date2)
    {
        return 0;
    }
    else
    {
        return -1;
    }

}

function editDrink(drinkName, drinkDate) {
    console.log(drinkDate)
    let drinkIndex = (findIndexofDrink(drinkHistory, drinkName, drinkDate));
    let drinkEl = drinkHistory[drinkIndex].split("~");

    drinkHistory.splice(drinkIndex, 1);

    let newDrinkEl = ["", ""];
    newDrinkEl[0] = prompt("Edit the name of the drink: (don't edit box to keep the same)", drinkEl[0]);
    newDrinkEl[1] = prompt("Edit the date of the drink: (MUST be in mm/dd/yyyy format!)", drinkEl[1]);
    let newDrinkStr = newDrinkEl[0] + "~" + newDrinkEl[1];
    drinkHistory.push(newDrinkStr);
    historyArraytoCookie(drinkHistory);
    location.reload();
}

function deleteDrink(drinkName, drinkDate)
{
    let drinkIndex = (findIndexofDrink(drinkHistory, drinkName, drinkDate));
    drinkHistory.splice(drinkIndex, 1);
    historyArraytoCookie(drinkHistory);
    location.reload();
}

function historyArraytoCookie(historyArray) {
    console.log(historyArray);
    let historyCookie = ""
    for (let i = 0; i < historyArray.length; i++) {
        if (historyArray[i].length > 2) {
            historyCookie += historyArray[i] + "|";
        }
    }
    console.log(historyCookie);
    setCookie("drinkHistory", historyCookie, 800);
}

function findIndexofDrink(drinkList, drinkName, drinkDate) {
    for (let i = 0; i < drinkList.length; i++) {
        let drinkEl = drinkList[i].split("~");
        if (drinkEl[0] == drinkName && drinkEl[1] == drinkDate) {
            return i;
        }
    }
}

function updateStats()
{
    let statsText = document.getElementById("statsText");
    statsText.innerText = "Total Drank: " + drinkHistory.length;
}

function submitDrink() {
    var submittedDrink = document.getElementById("drankInput").value;
    if (!drinkString.includes(submittedDrink)) {
        drinkString = getCookie("regDrinks");
        drinkString += "|" + submittedDrink;
        setCookie("regDrinks", drinkString, 800);
    }

    var drinkHistory = getCookie("drinkHistory");
    drinkHistory += "|" + submittedDrink + "~" + today;
    setCookie("drinkHistory", drinkHistory, 800);

    location.reload();
}

function clearAll() {
    setCookie("drinkHistory", "", 800);
    setCookie("regDrinks", "", 800);
    location.reload();
}

function arrayStringFix(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > 0) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}