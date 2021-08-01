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

let emailsArray = [];
let fileUploaded = false;
var fileButton = document.getElementById('fileButton');
var showResults = document.getElementById('showResults');
var createData = document.getElementById('createData');
var createAccounts = document.getElementById('createAccounts');
var imageButton = document.getElementById('imageButton');
var imageDataButton = document.getElementById('imageDataButton');
var addToMaster = document.getElementById('addToMaster');
var submit = document.getElementById("submit");
var txtYear = document.getElementById('txtYear');
var txtMode = document.getElementById('txtMode');
var submitStatus = document.getElementById("submitStatus");
let globalYear = "";
let globalMode = "";
let uidArray = [];

submit.addEventListener('click', e => {
  globalYear = txtYear.value;
  globalMode = txtMode.value;
  submitStatus.innerHTML = globalMode+globalYear;
});

fileButton.addEventListener('change', function(e) {
  var file = e.target.files[0];
  getAsText(file);
});

imageButton.addEventListener('change', function(e) {
  var file = e.target.files[0];
  var blob = file.slice(0, file.size, 'image/png/jpg/jpeg');

  for(let i = 1; i <= emailsArray.length; i++){
    newFile = new File([blob], emailsArray[i-1][0]+".png", {type: 'image/png'});
    var storageRef = firebase.storage().ref(globalYear+'_'+'yb_photos/'+newFile.name);

    var task = storageRef.put(newFile);

  }
  console.log("done");
});

imageDataButton.addEventListener('click', e => {
  for(let i = 1; i <= emailsArray.length; i++){
    firebase.storage().ref(globalYear+'_'+'yb_photos/'+newFile.name).getDownloadURL()
    .then((url) => {
      // document.getElementById('previewImg').setAttribute('src', url);
      firebase.database().ref('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+globalMode+globalYear+"/"+i).update({
        preferred_picture : url
      });
    });
  }

  console.log("done");
});

showResults.addEventListener('click', e => {
  console.log(emailsArray);
});

createData.addEventListener('click', e => {
  // TODO: allow these to change
  for(let i = 1; i <= emailsArray.length; i++){
    firebase.database().ref('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+globalMode+globalYear+"/"+i).set({
      email: emailsArray[i-1][0],
      id: i,
      fav_class: "N/A",
      first_name: emailsArray[i-1][2],
      last_name: emailsArray[i-1][3],
      preferred_picture: "",
      quote: "You must do the thing which you think you cannot do.",
      quote_author: "Eleanor Roosevelt",
      section: "N/A",
      student_description: "A student at Mass Academy.",
      yog: globalYear,
      active: 1
    });
  };
  console.log("done");
});

createAccounts.addEventListener('click', e => {
  const auth = firebase.auth();
  for(let i = 1; i <= emailsArray.length; i++){
    console.log(emailsArray[i-1][0]+ " " +emailsArray[i-1][1]);
    const promise = auth.createUserWithEmailAndPassword(emailsArray[i-1][0], emailsArray[i-1][1]);
    promise.catch(e => {
      console.log(e.message);
    });
  }
  console.log("done");
});

addToMaster.addEventListener('click', e => {
  for(let i = 1; i <= emailsArray.length; i++){
    //KEY by email WITHOUT @wpi.edu
    firebase.database().ref('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/masterUsers/'+emailsArray[i-1][0].replace('@wpi.edu', "")).set({
      type: globalMode,
      yog: globalYear
    });
  };
  console.log("done");
});

function getAsText(fileToRead) {
  let reader = new FileReader();

  reader.readAsText(fileToRead);

  reader.onload = loadHandler;
  reader.onerroer = errorHandler;
}

function loadHandler(event){
  let csv = event.target.result;
  processData(csv);
}

function errorHandler(event){
  if(event.target.error.name == "NotReadableError") {
    alert('Cannot reader file!');
  }
}

function processData(csv){
  let allTextLines = csv.split(/\r\n|\n/);

  for (let i = 0; i < allTextLines.length; i++){
    let row = allTextLines[i].split(',');

    let col = [];

    for (let j = 0 ; j < row.length; j++){
      col.push(row[j]);
    }

    emailsArray.push(col);
  }
}
