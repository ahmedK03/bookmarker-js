var siteName = document.getElementById('SiteName');
var siteURL = document.getElementById('SiteURL');
var list = []

//inputs validation
function validate() {
    var warningText = document.querySelector("#warningArea")
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (siteName.value == "" || siteURL.value == "") {
        // alert("please fill in the fields")
        warningText.textContent = "please fill in the fields";
        return false // to stop it from being displayed
    }
    if (!siteURL.value.match(regex)) {
        // alert("please use a valid URL format")
        warningText.innerHTML = "please use a valid URL format, starts with <span class='text-primary'>https://</span>";
        siteURL.value = ""
        return false
    } else {
        getLinkData()
    }
}

//add bookmark data
function getLinkData() {
    var bookMarksDetails = {
        name: siteName.value,
        url: siteURL.value,
    }

    list.push(bookMarksDetails);
    localStorage.setItem('Bookmarks', JSON.stringify(list))
    bookMarksDisplay()
    clear()
}

// local storage initail conditions

if ((localStorage.getItem('Bookmarks') == null)) {
    //init array
    list = []
} else {
    //get data from localStarage
    list = JSON.parse(localStorage.getItem('Bookmarks'));
    bookMarksDisplay()
}

// display data 
function bookMarksDisplay() {
    var tableView = ``
    for (var i = 0; i < list.length; i++) {
        tableView += `
        <ul class="d-flex list-unstyled mt-2  mx-3 mb-3 well">
                            <li class="mt-2"><span>#${i}</span></li>
                            <li class="px-4"><h4 id="link-name" class="my-1">
                            ${list[i].name}</h4></li>
                            <li class="px-2">
                            <a href="${list[i].url}" class="btn btn-success mr-3" target="_blank"> Visit <i class="fas fa-fighter-jet"></i></a></li>
                            <li class="px-2">
                            <button class="btn btn-warning" onclick='Erase(${i})'> Erase <i class="fas fa-eraser"></i></button></li>
                        </ul>`
    }
    document.getElementById('tableView').innerHTML = tableView;
}

//clear data
function clear() {
    siteName.value = '';
    siteURL.value = '';
}

// remove item
function Erase(index) {
    list.splice(index, 1);
    localStorage.setItem('Bookmarks', JSON.stringify(list));
    //Re-display after deletion 
    bookMarksDisplay();
}