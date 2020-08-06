
  var userData;
  var maintainence = false;

  // Firebase configuration FIRST
  var firebaseConfig = {
    apiKey: "AIzaSyAR4YGZ6-d3r-bHQsLokKjD03q9J3LxIlw",
    authDomain: "vantage-tutoring.firebaseapp.com",
    databaseURL: "https://vantage-tutoring.firebaseio.com",
    projectId: "vantage-tutoring",
    storageBucket: "vantage-tutoring.appspot.com",
    messagingSenderId: "359135646635",
    appId: "1:359135646635:web:752ac980c1d24f9f0af8ee",
    measurementId: "G-3KSXKSRKNX"
  };
  // Initialization
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var provider = new firebase.auth.GoogleAuthProvider();
  var db = firebase.firestore();
  var storage = firebase.storage();


function signIn(){
    firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
  }
  function logout(){
    firebase.auth().signOut().then(function() {
      location.reload();
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {// User is signed in.
      if (maintainence){
        if(!alert('So sorry! Doing some website updates 🛠 Check back later!')){logout();}
      }
      var displayName = user.displayName;
      var email = user.email;
      var photoURL = user.photoURL;
      var uid = user.uid;
      $('#displayName').text(displayName);
      $('#pic').attr('src', photoURL);
      $('#uid').text(uid);

      getCheckUser(uid, displayName, email, photoURL);
      //renderChat();

      $('#login-screen').hide();
      $('#navbar').show();
      $('#main').show();

    } else {
        $('#navbar').hide(); $('#main').hide(); $('#login-screen').show();
    }
  });


function getCheckUser(uid, displayName, email, photoURL){     // check if user has data in firestore, creates if none
  const usersRef = db.collection('users').doc(uid);           // sets local variable 'userData' as user data to prevent slow rendering
    usersRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          renderState(uid);
        } else {
          usersRef.set({
            setup: false,
            verified: false,
            general: {
              name: displayName,
              id: uid,
              email: email,
              photo: photoURL,
              created: new Date(),
              account: 'tutor',
            },
          }).then(()=>{
            renderState(uid);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        }); // create the document
      };
    });
}


function renderState(uid){
  db.collection('users').doc(uid).get().then(docSnapshot=>{
    var setup = docSnapshot.data().setup;
    var verified = docSnapshot.data().verified;
    var picture = docSnapshot.data().picture;
    if (setup){
      if (!verified){
        $('#setup-card').show();
        setupDone();
        $('#tabs').css('pointer-events','none')
      }
      if (picture == '') {
        var p = $('#setup-card').clone().appendTo('#main');
        Setup.part2(p);
      }
      if (verified){
        $('#home-card').show();
        $('#name').text(docSnapshot.data().general.name);
        $('#bio').text(docSnapshot.data().profile);
      }
    }
    else {
        $('#setup-card').show();
        Setup.part0();
        $('#tabs').css('pointer-events','none')
    }
  })
    
}














// random stuff

function insertTextAtCursor(text) {
  var sel, range, html;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  } else if (document.selection && document.selection.createRange) {
    document.selection.createRange().text = text;
  }
}

document.querySelector("#message-input").addEventListener("paste", function(e) {
  e.preventDefault();
  if (e.clipboardData && e.clipboardData.getData) {
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    var text = window.clipboardData.getData("Text");
    insertTextAtCursor(text);
  }
});