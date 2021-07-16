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
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
const database = firebase.database();
const rootRef = database.ref();
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g');
let hpCharacters = [];
// const mButton = document.getElementById('mButton');
var year = "2022"; //defaults to 2022
var mode = "Students"; //defaults to students
const MIN_YEAR = "2021";
const MAX_YEAR = "2023";

var currentRef = ref.child(mode+year);

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        if(parseInt(year) > parseInt(MIN_YEAR)){
          year = "" + (parseInt(year) - 1);
          update();
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
       if(parseInt(year) < parseInt(MAX_YEAR)){
         year = "" + (parseInt(year) + 1);
         update();
       }
    }

}

function update(){
  currentRef = ref.child(mode+year);
  currentRef.on('value', (snapshot) => {
    // console.log(snapshot.val());
    displayStudents(snapshot.val());
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
    const filteredCharacters = data.filter((character) => {
        return (
            character.section.toUpperCase().includes(section)
        );
    });
    displayStudents(filteredCharacters);
  })
}

searchBar.addEventListener('keyup', (e) => {
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      const searchString = e.target.value.toLowerCase();
      //originally hpCharacters instead of data but who cares
      const filteredCharacters = data.filter((character) => {
          return (
              character.first_name.toLowerCase().includes(searchString) ||
              character.last_name.toLowerCase().includes(searchString) ||
              character.fav_class.toLowerCase().includes(searchString)
          );
      });
      displayStudents(filteredCharacters);
    });
});

const displayStudents = (characters) => {
    const htmlString = characters
        .map((character) => {
          // UNCOMMENT if Rkhive is backed up through sheets

          // firebase.storage().ref('yb_photos/'+character.email+".png").getDownloadURL()
          // .then((url) => {
          //   currentRef.child(character.id).update({
          //     preferred_picture : url
          //   });
          // });
            return `
            <li class="character">
                <h2>${character.first_name} ${character.last_name}</h2>
                <br>
                <p>Favorite Class: ${character.fav_class}</p>
                <img src = ${character.preferred_picture}></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

update();
