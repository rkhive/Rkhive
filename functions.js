const database = firebase.database();
const rootRefOne = database.ref('users');

var currentMode = '';
var currentYear = '';

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

function populateWithCurrent(){
  page = "";
  if(currentMode == 'student'){
    page="Students"+String(currentYear);
  }
  else if(currentMode == 'alumnus'){
    page="Alumni"+String(currentYear);
  }

  console.log(page);
  appearAndPopulate(page, currentYear, currentMode);
}

function setCurrentYear(year){
  currentYear = String(year);
  console.log(currentYear);
  if(currentMode != ''){
    populateWithCurrent();
  }
}

function setCurrentMode(mode){
  currentMode = mode;
  console.log(currentMode);
  if(currentYear != ''){
    populateWithCurrent();
  }
}

var rootRef = firebase.database().ref();

function populateData(page, year, mode){
  console.log(page);
  currentMode = String(mode);
  console.log("Changed currentMode to "+String(currentMode));
  currentYear = String(year);
  console.log("Changed currentYear to "+String(currentYear));

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+page);


if(String(mode) == "student"){
  document.getElementById('banner').style.backgroundColor='#6d213cff';
}
else if(String(mode) == 'alumnus'){
  document.getElementById('banner').style.backgroundColor='#adb9e3ff';
}

ref.once('value', function(snap) { //once means user must refresh
var index= 0;
function incrementIndex(){
   index++;
}

//gets values for each element in data set
snap.forEach(function(child){
  const obj = JSON.parse(JSON.stringify(child.val()));
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
});
});
};

function appearAndPopulate(page, year, mode){
  if(mode == "student"){
    loadStudentHTML(year);
  }
  else if(mode == "alumnus"){
    loadAlumniHTML(year);
  }
  console.log(page);
  currentMode = String(mode);
  console.log("Changed currentMode to "+String(currentMode));
  currentYear = String(year);
  console.log("Changed currentYear to "+String(currentYear));

//creates ref for node
var ref = rootRef.child('1oYN4YtfxmtndybqYwCeg2uH1j8ifUVjro794v-rW11g/'+page);

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

ref.once('value', function(snap) { //once means user must refresh
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
    document.getElementById("yb-modalImage"+String(index)).src = obj.preferred_picture;
    document.getElementById("yb-description"+String(index)).innerHTML = obj.student_description;
    incrementIndex();
  });
}

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
