const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-ancor");
const detailsSectionElement = document.querySelector(".details-section");
const POINT_CLASS = "is-point";
const mainSection = document.querySelector("main");
const HIDDEN = "hidden";
for(let i = 0; i < thumbnailsAnchors.length; i++){
    thumbnailsAnchors[i].addEventListener("click", function() {
        setDetails(thumbnailsAnchors[i]);
    })
}
function setDetails(anchor){
    showDetails();
    detailsImageElement.src = anchor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
    detailsSectionElement.classList.add(POINT_CLASS);
    setTimeout(function() {
        detailsSectionElement.classList.remove(POINT_CLASS);
    })
}
function showDetails(){
    mainSection.classList.remove(HIDDEN);
    
}
function hideDetails(){
    mainSection.classList.add(HIDDEN);
}