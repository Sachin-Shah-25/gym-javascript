const firebaseConfig = {
    apiKey: IMP_KEY.API_KEY,
    authDomain: "admin-2c1d3.firebaseapp.com",
    databaseURL: "https://admin-2c1d3-default-rtdb.firebaseio.com",
    projectId: IMP_KEY.PROTECT_ID,
    storageBucket: "admin-2c1d3.appspot.com",
    messagingSenderId: "1062636045066",
    appId: IMP_KEY.APP_ID,
    measurementId: "G-Q1KGG9YQNL"
};
firebase.initializeApp(firebaseConfig);

const getDatabase = firebase.database();

const dataKey = Array();
let obj = {
    "prodcutName": '',
    "imageName": '',
    "details": '',
    "Price": ''
}

fetchAllData();
function fetchAllData() {
    getDatabase.ref("allData").on('value', function (snapshot) {

        if (snapshot.exists()) {
            convertObj(snapshot.val());
        }
        else {
        }

    });
}

function convertObj(data) {
    let add = "";
    let synta = "";
    for (const key in data) {
        dataKey.push(key);
        getDatabase.ref("allData").child(key).on('value', function (snapshot) {
            const prodcutData = snapshot.val();
            synta = `<div class="items">
            <div class="image">
                <img alt="" id="ProImage"  src=${prodcutData.ProductImage}" >
            </div>
            <p id="ProName">${prodcutData.Name}</p>
            <p id="proDetails">${prodcutData.Details}</p>
            <span id="proPrice">${prodcutData.Price}</span>
            <div class="orderButtons">
                <a href="#myOrder"><button>Order Now</button></a>
            </div>
        </div> `
        });
        add = add + synta;
    }
    document.getElementsByClassName('firstContent')[0].innerHTML = add;
    liveOrderBtn();
}

function liveOrderBtn() {
    const getAllBtn = document.querySelectorAll(".orderButtons");
    Array.from(getAllBtn).forEach(function (element, index) {
        element.addEventListener("click", function () {
            liveSingleData(index);
        });
    });
}

function liveSingleData(refIndex) {
    getDatabase.ref("allData").child(dataKey.at(refIndex)).on('value', function (snapshot) {
        const finalData = snapshot.val();


        obj.details = finalData.Details;
        obj.Price = finalData.Price;
        obj.imageName = finalData.ProductImage;
        obj.prodcutName = finalData.Name;

        getData(obj, 1);

    });
}

const totalProduct = [
    "p7.webp",
    "p8.webp",
    "p9.webp",
    "p10.webp",
    "p1.webp",
    "p2.webp",
    "p3.webp",
    "p4.webp",
    "p5.webp",
    "p6.webp",
    "p7.webp",
    "p8.webp",
    "p8.webp",
];

const totalState = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"]

const a = "dELhi";

const getAllButtons = document.querySelectorAll('.buttons');

let imageIndex = 0;
Array.from(getAllButtons).forEach(function (element, index) {
    element.addEventListener('click', function (event) {
        event.preventDefault;
        imageIndex = index;
        const parent = element.parentElement;
        const parentChildren = parent.children;
        selectChildren(parentChildren);
    })
});

//  obj = {
//     "imageName": '',
//     "details": '',
//     "Price": ''
// }
function selectChildren(parentChildren) {
    let firstTime = true;
    Array.from(parentChildren).forEach(function (element, index) {
        const tagName = element.tagName;
        if (tagName == "DIV" && firstTime) {
            firstTime = false;
            obj.imageName = "/img/" + totalProduct[imageIndex];
        }
        else if (tagName == "P") {
            obj.details = element.innerText;
        }
        else if (tagName == "SPAN") {
            obj.Price = element.innerText;

        }
        getData(obj, "");
    });
}
const productImage = document.getElementById('orderImage');
const productDetails = document.getElementById("productDes");
const orderPrice = document.getElementById('orderPrice');
function getData(obj, num) {
    document.getElementsByClassName('background')[0].style.display = "block";

    productImage.setAttribute("src", obj.imageName);
    orderPrice.innerText = obj.Price;

    var getprodDetals = obj.details;

    getprodDetals = getprodDetals.substring(0, 50) + "...";
    productDetails.innerText = getprodDetals;
}

const name = document.getElementById('name');
const gmail = document.getElementById('gmail');
const number = document.getElementById('number');
const house = document.getElementById('house');
const gali = document.getElementById('gali');
const area = document.getElementById('area');
const pincode = document.getElementById('pincode');
const State = document.getElementById('State');

let finalPrice = obj.Price;
document.getElementById('placeOrder').addEventListener('click', function () {
    const userName = name.value;
    const userGmail = gmail.value;
    const userHouse = house.value;
    const userGali = gali.value;
    const userArea = area.value;
    const userPincode = pincode.value;
    const userNumber = number.value;
    const userState = State.value;

    if ((!userGmail.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) || (!userGmail.includes("@gmail.com"))) {
        //  document.getElementById('gmail').style.border="1px solid red";   
        document.getElementById('gmail').style.border = "1px solid red";
    }
    else if (userNumber.length != 10) {
        document.getElementById('number').style.border = "1px solid red";
    }
    else if (userPincode.length != 6) {
        document.getElementById('pincode').style.border = "1px solid red";
    }
    else {
        let checkState = false;
        for (var i = 0; i < totalState.length; i++) {
            if (totalState[i].toLowerCase() == userState.toLowerCase()) {
                checkState = true;
                if (checkState) {
                    const messageBody = "Customer Name : " + userName +
                        "</br> Customer Gmail : " + userGmail +
                        "</br> Address : " + userHouse + " " + userGali + " " + userArea +
                        "</br> Pincode : " + userPincode +
                        "</br> Phone : " + userName +
                        "</br> State : " + userState +
                        "</br> Product Name : " + totalProduct[imageIndex] +
                        "</br> Product Price : " + finalPrice +
                        "</br> Image Url : " + obj.imageName

                    Email.send({
                        Host: "smtp.elasticemail.com",
                        Username: "sachinshah064689@gmail.com",
                        Password: IMP_KEY.PASSWORD,
                        To: IMP_KEY.RECEIVER_EMAIL,
                        From: IMP_KEY.SENDER_EMAIL,
                        Subject: "Orders ",
                        Body: messageBody
                    }).then(function (message) {
                            document.getElementsByClassName('done')[0].style.display = "block";
                    }).catch(function (error) {
                        console.log(error, "This is the Error");
                    });
                }
                else {
                }
                checkState = false;
                break;
            }
            else {
            }
        }
    }
});

document.getElementById('backbutton').addEventListener('click', function () {
    window.location.reload();
});
document.getElementById('ok').addEventListener('click', function () {
    document.getElementsByClassName("done")[0].style.display = "none"
    window.location.reload();
});

document.getElementById('select').addEventListener("change", function (element) {
    const options = document.getElementById('select').options;
    const getValue = document.getElementById('select').value;
    const getPrice = obj.Price;
    const getIntPrice = parseInt(getPrice);

    const getSelectValue = parseInt(options[getValue].text);


    document.getElementById('orderPrice').innerText = getIntPrice * getSelectValue;
    finalPrice = getIntPrice * getSelectValue;

});
const options = document.getElementById('select').options;
const getValue = document.getElementById('select').value;
