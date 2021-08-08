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
var editClass = document.getElementById('editClass');
var submitMinAndMax = document.getElementById('submitMinAndMax');
var minYear = document.getElementById('minYear');
var maxYear = document.getElementById('maxYear');
var txtYear = document.getElementById('txtYear');
var submitStatus = document.getElementById("submitStatus");
let globalYear = "";
let uidArray = [];

submitMinAndMax.addEventListener('click', e =>{
  firebase.database().ref('yb/meta').set({
    min: minYear.value,
    max: maxYear.value
  });
  document.getElementById('status').innerHTML = 'Set Min to '+minYear.value+" and Max to "+maxYear.value;
});

submit.addEventListener('click', e => {
  globalYear = txtYear.value;
  submitStatus.innerHTML = globalYear;
  document.getElementById('status').innerHTML = 'Set Year to '+globalYear;
});

editClass.addEventListener('click', e =>{
  document.getElementById('dataDisplay').innerHTML = "";
  firebase.database().ref('yb/'+globalYear).on('value', function(snapshot){
    snapshot.forEach(function(child){
      var obj = JSON.parse(JSON.stringify(child.val()));
      document.getElementById('dataDisplay').innerHTML += 
      "<li> "+obj.id+" "+ obj.first_name+" "+obj.last_name+ " <button onclick = enable("+obj.id+")> Enable </button>"
      +" <button onclick = disable("+obj.id+")> Disable </button></li>";
    });
  });
});

function enable(id){
  document.getElementById('status').innerHTML = 'Enabled '+id;
  window.alert("Enabled "+id);
  firebase.database().ref('yb/'+globalYear+"/"+id).update({
    active: 'show'
  });
}

function disable(id){
  document.getElementById('status').innerHTML = 'Disabled '+id;
  window.alert("Disabled "+id);
  firebase.database().ref('yb/'+globalYear+"/"+id).update({
    active: 'hide'
  });
}

fileButton.addEventListener('change', function(e) {
  var file = e.target.files[0];
  getAsText(file);
  document.getElementById('status').innerHTML = 'Uploaded '+file.name;
});

imageButton.addEventListener('change', function(e) {
  var file = e.target.files[0];
  var blob = file.slice(0, file.size, 'image/png/jpg/jpeg');

  for(let i = 1; i <= emailsArray.length; i++){
    newFile = new File([blob], i+".png", {type: 'image/png'});
    var storageRef = firebase.storage().ref(globalYear+'_'+'yb_photos/'+newFile.name);

    var task = storageRef.put(newFile);

  }
  console.log("done");
});

imageDataButton.addEventListener('click', e => {
  for(let i = 1; i <= emailsArray.length; i++){
    firebase.storage().ref(globalYear+'_'+'yb_photos/'+i+".png").getDownloadURL()
    .then((url) => {
      firebase.database().ref('yb/'+globalYear+"/"+i).update({
        preferred_picture : url
      });
    });
  }

  console.log("done");
});

showResults.addEventListener('click', e => {
  console.log(emailsArray);
  document.getElementById('dataDisplay').innerHTML = "";
  for(let i = 1; i <= emailsArray.length; i++){
    document.getElementById('dataDisplay').innerHTML += 
    "<li>"+emailsArray[i-1][2]+" "+emailsArray[i-1][3]+"</li>";
  }
});

createData.addEventListener('click', e => {
  // TODO: allow these to change
  for(let i = 1; i <= emailsArray.length; i++){
    firebase.database().ref('yb/'+globalYear+"/"+i).set({
      email: emailsArray[i-1][0],
      id: i,
      uid: emailsArray[i-1][4],
      fav_class: "N/A",
      first_name: emailsArray[i-1][2],
      last_name: emailsArray[i-1][3],
      preferred_picture: "",
      quote: "You must do the thing which you think you cannot do.",
      quote_author: "Eleanor Roosevelt",
      section: "N/A",
      student_description: "A student at Mass Academy.",
      yog: globalYear,
      active: "show",
      contactOne: "",
      contactTwo: ""
    });
  }
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
    firebase.database().ref('yb/masterUsers/'+emailsArray[i-1][4]).set({
      yog: globalYear,
      id: i
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