//https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON
/*get cookie by name*/
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=contains(City,'${getCookie('region')}')&$top=30&$format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        if (getCookie('type') !== "All") {
            ary = ary.filter(function(item) {
                return item.Class == getCookie('type');
            });
        }
        length = ary.length;
        let father = document.querySelector('.cards');
        for (let i = 0; i < length; i++) {
            let j = i + 1;
            let str = document.createElement("div");
            str.setAttribute('class', 'card');
            str.setAttribute('id', i);
            str.setAttribute('onmouseenter', 'mapmove(this)');
            str.setAttribute('onclick', `Send('` + ary[i].ID + `')`);
            if (!ary[i].Picture.PictureUrl1) {
                str.innerHTML = `
                <img src="Icon/food_not_exist.jpg"></img>
                <div class="discribe">
                    <div class="tag-point">
                        <p>` + j + `</p>
                    </div>
                    <div class="tag-region">
                        <p>` + ary[i].City + `</p> 
                    </div>
                    <P>` + ary[i].Name + `</P>
                    <p class="phone">` + ary[i].Phone + `</p>
                    <div class="type-row">
                    </div>
                </div>`;
            } else {
                str.innerHTML = `
                <img src="` + ary[i].Picture.PictureUrl1 + `">
                <div class="discribe">
                    <div class="tag-point">
                    <p>` + j + `</p>
                    </div>
                    <div class="tag-region">
                        <p>` + ary[i].City + `</p> 
                    </div>
                    <P>` + ary[i].Name + `</P>
                    <p class="phone">` + ary[i].Phone + `</p>
                    <div class="type-row">
                    </div>
                </div>`;
            }
            father.appendChild(str);
            let father2 = document.querySelectorAll('.type-row')[i];
            let type = document.createElement("div");
            type.setAttribute('class', 'tag-type');
            if (ary[i].Class) {
                type.innerHTML = `<p>` + ary[i].Class + `</p>`;
                father2.appendChild(type);
            }
        }
    });

function Send(x) {
    document.cookie = 'focus_FoodId' + "=" + x;
    window.parent.location.href = 'food_inform.html';
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

function mapmove(x) {
    document.cookie = "focus_marker" + "=" + x.id;
}