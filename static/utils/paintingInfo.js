import { isTranslate } from "./clickHandle.js";
// Function to display painting info when the user clicks on/look at/or near a painting
export function displayPaintingInfo(data) {
    // Get the div element where the painting info will be displayed
    const infoDiv = document.querySelector("#painting_info");
    //change the content of the div element to the painting info
    if (isTranslate) {
        data.info.title_en
            ? document.querySelector("#painting_title").textContent = data.info.title_en
            : document.querySelector("#painting_title").textContent = data.info.title;
        // document.querySelector("#painting_poem").innerHTML = `"${data.info.poem_en}"`;
        data.info.poem_en
            ? document.querySelector("#painting_poem").innerHTML = `"${data.info.poem_en}"`
            : document.querySelector("#painting_poem").innerHTML = `"${data.info.poem}"`;
        data.info.description_en
            ? document.querySelector("#painting_description").innerHTML = data.info.description_en
            : document.querySelector("#painting_description").innerHTML = data.info.description;
        data.info.material_en
            ? document.querySelector("#painting_material").textContent = data.info.material_en
            : document.querySelector("#painting_material").textContent = data.info.material;
    } else {
        document.querySelector("#painting_title").textContent = data.info.title;
        document.querySelector("#painting_description").innerHTML = data.info.description;
        document.querySelector("#painting_poem").innerHTML = `"${data.info.poem}"`;
        document.querySelector("#painting_material").textContent = data.info.material;
    }
    document.querySelector("#painting_year").textContent = data.info.year;
    document.querySelector("#painting_size").textContent = data.info.size;
    document.querySelector("#painting_link").src = data.link;
    document.querySelector("#paintingID").textContent = data.info.paintingID + 1;
    document.querySelector("#painting_price").value = `${moneyToString(data.info.price)} VND`;
    document.querySelector("#price").value = data.info.value;
    document.querySelector("#price").step = 100000;
    document.querySelector("#price").min = data.info.price;
    purchare_btn.textContent = "Đặt Mua - Purchare"

    if (!data.info.isBuyAble) {
        document.querySelector('#isSold').style.display = "none";
        document.querySelector("#purchare_form_div").style.display = "none";
        document.querySelector("#painting_description").style.display = "none";
    } else {
        document.querySelector("#purchare_form_div").style.display = "block";
        if (data.info.isBought) {
            document.querySelector("#purchare_form button").disabled = true;
            document.querySelector('#isSold').style.display = "block";
        } else {
            document.querySelector('#isSold').style.display = "none";
            document.querySelector("#purchare_form button").disabled = false;
        }
    }
    // document.querySelector("#painting_title").textContent = data.info.title_en;
    // document.querySelector("#painting_poem").innerHTML = `"${data.info.poem_en}"`;
    // document.querySelector("#painting_description").innerHTML = data.info.description_en;


    // Add the active class to the div element to display it
    infoDiv.classList.add("show");
}

// Function to hide the painting info when the user is not looking at a painting
export function hidePaintingInfo() {
    // Get the div element where the painting info is displayed
    const infoDiv = document.querySelector("#painting_info");
    // Remove the active class from the div element to hide
    infoDiv.classList.remove("show");
}

function moneyToString(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}