$(document).ready(function () {
    $.ajax({
        url: "https://traveller.talrop.works/api/v1/places/categories/",
        success: function (response) {
            console.log(response.data);
            let categories = response.data;
            let categories_html = "";
            categories.forEach((category) => {
                categories_html += `<li>
                <a href="#">
                    <img
                        class="rest"
                        src="${category.image}"
                        alt="${category.name}"
                    />
                    <span>${category.name}</span>
                </a>
            </li>`;
            });

            $("div.head ul").append(categories_html);
        },
    });
    $.ajax({
        url: "https://traveller.talrop.works/api/v1/places/",
        success: function (response) {
            let places = response.data;
            console.log(places);
            let places_html = "";
            places.forEach((place) => {
                places_html += `<div class="item">
                <a href="#">
                    <div class="top">
                        <img src="${place.image}" alt="${place.name}" />
                    </div>
                    <div class="middle"><h3>${place.name}</h3></div>
                    <div class="bottom">
                        <img src="images/place.svg" alt="Image" />
                        <span>${place.location}</span>
                    </div>
                </a>
            </div>`;
            });

            $("div.items").append(places_html);
        },
    });
});

if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(function(){
        console.log("Service Worker Registerd")
    });
}
