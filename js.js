//scroleHeight
// function scl(){
// 	var x = document.getElementById("header");
// 	var  hei = document.getElementById("img").offsetHeight;
// 	var yPos = window.pageYOffset;
// 	if(yPos>hei) { x.style.height="50px";}
// 	else{x.style.height="100px";}
// }
// window.addEventListener("scroll", scl) ;

// var myFirebaseRef = new Firebase("https://realchatbyips.firebaseio.com/");
// myFirebaseRef.set({
//   title: "Hello World!",
//   author: "Firebase",
//   location: {
//     city: "San Francisco",
//     state: "California",
//     zip: 94103
//   }
// });
// myFirebaseRef.child("location/city").on("value", function(snapshot) {
//   alert(snapshot.val());  // Alerts "San Francisco"
// });
var ref = new Firebase("https://realchatbyips.firebaseio.com/");
var messageField = document.getElementById('messageInput');
var nameField = document.getElementById('nameInput');
var messageList = document.getElementById('example-messages');
var uid = 0;

ref.authAnonymously(function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    console.log('logged in with id', authData.uid);
    var setuid = ref.child(authData.uid);
    uid = authData.uid;
    setuid.set({
      name:" ",
      text:" "
    });
    }
});

console.log(uid);

function setMessage(e) {
    if (e.keyCode == 13) {
      var username = nameField.value;
      var message = messageField.value;
      console.log(uid);
      ref.child(uid).update({name:username, text:message});
      messageField.value=("");
    }};


ref.limitToLast(10).on('child_changed', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    console.log(data);
    var username = data.name || "anonymous";
    var message = data.text;

    // //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = document.createElement("li");
    var nameElement = document.createElement("strong");
    nameElement.class='example-chat-username';
    nameElement.textContent=username + " ";
    messageElement.textContent=message;
    messageElement.insertBefore(nameElement, messageElement.childNodes[0]);

    // //ADD MESSAGE
    messageList.appendChild(messageElement);

    // //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList.scrollTop = messageList.scrollHeight;
  });
