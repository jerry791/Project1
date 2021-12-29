const board_one = document.querySelector('#one').children[0];
const board_two = document.querySelector('#two').children[0];
const board_thr = document.querySelector('#thr').children[0];
const SpotCard = document.querySelector('.hot-spot').children[1].children;
const FoodCard = document.querySelector('.hot-food').children[1].children;
const HotSpot = document.querySelectorAll('.inform');
const HotSpotImg = document.querySelectorAll('#SpotImg');
const HotFoodImg = document.querySelectorAll('#FoodImg');
const HotFood = document.querySelectorAll('#Food');
const boardtext = document.querySelectorAll('.board-text');
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=100&%24format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        postboard(ary);
        hot_spot(ary);
    });
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24top=100&%24format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        console.log(ary);
        hot_food(ary);
    });

function postboard(ary) {
    let ranary = random(100);
    let i = 0;
    while (ranary[i]) {
        if (ary[ranary[i]].Picture.PictureUrl1 == undefined) {
            ranary.splice(i, 1);
            i = 0;
        } else {
            i++;
        }
    }
    board_one.src = ary[ranary[0]].Picture.PictureUrl1;
    boardtext[0].children[0].textContent = ary[ranary[0]].ScenicSpotName;
    boardtext[0].children[1].textContent = ary[ranary[0]].Address.substr(0, 3);
    board_two.src = ary[ranary[1]].Picture.PictureUrl1;
    boardtext[1].children[0].textContent = ary[ranary[1]].ScenicSpotName;
    boardtext[1].children[1].textContent = ary[ranary[1]].Address.substr(0, 3);
    board_thr.src = ary[ranary[2]].Picture.PictureUrl1;
    boardtext[2].children[0].textContent = ary[ranary[2]].ScenicSpotName;
    boardtext[2].children[1].textContent = ary[ranary[2]].Address.substr(0, 3);
}

function hot_spot(ary) {
    let ranary = random(100);
    let i = 0;
    while (ranary[i]) {
        if (ary[ranary[i]].Picture.PictureUrl1 == undefined) {
            ranary.splice(i, 1);
            i = 0;
        } else {
            i++;
        }
    }
    for (let i = 0; i < 6; i++) {
        SpotCard[i].setAttribute('onclick', `Send('` + ary[ranary[i]].ScenicSpotID + `',0)`);
        HotSpotImg[i].src = ary[ranary[i]].Picture.PictureUrl1;
        HotSpot[i].innerHTML = `<p>` + ary[ranary[i]].Address.substr(0, 3) + `<br><span>` + ary[ranary[i]].ScenicSpotName + `</span></p>`;
    }
}

function hot_food(ary) {
    let ranary = random(100);
    let i = 0;
    while (ranary[i]) {
        if (ary[ranary[i]].Picture.PictureUrl1 == undefined) {
            ranary.splice(i, 1);
            i = 0;
        } else {
            i++;
        }
    }
    for (let i = 0; i < 6; i++) {
        FoodCard[i].setAttribute('onclick', `Send('` + ary[ranary[i]].RestaurantID + `',1)`);
        HotFoodImg[i].src = ary[ranary[i]].Picture.PictureUrl1;
        HotFood[i].innerHTML = `<p>` + ary[ranary[i]].Address.substr(0, 3) + `<br><span>` + ary[ranary[i]].RestaurantName + `</span></p>`;
    }
}
//隨機選擇0~x的數字
function random(x) {
    var arr = [];
    for (var i = 0; i < x; i++) { //一個從0到100的陣列
        arr.push(i);
    }
    arr.sort(function() { //隨機打亂這個陣列
        return Math.random() - 0.5;
    })
    return arr;
}

function Send(x, y) {
    if (y == 0) {
        console.log(x);
        document.cookie = 'focus_SpotId' + "=" + x;
        window.location.href = 'spot_inform.html';
    } else {
        console.log(x);
        document.cookie = 'focus_FoodId' + "=" + x;
        window.location.href = 'food_inform.html';
    }
}

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '3a0755601515441bb9810ecefc69c180';
    let AppKey = '-7jXO3yrVORCopBgQNxgZ0lpvd0';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization = 'hmac name=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}