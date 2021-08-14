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
  const projectsList = document.getElementById('projectsList');
  const searchBar = document.getElementById('searchBar');
  const database = firebase.database();
  const rootRef = database.ref();
  var ref = rootRef.child('stem');
  var year = "2022"; //defaults to 2022

  var MIN_YEAR = "";
  var MAX_YEAR = "";

  var currentRef = ref.child(year);

  ref.child('meta').on('value', function(snapshot){
    MIN_YEAR = snapshot.val().min;
    MAX_YEAR = snapshot.val().max;
    update();
  });

  maroonLeftArrow.addEventListener('click', e => {
    downYear();
  });

  maroonRightArrow.addEventListener('click', e => {
    upYear();
  });

  document.onkeydown = checkKey;

  function checkKey(e) {

      e = e || window.event;

      if (e.keyCode == '37') {
          // left arrow
          downYear();
      }
      else if (e.keyCode == '39') {
         // right arrow
         upYear();
      }

  }

  function changeYear(el, d){
    if(d == 'r' && parseInt(year) > parseInt(MIN_YEAR)){
      year = "" + (parseInt(year) - 1);
      update();
    }
    else if(d == 'l' && parseInt(year) < parseInt(MAX_YEAR)){
      year = "" + (parseInt(year) + 1);
      update();
    }
  }

  function upYear(){
    if(parseInt(year) < parseInt(MAX_YEAR)){
      year = "" + (parseInt(year) + 1);
      update();
    }
  }

  function downYear(){
    if(parseInt(year) > parseInt(MIN_YEAR)){
      year = "" + (parseInt(year) - 1);
      update();
    }
  }

  function update(){
    currentRef = ref.child(year);
    currentRef.on('value', (snapshot) => {
      displayUsers(snapshot.val());
    });
    $(yogDisplay).html("Projects of "+(year-2)+"-"+(year-1));
  }

  function setYear(year){
    this.year = year;
    update();
  }

  // function updateAll(){
  //   for(let i = parseInt(MIN_YEAR); i <= parseInt(MAX_YEAR); i++){
  //     ref.child(''+i).once('value', function(snapshot) {
  //       displayUsers(snapshot.val());
  //     });
  //   }
  // }

  searchBar.addEventListener('keyup', (e) => {
      currentRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const searchString = e.target.value.toLowerCase();
        const filteredUsers = data.filter((user) => {
            return (
                user.title.toLowerCase().includes(searchString) ||
                user.author.toLowerCase().includes(searchString) ||
                user.category.toLowerCase().includes(searchString) ||
                user.abstract.toLowerCase().includes(searchString)
            );
        });
        displayUsers(filteredUsers);
      });
  });

const displayUsers = (users) => {
    const htmlString = users
        .map((user) => {
            return `
            <li class="user hvr-grow ${user.active}">
              <div data-toggle="modal" data-target="#myModal${user.yog+""+user.id}">
              <img class=user-grid-image src=${user.userPic}></img>
              <div class="usersList-name">
              <p class="sheen-name">${user.title}</p>
              </div>
              </div>
            </li>

            <div id="myModal${user.yog+""+user.id}" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span class="modal-close" aria-hidden="true">&times;</span>
                    </button>
                    <p>${user.title}
                    </p>
                  </div>
                  <div class="modal-body">
                    <div class="col-sm-4">
                      <img src='${user.graphAbs}' onclick = openAbs('${user.graphAbs}')></img>
                      <p class="modal-attribute">By: ${user.author}</p>
                      <p class="modal-attribute">Class of ${user.yog}</p>
                      <p class="modal-attribute">Category: ${user.category}</p>
                      <p class="modal-attribute maroon">Awards: ${user.awards}</p>
                    </div>
                    <div class="col-sm-8">
                      <p class="modal-description">${user.abstract}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        })
        .join('');
    projectsList.innerHTML = htmlString;
};

function openAbs(link){
  console.log('what');
  window.open(link, '_blank').focus();
}