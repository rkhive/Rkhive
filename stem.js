let userInfoArr = [];

btnStemProj.addEventListener('click', e =>{
    pushData();
    $(userInfoExtras).hide();
    firebase.database().ref('stem/master/').on('value', function(snapshot){
        if(snapshot.hasChild(globalUID)){
            console.log("Project Exists");
            $(userInfo).html('Click on the modal below to edit your STEM I Project information.');
            displayStemProj();
        }
        else{
            $(userInfo).html('Add your STEM I Project information');
            initializeStemProj();
        }
    });
});

function displayStemProj(){
    firebase.database().ref('stem/'+userInfoArr[2]+"/"+userInfoArr[3]).on('value', function(snapshot){
        const stemInfo = JSON.parse(JSON.stringify(snapshot.val()));
        $(stemProjInfo).show();
        document.getElementById('upload-abs').classList.remove('none');
        $(stemProjInfo).html(
        "<div class='user hvr-grow'>"
        +"<div data-toggle='modal' data-target='#myModal'>"
        +"<img class = user-grid-image src="+stemInfo.userPic+"></img>"
        +"<div class='usersList-name'>"
        +"<p class='sheen-name'>"+stemInfo.title+"</p>"
        +"</div>"
        +"</div>"
        +"</div>"

        +"<div id='myModal' class='modal fade' role='dialog'>"
          +"<div class='modal-dialog'>"
            +"<div class='modal-content'>"
              +"<div class='modal-header'>"
              +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
              +"<span class='modal-close' aria-hidden='true'>&times;</span>"
            +"</button>"
                +"<p id = 'titleEdit' class = 'editable' contentEditable = 'true'>" + stemInfo.title
                +"</p>"
              +"</div>"
              +"<div class='modal-body'>"
                +"<div class='col-sm-4'>"
                +"<div id='wrapper'>"
                  +"<div class = 'img-container'>"
                    +"<div class = 'img-overlay'>"
                    +"</div>"
                    +"<img class = 'img-display' src=" + stemInfo.graphAbs +"></img>"
                  +"</div>"
                  +"<div class='img-caption'>
                  +"<p> click to view in full screen"
                  +"</p>"
                  +"</div>"
                  +"</div>"
                  +"<p class='modal-attribute' >Category: <span id = 'categoryEdit' class = 'editable' contenteditable = 'true'>"+stemInfo.category+"</span></p>"
                  +"<p class='modal-attribute' >Author: "+ stemInfo.author+"</p>"
                  +"<p class='modal-attribute' >Awards: <span id = 'awardsEdit' class = 'editable' contenteditable = 'true'>"+stemInfo.awards+"</span></p>"
                +"</div>"
                  +"<div class='col-sm-8'>"
                    +"<p id = 'abstractEdit' class='modal-description editable' contenteditable = 'true'>"+ stemInfo.abstract+"</p>"
                    +"<br>"
                    +"<button id='btnUpdateProj' onclick = 'btnUpdateProj()'> Update Project </button>"
                    +"<button id = 'deleteProj' onclick = 'deleteProject()'>Delete Project</button>"
                  +"</div>"
                +"</div>"
              +"</div>"
          +"</div>"
        +"</div>"
        +"<br><br>"
        );
    });
}

function initializeStemProj(){
    $(stemProjCreate).show();
}

function pushData(){
  userInfoArr = [];
    firebase.database().ref('yb/masterUsers/'+globalUID).on('value', function(snapshot){
        const user = JSON.parse(JSON.stringify(snapshot.val()));
        var yog = user.yog;
        var id = user.id;
        var userRef = firebase.database().ref('yb/'+yog+"/"+id);
        userRef.on('value', function(snap){
            var obj = JSON.parse(JSON.stringify(snap.val()));
            userInfoArr.push(obj.first_name, obj.last_name, obj.yog, obj.id, obj.email, obj.preferred_picture, obj.active);
        });
    });
    console.log('Data has been pushed!');
}

function createProject(){
    firebase.database().ref('stem/master/'+globalUID).set({
        yog: userInfoArr[2],
        id: userInfoArr[3],
    });
    firebase.database().ref('stem/'+userInfoArr[2]+"/"+userInfoArr[3]).set({
        yog: userInfoArr[2],
        id: userInfoArr[3],
        title: $(txtProjTitle).val(),
        category: $(txtProjCategory).val(),
        abstract: $(txtProjAbstract).html(),
        author: userInfoArr[0]+ " " + userInfoArr[1],
        email: userInfoArr[4],
        userPic: userInfoArr[5],
        poster: "",
        awards: $(txtProjAwards).val(),
        graphAbs: "",
        projPic: "",
        contactOne: "",
        active: userInfoArr[6]
    });
    $(stemProjCreate).hide();
    $(txtProjTitle).val('');
    $(txtProjCategory).val('');
    $(txtProjAwards).val('');
    $(txtProjAbstract).html('Abstract');
}

function btnUpdateProj(){
  firebase.database().ref('stem/'+userInfoArr[2]+"/"+userInfoArr[3]).update({
    title: document.getElementById("titleEdit").innerHTML,
    category: document.getElementById("categoryEdit").innerHTML,
    awards: document.getElementById("awardsEdit").innerHTML,
    abstract: document.getElementById("abstractEdit").innerHTML
  });
  window.alert("Profile has been updated!");
  location.reload();
}

function deleteProject(){
  if(confirm("Are you sure you want to delete your project profile?")){
    firebase.database().ref('stem/master/'+globalUID).remove();
    firebase.database().ref('stem/'+userInfoArr[2]+"/"+userInfoArr[3]).set({
      yog: userInfoArr[2],
      id: userInfoArr[3],
      title: "null",
      category: "null",
      abstract: "If you are seeing this, delete this project and create a new one.",
      author: "null",
      email: "null",
      userPic: "",
      poster: "",
      awards: "",
      graphAbs: "",
      projPic: "",
      contactOne: "",
      active: "hide"
  });
    window.alert('STEM Project Deleted Successfully.');
    location.reload();
};
}

absButton.addEventListener('change', function(e) {
  //get file
  var file = e.target.files[0];
  console.log(file);
  var blob = file.slice(0, file.size, 'image/png/jpg/jpeg');
  newFile = new File([blob], userInfoArr[3]+".png", {type: 'image/png'});

  //create storage refresh
  var storageRef = firebase.storage().ref(userInfoArr[2]+'_stem_photos/graphAbs/'+newFile.name);

  //upload file
  var task = storageRef.put(newFile);

  task.on('state_changed',

  function progress (snapshot){
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  },

  function error(err) {
    $(userInfo).html(err);
  },

  function complete(){
    firebase.storage().ref(userInfoArr[2]+'_'+'stem_photos/graphAbs/'+userInfoArr[3]+".png").getDownloadURL()
    .then((url) => {
      firebase.database().ref('stem/'+userInfoArr[2]+"/"+userInfoArr[3]).update({
        graphAbs : url
      });
      $(userInfo).html('Abstract Uploaded!');
    });
  }
);
});


function checkIfExists(UID){
    firebase.database().ref('stem/master/').on('value', function(snapshot){
        if(snapshot.hasChild(UID)){
            console.log("Project Exists");
        }
        else{
            console.log("Project Doesn't Exist");
        }
    });
}
