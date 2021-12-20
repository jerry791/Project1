let group = [];
let markerlayers = [];
//arr用來存放json資料
let arr = [];
var tmp = document.querySelector('iframe');
//get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//set leaf map
const map = L.map('map').setView([22.5, 122], 8);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 25,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamVycnk4NzgiLCJhIjoiY2t4N2lsd25hMm5xNjJ2cDlrNjZzcTl5NyJ9.GpH8BvC7Pm5neg0b2sJEHA'
}).addTo(map);
//ini 讀取
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(City,'${region.value}')&$top=30&$format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        arr = response.data;
        console.log(arr);
        //map生成出來
        mapview(arr);
    });
//監聽select是否有更換
region.addEventListener('change', function() {
    axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(City,'${region.value}')&$top=30&$format=JSON`, {
                headers: getAuthorizationHeader()
            }
        )
        .then(function(response) {
            arr = response.data;
            mapview(arr);
        });
})
type.addEventListener('change', function() {
    axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(City,'${region.value}') and contains(Class,'${type.value}')&$top=30&$format=JSON`, {
                headers: getAuthorizationHeader()
            }
        )
        .then(function(response) {
            arr = response.data;
            mapview(arr);
        });
})

function mapview(ary) {
    let length = ary.length;
    let i = 0;
    map.setView([ary[0].Position.PositionLat, ary[0].Position.PositionLon], 15);
    markerlayers = [];
    for (i; i < length; i++) {
        let j = i + 1;
        let IconText = L.divIcon({
            html: '<p>' + j + '</p>',
            className: 'IconText',
        });
        let marklayer = new L.marker([ary[i].Position.PositionLat, ary[i].Position.PositionLon], { icon: IconText })
        markerlayers.push(marklayer);
    }
    map.removeLayer(group);
    group = L.layerGroup(markerlayers);
    map.addLayer(group);
}
tmp.addEventListener('mouseover', function() {
    console.log('check');
    let a = getCookie('focus_marker');
    map.setView([arr[a].Position.PositionLat, arr[a].Position.PositionLon], 15);
})