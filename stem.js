let userInfoArr = [];

btnStemProj.addEventListener('click', e =>{
    $(userInfoExtras).hide();
    firebase.database().ref('stem').on('value', function(snapshot){
        if(snapshot.hasChild(globalUID)){
            console.log("Project Exists");
            $(userInfo).html('Edit your STEM Project Information');
            displayStemProj();
        }
        else{
            console.log("Add your STEM Project Information");
        }
    });
});

function displayStemProj(){
    firebase.database().ref('stem/'+globalUID).on('value', function(snapshot){
        const stemInfo = JSON.parse(JSON.stringify(snapshot.val()));
        $(stemProjInfo).show();
        $(stemProjInfo).html(
        "<div class='user hvr-grow'>"
        +"<div data-toggle='modal' data-target='#myModal'>"
        // +"<img class = user-grid-image src="+obj.preferred_picture+"></img>"
        +"<div class='usersList-name'>"
        +"<p class='sheen-name'>"+stemInfo.title+"</p>"
        +"</div>"
        +"</div>"
        +"</div>"

        +"<div id='myModal' class='modal fade' role='dialog'>"
          +"<div class='modal-dialog'>"
            +"<div class='modal-content'>"
              +"<div class='modal-header'>"
                +"<p>" + stemInfo.title
                +"<button type='button' class='close' data-dismiss='modal' aria-label='Close'>"
                  +"<span class='modal-close' aria-hidden='true'>&times;</span>"
                +"</button>"
                +"</p>"
              +"</div>"
              +"<div class='modal-body'>"
                +"<div class='col-sm-4'>"
                  +"<div class = 'img-container'>"
                    +"<div class = 'img-overlay'>"
                    +"</div>"
                    // +"<img class = 'img-display' src=" + obj.preferred_picture +"></img>"
                  +"</div>"
                  +"<p class='modal-attribute' >Category: <span id = 'sectionEdit' class = 'editable' contenteditable = 'true'>"+stemInfo.category+"</span></p>"
                  +"<p class='modal-attribute' >Author: <span id = 'favClassEdit' class = 'editable'contenteditable = 'true'>"+ stemInfo.author+"</span></p>"
                +"</div>"
                  +"<div class='col-sm-8'>"
                    +"<p id = 'descEdit' class='modal-description editable' contenteditable = 'true'>"+ stemInfo.abstract+"</p>"
                    +"<br>"
                    +"<button id='btnUpdate' onclick = 'btnUpdate()'> Update Project </button>"
                  +"</div>"
                +"</div>"
              +"</div>"
          +"</div>"
        +"</div>"
        );
    });
}

function pushData(){
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
}

function createProject(){
    firebase.database().ref('stem/'+UID).set({
        title: "A STEM Project",
        category: "Bio",
        abstract: "This is a STEM project",
        author: userInfoArr[0]+ " " + userInfoArr[1]
    });
};


function checkIfExists(UID){
    firebase.database().ref('stem').on('value', function(snapshot){
        if(snapshot.hasChild(UID)){
            console.log("Project Exists");
        }
        else{
            console.log("Project Doesn't Exist");
        }
    });
}