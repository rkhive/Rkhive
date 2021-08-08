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

let userInfo = [];
let UID = "";
var submit = document.getElementById('submit');

submit.addEventListener('click', e =>{
    UID = document.getElementById('txtUID').value;
    firebase.database().ref('yb/masterUsers/'+UID).on('value', function(snapshot){
        const user = JSON.parse(JSON.stringify(snapshot.val()));
        var yog = user.yog;
        var id = user.id;
        var userRef = firebase.database().ref('yb/'+yog+"/"+id);
        userRef.on('value', function(snap){
            var obj = JSON.parse(JSON.stringify(snap.val()));
            userInfo.push(obj.first_name, obj.last_name, obj.yog, obj.id, obj.email, obj.preferred_picture, obj.active);
        });
    });
    checkIfExists();
});

createProject.addEventListener('click', e => {
    firebase.database().ref('stem/'+UID).set({
        title: "A STEM Project",
        category: "Bio",
        abstract: "This is a STEM project",
        author: userInfo[0]+ " " + userInfo[1]
    });
});


function checkIfExists(){
    firebase.database().ref('stem').on('value', function(snapshot){
        if(snapshot.hasChild(UID)){
            console.log('STEM project exists');
        }
    });
}