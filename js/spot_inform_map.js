//get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ScenicSpotID,'${getCookie('focus_SpotId')}')&$top=30&$format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        mapview(ary);
    });

function mapview(ary) {
    let map = L.map('map', {
        center: [ary[0].Position.PositionLat, ary[0].Position.PositionLon],
        zoom: 15
    })
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiamVycnk4NzgiLCJhIjoiY2t4N2lsd25hMm5xNjJ2cDlrNjZzcTl5NyJ9.GpH8BvC7Pm5neg0b2sJEHA'
    }).addTo(map);
    //將景點位置印出來
    let IconText = L.divIcon({
        html: '<p>✔</p>',
        className: 'IconText',
    });
    L.marker([ary[0].Position.PositionLat, ary[0].Position.PositionLon], { icon: IconText }).addTo(map);
}