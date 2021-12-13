const card1 = document.querySelector("#card1");
const card2 = document.querySelector("#card2");
const card3 = document.querySelector("#card3");
const card4 = document.querySelector("#card4");
const region = document.querySelector(".region");
const type_row = document.querySelector(".type-row");
const boardimg = document.querySelector(".board").children[0];
const title = document.querySelector("h1");
const opentime = document.querySelector("#opentime");
const tel_number = document.querySelector("#tel_number");
const Location = document.querySelector("#location");
const link = document.querySelector("#link");
const discribe_test = document.querySelector(".discribe").children[0];
const crumb_Name = document.querySelectorAll(".crumb-item")[2];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(ID,'${getCookie('focus_FoodId')}')&$top=30&$format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        console.log(ary);
        //curmb文字
        crumb_Name.textContent = ary[0].Name;
        //看板圖片
        if (ary[0].Picture.PictureUrl1) {
            boardimg.src = ary[0].Picture.PictureUrl1;
        }
        //位置文字
        region.textContent = ary[0].City;
        //類型文字
        let tag_type = document.createElement("div");
        tag_type.setAttribute('class', 'tag-type');
        if (ary[0].Class) {
            tag_type.innerHTML = `<p>` + ary[0].Class + `</p>`;
            let cloneElement = tag_type.cloneNode(true);
            type_row.appendChild(cloneElement);
        }
        //大標(地名)文字
        title.textContent = ary[0].Name;
        //開放時間
        if (ary[0].OpenTime) {
            opentime.children[1].textContent = ary[0].OpenTime;
        }
        //電話
        if (ary[0].Phone) {
            tel_number.children[1].textContent = ary[0].Phone;
        }
        //地點
        if (ary[0].Address) {
            Location.children[1].textContent = ary[0].Address;
        }
        //link
        if (ary[0].WebsiteUrl) {
            link.children[1].children[0].setAttribute('target', '_blank');
            link.children[1].children[0].href = ary[0].WebsiteUrl;
            link.children[1].children[0].textContent = ary[0].Name + "網頁連結";
        }
        //說明
        if (ary[0].Description) {
            discribe_test.textContent = ary[0].Description;
        }
    });
card1.addEventListener('click', function GotoInform() {
    location.href = 'index.html';
});
card2.addEventListener('click', function GotoInform() {
    location.href = 'index.html';
});
card3.addEventListener('click', function GotoInform() {
    location.href = 'index.html';
});
card4.addEventListener('click', function GotoInform() {
    location.href = 'index.html';
});

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