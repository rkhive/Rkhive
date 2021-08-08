let userInfoArr = [];

btnStemProj.addEventListener('click', e =>{
    $(userInfoExtras).hide();
    firebase.database().ref('stem').on('value', function(snapshot){
        if(snapshot.hasChild(globalUID)){
            console.log("Project Exists");
            $(userInfo).html('Edit your STEM Project Information');
        }
        else{
            console.log("Add your STEM Project Information");
        }
    });
});

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
    checkIfExists();
};

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