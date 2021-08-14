// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA-7xOhqPJjhq-cm6VuzjZZ5X3dti6UeFQ",
  authDomain: "rkhive-1faec.firebaseapp.com",
  databaseURL: "https://rkhive-1faec-default-rtdb.firebaseio.com",
  projectId: "rkhive-1faec",
  storageBucket: "rkhive-1faec.appspot.com",
  messagingSenderId: "608713408633",
  appId: "1:608713408633:web:fe413d775d51be77e2d4a8",
  measurementId: "G-PCS017396G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const usersList = document.getElementById('usersList');
const searchBar = document.getElementById('searchBar');
let maroonLeftArrow = document.getElementById('maroonLeftArrow');
let maroonRigtArrow = document.getElementById('maroonRightArrow');
const database = firebase.database();
const rootRef = database.ref();
var ref = rootRef.child('yb');
var year = "2022"; //defaults to 2022

var MIN_YEAR = "";
var MAX_YEAR = "";

var currentRef = ref.child(year);

database.ref('yb/meta').on('value', function(snapshot){
  MIN_YEAR = snapshot.val().min;
  MAX_YEAR = snapshot.val().max;
});

maroonLeftArrow.addEventListener('click', e => {
  downYear();
});

maroonRightArrow.addEventListener('click', e => {
  upYear();
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        downYear();
    }
    else if (e.keyCode == '39') {
       // right arrow
       upYear();
    }

}

function scaleFontSize(element) {
  var elements = document.getElementsByClassName("usersList-name");
var names = '';
for(var i = 0; i < elements.length; i++) {
  names += elements[i].name;
}
document.write(names);
}

function changeYear(el, d){
  if(d == 'r' && parseInt(year) > parseInt(MIN_YEAR)){
    year = "" + (parseInt(year) - 1);
    update();
  }
  else if(d == 'l' && parseInt(year) < parseInt(MAX_YEAR)){
    year = "" + (parseInt(year) + 1);
    update();
  }
}

function upYear(){
  if(parseInt(year) < parseInt(MAX_YEAR)){
    year = "" + (parseInt(year) + 1);
    update();
  }
}

function downYear(){
  if(parseInt(year) > parseInt(MIN_YEAR)){
    year = "" + (parseInt(year) - 1);
    update();
  }
}

function update(){
  currentRef = ref.child(year);
  currentRef.once('value', (snapshot) => {
    displayUsers(snapshot.val());
  });
  $(yogDisplay).html("Class of "+year);
}

function setYear(year){
  this.year = year;
  update();
}

searchBar.addEventListener('keyup', (e) => {
    currentRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const searchString = e.target.value.toLowerCase();
      const filteredUsers = data.filter((user) => {
          return (
              user.first_name.toLowerCase().includes(searchString) ||
              user.last_name.toLowerCase().includes(searchString) ||
              user.section.toLowerCase().includes(searchString) ||
              user.fav_class.toLowerCase().includes(searchString) ||
              user.student_description.toLowerCase().includes(searchString) ||
              user.quote.toLowerCase().includes(searchString) ||
              user.quote_author.toLowerCase().includes(searchString)
          );
      });
      displayUsers(filteredUsers);
    });
});

const displayUsers = (users) => {
    const htmlString = users
        .map((user) => {
            return `
            <li class="user hvr-grow ${user.active}">
              <div data-toggle="modal" data-target="#myModal${user.id}">
              <img class=user-grid-image src=${user.preferred_picture}></img>
              <div class="usersList-name">
              <p class="sheen-name">${user.first_name} ${user.last_name}</p>
              </div>
              </div>
            </li>

            <div id="myModal${user.id}" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <p>${user.first_name +" "+user.last_name}
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span class="modal-close" aria-hidden="true">&times;</span>
                    </button>
                    <img src="Images/linkedin.svg" onclick = openLink('${user.contactOne}') style="width: 40px; color: #0077b5">
                    </p>
                  </div>
                  <div class="modal-body">
                    <div class="col-sm-4">
                      <img src=${user.preferred_picture}></img>
                      <p class="modal-attribute">Section ${user.section}</p>
                      <p class="modal-attribute">Favorite Class: ${user.fav_class}</p>
                    </div>
                    <div class="col-sm-8">
                      <p class='modal-description'>${user.student_description}</p>
                      <p class='modal-quote'>${user.quote}</p>
                      <p class='modal-quote right'>- ${user.quote_author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        })
        .join('');
    usersList.innerHTML = htmlString;
};

//TODO: Ignore up and down swipes

// function detectswipe(el,func) {
//   swipe_det = new Object();
//   swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
//   var min_x = 30;  //min x swipe for horizontal swipe
//   var max_x = 30;  //max x difference for vertical swipe
//   var min_y = 50;  //min y swipe for vertical swipe
//   var max_y = 60;  //max y difference for horizontal swipe
//   var direc = "";
//   ele = document.getElementById(el);
//   ele.addEventListener('touchstart',function(e){
//     var t = e.touches[0];
//     swipe_det.sX = t.screenX;
//     swipe_det.sY = t.screenY;
//   },false);
//   ele.addEventListener('touchmove',function(e){
//     e.preventDefault();
//     var t = e.touches[0];
//     swipe_det.eX = t.screenX;
//     swipe_det.eY = t.screenY;
//   },false);
//   ele.addEventListener('touchend',function(e){
//     //horizontal detection
//     if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
//       if(swipe_det.eX > swipe_det.sX) direc = "r";
//       else direc = "l";
//     }
//     //vertical detection
//     else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
//       if(swipe_det.eY > swipe_det.sY) direc = "d";
//       else direc = "u";
//     }

//     if (direc != "") {
//       if(typeof func == 'function') func(el,direc);
//     }
//     direc = "";
//     swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
//   },false);
// }

//testing swipe feature
// function myFunction(el,d) {
//   alert("you swiped on element with id '"+el+"' to "+d+" direction");
// }

update();

function openLink(link){
  if(link.length != 0){
    window.open(link, '_blank').focus();
  }
}
