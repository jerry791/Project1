const region = document.querySelector('#region');
const type = document.querySelector('#type');
const iframe = document.querySelector('.cards');
const crumb = document.querySelector('.crumb');
//get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//ini
document.cookie = "region" + "=" + region.value;
document.cookie = "type" + "=" + type.value;
//ini crumb
let crumb_region = document.createElement("li");
crumb_region.setAttribute('class', 'crumb-item');
crumb_region.innerText = region.value;

let crumb_arror = document.createElement("img");
crumb_arror.setAttribute('src', "https://raw.githubusercontent.com/jerry791/F2E--week1/9dcbb21364edf910b964d7939bb69271f7cea1bf/Icon/crumb-right.svg");
let crumb_type = document.createElement("li");
crumb_type.setAttribute('class', 'crumb-item');
crumb_type.innerText = type.value;

crumb.appendChild(crumb_region);
crumb.appendChild(crumb_arror);
crumb.appendChild(crumb_type);
//change
region.addEventListener('change', function() {
    document.cookie = "region" + "=" + region.value;
    iframe.contentWindow.location.reload();
    crumb_region = document.querySelectorAll(".crumb-item")[2];
    crumb_region.innerText = region.value;
});
type.addEventListener('change', function() {
    document.cookie = "type" + "=" + type.value;
    iframe.contentWindow.location.reload();
    crumb.appendChild(crumb_type);
    crumb_region = document.querySelectorAll(".crumb-item")[3];
    crumb_region.innerText = type.value;
})