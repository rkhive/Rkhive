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


function populateData(){
//establishes root of db
var rootRef = firebase.database().ref();

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/StudentInformation');
// var ref = rootRef.child('users');
// ^FROM THE FORM INPUT
// gets values from database and changes html


ref.once('value', function(snap) { //once means user must refresh

  console.log("heiieieeieie");
  var index= 0;
  function incrementIndex(){
     index++;
  }

  //gets values for each element in data set
  snap.forEach(function(child){
    const obj = JSON.parse(JSON.stringify(child.val()));
    console.log(obj.first_name);
    // document.getElementById("first_names").innerHTML +=  obj.first_name +"<br>";
    // document.getElementById("last_names").innerHTML += obj.last_name +"<br>";
    // document.getElementById("ages").innerHTML += obj.age +"<br>";
    // document.getElementById("sections").innerHTML += obj.section +"<br>";
    // ^for the table of all students
    document.getElementById("fullName"+String(index)).innerHTML += obj.first_name + " " + obj.last_name;
    document.getElementById("modalName"+String(index)).innerHTML += obj.first_name + " " + obj.last_name;
    document.getElementById("userFavclass"+String(index)).innerHTML += "Favorite Class: "+obj.fav_class;
    document.getElementById("userSection"+String(index)).innerHTML += "Section "+obj.section;
    console.log(obj.quote);
    console.log(obj.quote_author);
    document.getElementById("userQuote"+String(index)).innerHTML += obj.quote;
    document.getElementById("userQuoteAuthor"+String(index)).innerHTML += "- "+obj.quote_author;
    document.getElementById("userPicture"+String(index)).src = obj.preferred_picture;
    document.getElementById("modalPicture"+String(index)).src = obj.preferred_picture;
    console.log(obj.student_description);
    document.getElementById("description"+String(index)).innerHTML += obj.student_description;
    incrementIndex();
  });
  });
document.getElementById('2022button').removeAttribute("onclick");
};
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
function yearAlum() {
  var yearbook = document.getElementById("yearbook2022");
  var alumni = document.getElementById("alumni2022")
  if (yearbook.style.display === "none") {
    yearbook.style.display = "block";
    alumni.style.display = "none";
  } else {
    yearbook.style.display = "none";
    alumni.style.display = "block";
  }
}
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
