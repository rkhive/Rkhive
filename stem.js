let userInfoArr = [];

btnStemProj.addEventListener('click', e =>{
    pushData();
    $(userInfoExtras).hide();
    firebase.database().ref('stem').on('value', function(snapshot){
        if(snapshot.hasChild(globalUID)){
            console.log("Project Exists");
            $(userInfo).html('Edit your STEM Project Information');
            displayStemProj();
        }
        else{
            $(userInfo).html('Add your STEM Project Information');
            initializeStemProj();
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
                    +"<button id = 'deleteProj' onclick = 'deleteProject()'>Delete Project</button>"
                  +"</div>"
                +"</div>"
              +"</div>"
          +"</div>"
        +"</div>"
        );
    });
}

function initializeStemProj(){
    $(stemProjCreate).show();
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
    console.log('Data has been pushed!');
}

function createProject(){
    firebase.database().ref('stem/'+globalUID).set({
        title: $(txtProjTitle).val(),
        category: $(txtProjCategory).val(),
        abstract: $(txtProjAbstract).html(),
        author: userInfoArr[0]+ " " + userInfoArr[1]
    });
    $(stemProjCreate).hide();
}

function deleteProject(){
    firebase.database().ref('stem/'+globalUID).remove();
    window.alert('STEM Project Deleted Successfully.');
    location.reload();
}


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