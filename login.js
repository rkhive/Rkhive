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
  $(progressPrint).html("");
  // Get elements for login
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  // TODO: hide the email and password prompts if already logged in
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  const btnStemProj = document.getElementById('btnStemProj');
  let userYog; //GLOBAL YOG
  let userType; //GLOBAL TYPE

  // Declare global variable for email
  var globalEmail = "";

  // Get elements for progress bar and submit button
  var uploader = document.getElementById('uploader');
  uploader.value = 0;
  var fileButton = document.getElementById('fileButton');

  //the specific reference of the user
  var userRef = "";

  //the global uid
  var globalUID = "";

  //the global id
  var globalID = "";

  $(stemProjCreate).hide();

  //add login event
  btnLogin.addEventListener('click', e => {
  //Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  $(txtEmail).val('');
  $(txtPassword).val('');
  $(stemProjInfo).hide();
  $(stemProjCreate).hide();

  //hide upload new photo and graphical abstract
  document.getElementById('upload-buttons').classList.add('none');
  document.getElementById('upload-image').classList.add('none');

  //Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  if(email) {
    $(userInfo).html("Logged in as "+email);
  }
  else {
    $(userInfo).html("RKHIVE");
  }
  promise.catch(e => {
  console.log(e.message);
  $(userInfo).html(e.message);
  });
  });

  //add signup event
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: validate these emails
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    $(userInfo).html("Created account as "+email);
    promise.catch(e => {
      console.log(e.message);
      $(userInfo).html(e.message);
    });
  });

  // TODO: hide all profile elements when logging out
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.getElementById('upload-image').classList.add('none');
    document.getElementById('upload-buttons').classList.add('none');
    $(stemProjInfo).hide();
    $(stemProjCreate).hide();
    $(txtEmail).val('');
    $(txtPassword).val('');
    $(bannerText).html("Please login to edit your profile.")
  });

  btnResetPassword.addEventListener('click', e => {
    console.log(globalEmail);
    var r = confirm("Are you sure? \nThis will send you a password reset email.");
    if (r == true) {
      firebase.auth().sendPasswordResetEmail(globalEmail)
    .then(() => {
      console.log("Email for password reset sent");
    })
    .catch(error => {
      console.error(error);
    })
    } else {
      console.log("Request cancelled");
    }
  });

  btnGiveUserInfo.addEventListener('click', e => {
    document.getElementById('upload-buttons').classList.add('none');
    $(userInfoExtras).show();
    $(stemProjInfo).hide();
    $(stemProjCreate).hide();
    const user = firebase.auth().currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        //GETS the specific YOG of the current user
        console.log(profile.uid);
        var masterRef = firebase.database().ref('yb/masterUsers/'+globalUID);
        masterRef.on("value", function(e) {
          userYog = JSON.parse(JSON.stringify(e.val())).yog;
          var usersRef = firebase.database().ref('yb/'+userYog);
          var userID = JSON.parse(JSON.stringify(e.val())).id;
          usersRef.orderByChild("id").equalTo(userID).on("child_added", function(snapshot) {
            // console.log(snapshot.key);
            userRef = snapshot.ref.path.toString();
            const obj = JSON.parse(JSON.stringify(snapshot.val()));
            //setting GLOBAL variable email
            globalEmail = profile.email;
            globalID = obj.id;

            $(userInfo).html(
              "<p>Click on your profile below to edit your information.</p>"
              +"<div class='user hvr-grow'>"
              +"<div data-toggle='modal' data-target='#myModal'>"
              +"<img class = user-grid-image src="+obj.preferred_picture+"></img>"
              +"<div class='usersList-name'>"
              +"<p class='sheen-name'>"+obj.first_name+" "+ obj.last_name+"</p>"
              +"</div>"
              +"</div>"
              +"</div>"

              +"<div id='myModal' class='modal fade' role='dialog'>"
                +"<div class='modal-dialog'>"
                  +"<div class='modal-content'>"
                    +"<div class='modal-header'>"
                      +"<p>" + obj.first_name +" "+obj.last_name
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
                          +"<img class = 'img-display' src=" + obj.preferred_picture +"></img>"
                        +"</div>"
                        +"<p class='modal-attribute' >Section <span id = 'sectionEdit' class = 'editable' contenteditable = 'true'>"+obj.section+"</span></p>"
                        +"<p class='modal-attribute' >Favorite Class: <span id = 'favClassEdit' class = 'editable'contenteditable = 'true'>"+ obj.fav_class+"</span></p>"
                        +"<input id = 'linkedInEdit' class = 'modal-attribute' placeholder = 'LinkedIn URL' value ="+obj.contactOne+">"
                      +"</div>"
                        +"<div class='col-sm-8'>"
                          +"<p id = 'descEdit' class='modal-description editable' contenteditable = 'true'>"+ obj.student_description+"</p>"
                          +"<p class='modal-quote' > \" <span id = 'quoteEdit' class = 'editable' contenteditable = true>"+ obj.quote +"</span> \" </p>"
                          +"<p class='modal-quote' >- <span id = 'quoteAuthorEdit' class = 'editable' contenteditable = 'true'>"+ obj.quote_author+"</span></p>"
                          +"<br>"
                          +"<button id='btnUpdate' onclick = 'btnUpdate()'> Update Profile </button>"
                        +"</div>"
                      +"</div>"
                    +"</div>"
                +"</div>"
              +"</div>"
            );

            // shows the upload photo button
            document.getElementById('upload-image').classList.remove('none');
          });
        });
    });
  }
  });

  function btnUpdate(){
    console.log(userRef);
    firebase.database().ref(userRef).update({
      student_description: document.getElementById("descEdit").innerHTML,
      quote: document.getElementById("quoteEdit").innerHTML,
      quote_author: document.getElementById("quoteAuthorEdit").innerHTML,
      fav_class: document.getElementById("favClassEdit").innerHTML,
      section: document.getElementById("sectionEdit").innerHTML,
      contactOne: $(linkedInEdit).val()
    });
    window.alert("Profile has been updated!");
    location.reload();
  }


  //add a realtime addEventListener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      globalUID = firebaseUser.uid;
      console.log(globalUID);
      pushData();
      document.getElementById('upload-buttons').classList.add('none');
      btnLogout.classList.remove('hide');
      btnGiveUserInfo.classList.remove('hide');
      btnStemProj.classList.remove('hide');
      $(bannerText).html("Welcome, "+firebaseUser.email+"!");
    }
    else {
      $(userInfo).html("Not logged in");
      btnLogout.classList.add('hide');
      btnGiveUserInfo.classList.add('hide');
      btnStemProj.classList.add('hide');
    }
  });

  // TODO: make a better name for the function
  // TODO: make images and information disappear and such
  function showInputs(){
    $(progressPrint).html("Upload Complete!");
    location.reload();
  }

  //listen for file selection
  fileButton.addEventListener('change', function(e) {
      //get file
      var file = e.target.files[0];
      console.log(file);
      var blob = file.slice(0, file.size, 'image/png/jpg/jpeg');
      newFile = new File([blob], globalID+".png", {type: 'image/png'});

      //create storage refresh
      var storageRef = firebase.storage().ref(userYog+'_yb_photos/'+newFile.name);

      //upload file
      //originally file
      var task = storageRef.put(newFile);

      //update progress banner
      task.on('state_changed',

      function progress (snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },

      function error(err) {
        window.alert(err);
      },

      function complete(){
        window.alert('Profile Picture Updated!');
        showInputs();
      }
    );
  });
