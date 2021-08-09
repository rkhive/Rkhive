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

  
  function update(){
    var projArray =[];
    ref.on('value', (snapshot) => {
        displayUsers(snapshot.val());
        const obj = JSON.parse(JSON.stringify(snapshot.val()));
        console.log(Object.entries(obj));
        // console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot){
          var item = childSnapshot.val();
          projArray.push(item);
      });
    });
    console.log(projArray);
    // displayUsers(projArray);
  }
  
  
//   searchBar.addEventListener('keyup', (e) => {
//       ref.on('value', (snapshot) => {
//         const data = snapshot.val();
//         const searchString = e.target.value.toLowerCase();
//         const filteredUsers = data.filter((user) => {
//             return (
//                 user.title.toLowerCase().includes(searchString)
//             );
//         });
//         displayUsers(filteredUsers);
//       });
//   });
  
const displayUsers = (users) => {
    const htmlString = users
        .map((user) => {
            return `
            <li class="user hvr-grow ${user.active}">
              <div data-toggle="modal" data-target="#myModal${user.id}">
              <img class=user-grid-image src=${user.userPic}></img>
              <div class="usersList-name">
              <p class="sheen-name">${user.title}</p>
              </div>
              </div>
            </li>

            <div id="myModal${user.id}" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <p>${user.title}
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span class="modal-close" aria-hidden="true">&times;</span>
                    </button>
                    </p>
                  </div>
                  <div class="modal-body">
                    <div class="col-sm-4">
                      <img src=${user.userPic}></img>
                      <p class="modal-attribute">Section ${user.category}</p>
                      <p class="modal-attribute">${user.author}</p>
                    </div>
                    <div class="col-sm-8">
                      <p class='modal-description'>${user.abstract}</p>
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

update();
  

  