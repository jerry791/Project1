const region = document.querySelector('#region');
const iframe = document.querySelector('.cards');
const crumb = document.querySelector('.crumb');
const type = document.querySelector('#type');
//ini select
if (getCookie('region')) {
    region.value = getCookie('region');
}
if (getCookie('type')) {
    type.value = getCookie('type');
}
//axios database
axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(City,'${region.value}')&$top=30&$format=JSON`, {
            headers: getAuthorizationHeader()
        }
    )
    .then(function(response) {
        let ary = response.data;
        length = ary.length;
        let j = 0;
        let OrigionAry = [];
        //filter type option
        for (let i = 0; i < length; i++) {
            if (ary[i].Class1) {
                OrigionAry[j] = ary[i].Class1;
                j++;
            }
            if (ary[i].Class2) {
                OrigionAry[j] = ary[i].Class2;
                j++;
            }
            if (ary[i].Class3) {
                OrigionAry[j] = ary[i].Class3;
                j++;
            }
        }
        let NotRepeatingText = OrigionAry.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        });
        //將篩出的type放入type select的option中
        let father = document.querySelector("#type");
        let filter_type = document.createElement("option");
        j = NotRepeatingText.length;
        for (let i = 0; i < j; i++) {
            filter_type.innerText = NotRepeatingText[i];
            filter_type.setAttribute('value', NotRepeatingText[i]);
            let clone_filtertype = filter_type.cloneNode(true);
            father.appendChild(clone_filtertype);
        }
        ini();
        change();
    });

function filter_type(x) {
    type.innerHTML = '<option value="All">All</option>';
    axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(City,'${x}')&$top=30&$format=JSON`, {
                headers: getAuthorizationHeader()
            }
        )
        .then(function(response) {
            let ary = response.data;
            length = ary.length;
            let j = 0;
            let OrigionAry = [];
            //filter type option
            for (let i = 0; i < length; i++) {
                if (ary[i].Class1) {
                    OrigionAry[j] = ary[i].Class1;
                    j++;
                }
                if (ary[i].Class2) {
                    OrigionAry[j] = ary[i].Class2;
                    j++;
                }
                if (ary[i].Class3) {
                    OrigionAry[j] = ary[i].Class3;
                    j++;
                }
            }
            let NotRepeatingText = OrigionAry.filter(function(item, index, array) {
                return array.indexOf(item) === index;
            });
            //將篩出的type放入type select的option中
            let father = document.querySelector("#type");
            let filter_type = document.createElement("option");
            j = NotRepeatingText.length;
            for (let i = 0; i < j; i++) {
                filter_type.innerText = NotRepeatingText[i];
                filter_type.setAttribute('value', NotRepeatingText[i]);
                let clone_filtertype = filter_type.cloneNode(true);
                father.appendChild(clone_filtertype);
            }
            //更新crumb_type
            crumb_type = document.querySelectorAll(".crumb-item")[3];
            crumb_type.innerText = type.value;
            //ini crumb_type
            document.cookie = "type" + "=" + type.value;
        });
}
//get cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function ini() {
    //ini region and type cookies
    document.cookie = "region" + "=" + region.value;
    document.cookie = "type" + "=" + type.value;
    //add and ini crumb_region node
    let crumb_region = document.createElement("li");
    crumb_region.setAttribute('class', 'crumb-item');
    crumb_region.innerText = region.value;
    //add crumb arror node
    let crumb_arror = document.createElement("img");
    crumb_arror.setAttribute('src', "https://raw.githubusercontent.com/jerry791/F2E--week1/9dcbb21364edf910b964d7939bb69271f7cea1bf/Icon/crumb-right.svg");
    //add and ini crumb_type node
    let crumb_type = document.createElement("li");
    crumb_type.setAttribute('class', 'crumb-item');
    crumb_type.innerText = type.value;
    //add crumb path
    crumb.appendChild(crumb_region);
    crumb.appendChild(crumb_arror);
    crumb.appendChild(crumb_type);
}
//change
function change() {
    region.addEventListener('change', function() {
        document.cookie = "region" + "=" + region.value;
        iframe.contentWindow.location.reload();
        crumb_region = document.querySelectorAll(".crumb-item")[2];
        crumb_region.innerText = region.value;
        filter_type(region.value);
    });
    type.addEventListener('change', function() {
        document.cookie = "type" + "=" + type.value;
        iframe.contentWindow.location.reload();
        crumb_type = document.querySelectorAll(".crumb-item")[3];
        crumb_type.innerText = type.value;
    });
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