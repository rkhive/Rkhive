const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const section = document.getElementById('section');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');

const database = firebase.database();
const rootRefOne = database.ref('users');

var currentMode = "student";
var currentYear = "";
// hideEmpty();

function changeMode(){
  if(String(currentMode) == "student"){
    console.log("aoidhawi wduawid");
    // window.location.href = "Alumni.html";
    console.log("aoidhawi wduawid");
    populateData('Alumni'+String(currentYear), currentYear, 'alumni');
    hideEmpty();
  }
  else{
    window.location.href = "Alumni.html";
    populateData('Students'+String(currentYear), currentYear, currentMode);
  }
}

var rootRef = firebase.database().ref();

function populateData(page, year, mode){
  console.log(page);
  currentMode = String(mode);
  console.log("Changed currentMode to "+String(currentMode));
  currentYear = String(year);
  console.log("Changed currentYear to "+String(currentYear));
//establishes root of db

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+page);


document.getElementById("banner").innerHTML = "MAMS Class of "+String(year);

if(String(mode) == "student"){
  document.getElementById('banner').style.backgroundColor='#6d213cff';
}
else if(String(mode) == 'alumnus'){
  document.getElementById('banner').style.backgroundColor='#adb9e3ff';
}

// var ref = rootRef.child('users');
// ^FROM THE FORM INPUT
// gets values from database and changes html
ref.once('value', function(snap) { //once means user must refresh
var index= 0;
function incrementIndex(){
   index++;
}

//gets values for each element in data set
snap.forEach(function(child){
  hideEmpty();
  const obj = JSON.parse(JSON.stringify(child.val()));
  // document.getElementById("first_names").innerHTML +=  obj.first_name +"<br>";
  // document.getElementById("last_names").innerHTML += obj.last_name +"<br>";
  // document.getElementById("ages").innerHTML += obj.age +"<br>";
  // document.getElementById("sections").innerHTML += obj.section +"<br>";
  // ^for the table of all students
  document.getElementById("fullName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
  document.getElementById("modalName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
  document.getElementById("userFavclass"+String(index)).innerHTML = "Favorite Class: "+obj.fav_class;
  document.getElementById("userSection"+String(index)).innerHTML = "Section "+obj.section;
  document.getElementById("userQuote"+String(index)).innerHTML = obj.quote;
  document.getElementById("userQuoteAuthor"+String(index)).innerHTML = "- "+obj.quote_author;
  document.getElementById("userPicture"+String(index)).src = obj.preferred_picture;
  document.getElementById("modalPicture"+String(index)).src = obj.preferred_picture;
  document.getElementById("description"+String(index)).innerHTML = obj.student_description;
  incrementIndex();
  hideEmpty();
});
});
};

function appearAndPopulate(page, year, mode){
  loadHTML(year);
  console.log(page);
  currentMode = String(mode);
  console.log("Changed currentMode to "+String(currentMode));
  currentYear = String(year);
  console.log("Changed currentYear to "+String(currentYear));
//establishes root of db

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+page);


document.getElementById("banner").innerHTML = "MAMS Class of "+String(year);

if(String(mode) == "student"){
  document.getElementById('banner').style.backgroundColor='#6d213cff';
}
else if(String(mode) == 'alumnus'){
  document.getElementById('banner').style.backgroundColor='#adb9e3ff';
}

// var ref = rootRef.child('users');
// ^FROM THE FORM INPUT
// gets values from database and changes html
ref.once('value', function(snap) { //once means user must refresh
var index= 0;
function incrementIndex(){
   index++;
}
// gets values for each element in data set
snap.forEach(function(child){
  const obj = JSON.parse(JSON.stringify(child.val()));
  // document.getElementById("first_names").innerHTML +=  obj.first_name +"<br>";
  // document.getElementById("last_names").innerHTML += obj.last_name +"<br>";
  // document.getElementById("ages").innerHTML += obj.age +"<br>";
  // document.getElementById("sections").innerHTML += obj.section +"<br>";
  // ^for the table of all students

  document.getElementById("yb-fullName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
  document.getElementById("yb-modalName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
  document.getElementById("yb-favClass"+String(index)).innerHTML = "Favorite Class: "+obj.fav_class;
  document.getElementById("yb-section"+String(index)).innerHTML = "Section "+obj.section;
  document.getElementById("yb-quote"+String(index)).innerHTML = obj.quote;
  document.getElementById("yb-quoteAuthor"+String(index)).innerHTML = "- "+obj.quote_author;
  document.getElementById("yb-studentPicture"+String(index)).src = obj.preferred_picture;
  document.getElementById("yb-modalImage"+String(index)).src = obj.preferred_picture;
  document.getElementById("yb-description"+String(index)).innerHTML = obj.student_description;
  incrementIndex();
});
});
};

function hideEmpty(){
  for(i = 1 ; i <= 15; i++){
    if( $('#description'+String(i)).is(':empty') ) {
      // console.log(String(i)+" is empty");
      document.getElementById("col"+String(i)).style.display="none";
    }
    else{
      document.getElementById("col"+String(i)).style.display="block";
    }
  }
}

function loadHTML(year){
  document.getElementById("dataHouser").innerHTML = "";
  var yearRef = firebase.database().ref("1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/Statistics/"+year);
  var numStudentsRef = yearRef.child('num_students');
  numStudentsRef.once("value", function(snapshot){
    var numStudents = snapshot.val();
    for(i = 1 ; i <= numStudents; i++){ // INDEXING FOR NUM STUDENTS
      document.getElementById("dataHouser").innerHTML +=

      "<div id = " + "yb-box"+i+ " class = " +"'col-sm-2 col-sm-offset-5 border'" + " data-toggle = " +"'modal'" +" data-target = " + "#yb-modal"+i+">"
        +"<img id=" + "yb-studentPicture" + i + " class = 'gridImg'> </img>"
        +"<p id = "+ "yb-fullName" + i + " class = studentname>"
        +"<div class='container-fluid'>"
        +"<div class='modal fade' id = yb-modal" + i + " role='dialog' data-keyboard='false' data-backdrop='static'>"
        +"<div class='modal-dialog'>"
        +"<div class='modal-content'>"
        +"<div class='modal-header'>"
        +"<p class='modalname' id = yb-modalName" + i + ">"
        +"</div>"
        +"<div class='modal-body'>"
        +"<div class='col-sm-4'>"
        +"<img class='modalimage' id = yb-modalImage" + i + "> </img>"
        +"<p id= yb-section" + i + " class='modalattribute'></p>"
        +"<p id= yb-favClass" + i + " class='modalattribute'></p>"
        +"</div>"
        +"<div class = 'col-sm-8'>"
        +"<p id = yb-description" + i + " class='modaltext left'></p>"
        +"<p id = yb-quote" + i + ">"
        +"<p id = yb-quoteAuthor" + i + ">"
        +"</div>"
        +"</div>"
        +"<div class='modal-footer'>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>"
        +"</div>";
    }
  });
};

function testInput(){
document.getElementById("yb-fullName1").innerHTML="woop";
}


// addBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   alert("refresh page!");
//   rootRefOne.child(userId.value).set({
//     first_name: firstName.value,
//     last_name: lastName.value,
//     section: section.value,
//     age: age.value
//   });
// });
//
//
// updateBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   alert("refresh page!");
//   const newData = {
//     age: age.value,
//     first_name: firstName.value,
//     last_name: lastName.value,
//     section: section.value
//   };
//   const updates = {};
//     updates['/users/' + userId.value] = newData;
//   updates['/super-users/'+ userId.value] = newData;
//   database.ref().update(updates);
// });
//
// removeBtn.addEventListener('click', e => {
//   e.preventDefault();
//   alert("refresh page!");
//   rootRefOne.child(userId.value).remove()
//   .then(() =>{
//     window.alert('user removed from database !');
//   })
//   .catch(error => {
//     console.error(error);
//   });
//   //database.ref('/super-users').child(userId.value).remove();
// });
//
// function hideShow() {
//   var x = document.getElementById("inputForm");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }
//
// function generateRkhive(){
//   alert("Hello!");
//   //establishes root of db
//   var rootRef = firebase.database().ref();
//
//   //creates ref for node
//   var ref = rootRef.child('users');
//
//   // gets values from database and changes html
//   ref.on('value', function(snap) {
//
//   //re-initializes answer in html, so doesn't repeat
//   // document.getElementById("first_names").innerHTML = "";
//   // document.getElementById("last_names").innerHTML = "";
//   // document.getElementById("ages").innerHTML = "";
//     //not really necessary ^
//
//   var index= 0;
//   function incrementIndex(){
//      index++;
//   }
//
//   //gets values for each element in data set
//   snap.forEach(function(child){
//     const obj = JSON.parse(JSON.stringify(child.val()));
//     console.log(obj.first_name);
//     // document.getElementById("first_names").innerHTML +=  obj.first_name +"<br>";
//     // document.getElementById("last_names").innerHTML += obj.last_name +"<br>";
//     // document.getElementById("ages").innerHTML += obj.age +"<br>";
//     // document.getElementById("sections").innerHTML += obj.section +"<br>";
//     document.getElementById("fullName"+String(index)).innerHTML += obj.first_name + " " + obj.last_name;
//     document.getElementById("userAge"+String(index)).innerHTML += "Age "+obj.age;
//     document.getElementById("userSection"+String(index)).innerHTML += "Section "+obj.section;
//     incrementIndex();
//   });
// });
// }





// rootRef.on('child_added', snapshot => {
//   console.log('child(s) added !');
// });
//
// rootRef.on('child_removed', snapshot => {
//   console.log('child(s) removed !');
// });

// rootRef.on('value', snapshot => {
//   console.log('An event occured on the database !');
// });

// rootRef.on('child_changed', snapshot => {
//   console.log(snapshot.val());
// });

// rootRef.orderByKey().limitToFirst(2).on('value', snapshot => { //limitToLast is also a thing
//   console.log(snapshot.val());
// });

// rootRef.orderByChild('age').limitToFirst(2).on('value', snapshot => { //can do for any data field
//   console.log(snapshot.val());
// });

// rootRefOne.orderByChild('last_name').equalTo('sargent').on('value', snapshot => {
//   console.log(snapshot.val());
//   // document.getElementById("demo").innerHTML = snapshot.val();
// });

// rootRef.orderByChild('last_name').startAt('e').on('value', snapshot => {
//   console.log(snapshot.val());
// });
