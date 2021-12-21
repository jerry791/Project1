const board_one = document.querySelector('#one').children[0];
const board_two = document.querySelector('#two').children[0];
const board_thr = document.querySelector('#thr').children[0];
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24top=100&%24format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        console.log(ary);
        postboard(ary);
    });

function postboard(ary) {
    let a = Math.floor(Math.random() * 100);
    console.log(a);
    if (!ary[a].Picture.PictureUrl1) {
        a = Math.floor(Math.random() * 100);
        console.log(a);
    }
    console.log("end", a);
    let b = Math.floor(Math.random() * 100);
    console.log(b);
    if (!ary[b].Picture.PictureUrl1 || b == a) {
        b = Math.floor(Math.random() * 100);
        console.log(b);
    }
    console.log("end", b);
    let c = Math.floor(Math.random() * 100);
    console.log(c);
    if (!ary[c].Picture.PictureUrl1 || c == a || c == b) {
        c = Math.floor(Math.random() * 100);
        console.log(c);
    }
    console.log("end", c);
    board_one.src = ary[a].Picture.PictureUrl1;
    board_two.src = ary[b].Picture.PictureUrl1;
    board_thr.src = ary[c].Picture.PictureUrl1;
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
    let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    return { 'Authorization': Authorization, 'X-Date': GMTString };
}