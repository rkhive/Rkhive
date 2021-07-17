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
const database = firebase.database();
const rootRef = database.ref();
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g');
// const mButton = document.getElementById('mButton');
var year = "2022"; //defaults to 2022
var mode = "Students"; //defaults to students

// TODO: make variable and allow input from control center
const MIN_YEAR = "2021";
const MAX_YEAR = "2023";

var currentRef = ref.child(mode+year);

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
  currentRef = ref.child(mode+year);
  currentRef.on('value', (snapshot) => {
    // console.log(snapshot.val());
    displayUsers(snapshot.val());
  });
}

function setYear(year){
  this.year = year;
  update();
}

function setMode(mode){
  this.mode = mode;
  update();
}

ref.orderByChild("section").equalTo("M").on("value", function(snapshot) {
  console.log(snapshot.val());
});

//clicking m button function, generalize?
// mButton.addEventListener('click', e =>{
//   searchSection('M');
// });

function searchSection(section){
  //cool but does not work
  // var mRef = ref.orderByChild("section").equalTo("M");
  currentRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const filteredUsers = data.filter((user) => {
        return (
            user.section.toUpperCase().includes(section)
        );
    });
    displayUsers(filteredUsers);
  })
}

searchBar.addEventListener('keyup', (e) => {
    currentRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const searchString = e.target.value.toLowerCase();
      const filteredUsers = data.filter((user) => {
          return (
              user.first_name.toLowerCase().includes(searchString) ||
              user.last_name.toLowerCase().includes(searchString) ||
              user.fav_class.toLowerCase().includes(searchString)
          );
      });
      displayUsers(filteredUsers);
    });
});

const displayUsers = (users) => {
    const htmlString = users
        .map((user) => {
          // UNCOMMENT if Rkhive is backed up through sheets

          // firebase.storage().ref('yb_photos/'+user.email+".png").getDownloadURL()
          // .then((url) => {
          //   currentRef.child(user.id).update({
          //     preferred_picture : url
          //   });
          // });
            return `
            <li class="user">
              <div>
                <h3>${user.first_name} ${user.last_name}</h3>
                <img class = gridImg src = ${user.preferred_picture}></img>
                <p>Section: ${user.section}</p>
                <p>Favorite Class: ${user.fav_class}</p>
              </div>
            </li>
        `;
        })
        .join('');
    usersList.innerHTML = htmlString;
};

function detectswipe(el,func) {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX;
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX;
    swipe_det.eY = t.screenY;
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);
}

//testing swipe feature
function myFunction(el,d) {
  alert("you swiped on element with id '"+el+"' to "+d+" direction");
}

update();

detectswipe('usersList', changeYear);
