//Define the Rkhive Firebase Databsae
const database = firebase.database();
//'users' is the root reference mainly used
const rootRefOne = database.ref('users');

//begin with no selected year or Mode
//global variables
var currentMode = '';
var currentYear = '';

//a function to flip an image of an arrow up and down
function switchArrow2() {
  if (document.getElementById("arrow2").getAttribute('src') == 'Images/Arrow.png'){
    document.getElementById("arrow2").src= "Images/ArrowUp.png";
  }
  else{
    document.getElementById("arrow2").src="Images/Arrow.png";
  }
}

function switchArrow3() {
  if (document.getElementById("arrow3").getAttribute('src') == 'Images/Arrow.png'){
    document.getElementById("arrow3").src= "Images/ArrowUp.png";
  }
  else{
    document.getElementById("arrow3").src="Images/Arrow.png";
  }
}

function switchArrow4() {
  if (document.getElementById("arrow4").getAttribute('src') == 'Images/ArrowUp.png'){
    document.getElementById("arrow4").src= "Images/Arrow.png";
  }
  else{
    document.getElementById("arrow4").src="Images/ArrowUp.png";
  }
}

// populates the website with data pointing to the current year and mode
function populateWithCurrent(){
  // define page as the Google spreadsheet that will be referenced for data
  page = "";
  //change page based on the current mode
  if(currentMode == 'student'){
    page="Students"+String(currentYear);
  }
  else if(currentMode == 'alumnus'){
    page="Alumni"+String(currentYear);
  }

  //method call
  appearAndPopulate(page, currentYear, currentMode);
}

//Assigns input from website buttons to global variables
function setCurrentYear(year){
  currentYear = String(year);
  console.log(currentYear);
  //If both the year and mode have been selected, the data will appear
  if(currentMode != ''){
    populateWithCurrent();
  }
}

//Assigns input from website buttons to global variables
function setCurrentMode(mode){
  currentMode = mode;
  console.log(currentMode);
  //If both the year and mode have been selected, the data will appear
  if(currentYear != ''){
    populateWithCurrent();
  }
}

//define a root reference
var rootRef = firebase.database().ref();

//populates data and generates HTML to house the data on the website
function appearAndPopulate(page, year, mode){
  if(mode == "student"){
    loadStudentHTML(year);
  }
  else if(mode == "alumnus"){
    loadAlumniHTML(year);
  }
  //update global variables
  currentMode = String(mode);
  console.log("Changed currentMode to "+String(currentMode));
  currentYear = String(year);
  console.log("Changed currentYear to "+String(currentYear));

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+page);

//changes the banner's content and color to match the current data
if(String(mode) == "student"){
  document.getElementById('banner').style.backgroundColor='#6d213cff';
  document.getElementById("banner").innerHTML =
  "<div id='banner' class='center' data-toggle='collapse' data-target='#menus'>"+
  "<h1 class='title'>MAMS Class of "+String(year)+"</h1>"+
  "</div>"
  document.getElementById('menu1').style.backgroundColor='#6d213cff';
  document.getElementById('menu2').style.backgroundColor='#6d213cff';
  document.getElementById("hideshow").innerHTML = '';
  document.getElementById("hideshow").innerHTML =
  "<h3 class='subtitle center' data-toggle='collapse' data-target='#menus'>hide/show menus</h3>";
}
//changes the banner's content and color to match the current data
else if(String(mode) == 'alumnus'){
  document.getElementById('banner').style.backgroundColor='#adb9e3ff';
  document.getElementById("banner").innerHTML =
  "<div id='banner' class='alumni center' data-toggle='collapse' data-target='#menus'>"+
  "<h1 class='alumni title'>MAMS Alumni of "+String(year)+"</h1>"+
  "</div>"
  document.getElementById('menu1').style.backgroundColor='#adb9e3ff';
  document.getElementById('menu2').style.backgroundColor='#adb9e3ff';
  document.getElementById("hideshow").innerHTML = '';
  document.getElementById("hideshow").innerHTML =
  "<h3 class='alumni alumni-subtitle center' data-toggle='collapse' data-target='#menus'>hide/show menus</h3>";
}

//capture a snapshot upon refresh
ref.once('value', function(snap) { //once means user must refresh
//create an index for students
var index= 0;
function incrementIndex(){
   index++;
}
// gets values for each element in data set
if(mode == "student"){
  snap.forEach(function(child){
    const obj = JSON.parse(JSON.stringify(child.val()));
    document.getElementById("yb-fullName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
    document.getElementById("yb-modalName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
    document.getElementById("yb-favClass"+String(index)).innerHTML = "Favorite Class: "+obj.fav_class;
    document.getElementById("yb-section"+String(index)).innerHTML = "Section "+obj.section;
    document.getElementById("yb-quote"+String(index)).innerHTML = obj.quote;
    document.getElementById("yb-quoteAuthor"+String(index)).innerHTML = "- "+obj.quote_author;
    document.getElementById("yb-studentPicture"+String(index)).src = obj.preferred_picture;
    document.getElementById("yb-studentPicture"+String(index)).src = obj.preferred_picture;
    document.getElementById("yb-modalImage"+String(index)).src = obj.preferred_picture;
    document.getElementById("yb-description"+String(index)).innerHTML = obj.student_description;
    incrementIndex();
  });
  //skeleton of future code for Firebase storage images
  // firebase.storage().ref('yb_photos/arrow4.gif').getDownloadURL()
  //     .then((url) => {
  //
  //       // Or inserted into an <img> element
  //       var img = document.getElementById('yb-studentPicture1');
  //       img.setAttribute('src', url);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //   });

}
// gets values for each element in data set
else if(mode == "alumnus"){
  snap.forEach(function(child){
    const obj = JSON.parse(JSON.stringify(child.val()));
    document.getElementById("al-fullName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
    document.getElementById("al-modalName"+String(index)).innerHTML = obj.first_name + " " + obj.last_name;
    document.getElementById("al-YOG"+String(index)).innerHTML = "Graduated: "+obj.graduated_year;
    document.getElementById("al-location"+String(index)).innerHTML = "Located in "+obj.location;
    document.getElementById("al-picture"+String(index)).src = obj.preferred_picture;
    document.getElementById("al-modalImage"+String(index)).src = obj.preferred_picture;
    document.getElementById("al-description"+String(index)).innerHTML = obj.professional_description;
    document.getElementById("al-contact"+String(index)).innerHTML = obj.contact;
    incrementIndex();
  });
}

});
};

//generates HTML elements based on how many students are in a specific class
function loadStudentHTML(year){
  document.getElementById("alDataHouser").innerHTML = "";
  document.getElementById("ybDataHouser").innerHTML = "";
  var yearRef = firebase.database().ref("1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/Statistics/"+year);
  var numStudentsRef = yearRef.child('num_students');
  numStudentsRef.once("value", function(snapshot){
    var numStudents = snapshot.val();
    for(i = 1 ; i <= numStudents; i++){ // INDEXING FOR NUM STUDENTS
      document.getElementById("ybDataHouser").innerHTML +=
      "<div id = " + "yb-box"+i+ " class = " +"'col-sm-2 col-sm-offset-5 border'" + " data-toggle = " +"'modal'" +" data-target = " + "#yb-modal"+i+">"
        +"<img id=" + "yb-studentPicture" + i + " class = 'gridImg' src ='Images/default-profile.png'> </img>"
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
        +"<p class= 'quote' id = yb-quote" + i + ">"
        +"<p class='quote' id = yb-quoteAuthor" + i + ">"
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

//generates HTML elements based on how many alumni are in a specific class
function loadAlumniHTML(year){
  document.getElementById("alDataHouser").innerHTML = "";
  document.getElementById("ybDataHouser").innerHTML = "";
  var yearRef = firebase.database().ref("1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/Statistics/"+year);
  var numStudentsRef = yearRef.child('num_alumni');
  numStudentsRef.once("value", function(snapshot){
    var numStudents = snapshot.val();
    for(i = 1 ; i <= numStudents; i++){ // INDEXING FOR NUM STUDENTS
      document.getElementById("alDataHouser").innerHTML +=

      "<div id = " + "al-box"+i+ " class = " +"'col-sm-2 col-sm-offset-5 border'" + " data-toggle = " +"'modal'" +" data-target = " + "#al-modal"+i+">"
        +"<img id=" + "al-picture" + i + " class = 'gridImg'> </img>"
        +"<p id = "+ "al-fullName" + i + " class = studentname>"
        +"<div class='container-fluid'>"
        +"<div class='modal fade' id = al-modal" + i + " role='dialog' data-keyboard='false' data-backdrop='static'>"
        +"<div class='modal-dialog'>"
        +"<div class='modal-content'>"
        +"<div class='modal-header' style='background-color: #adb9e3ff'>"
        +"<p class='modalname' style='background-color: #adb9e3ff' id = al-modalName" + i + ">"
        +"</div>"
        +"<div class='modal-body'>"
        +"<div class='col-sm-4'>"
        +"<img class='modalimage' id = al-modalImage" + i + "> </img>"
        +"<p id= al-YOG" + i + " class='modalattribute'></p>"
        +"<p id= al-location" + i + " class='modalattribute'></p>"
        +"</div>"
        +"<div class = 'col-sm-8'>"
        +"<p id = al-description" + i + " class='modaltext left'></p>"
        +"<p id = al-contact" + i + ">"
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
