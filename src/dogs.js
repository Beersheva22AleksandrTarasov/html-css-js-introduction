const detailsImageElement = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAncors = document.querySelectorAll(".thumbnails-ancor");
const detailsSectionElement = document.querySelector(".details-section");
const HIDDEN = "hidden";
const POINT_CLASS = "is-point";
for(let i = 0; i < thumbnailsAncors.length; i++){
    thumbnailsAncors[i].addEventListener("click", function() {
        setDetails(thumbnailsAncors[i]);
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
    detailsSectionElement.classList.remove(HIDDEN);
    
}
function hideDetails(){
    detailsSection.classList.add(HIDDEN);
}