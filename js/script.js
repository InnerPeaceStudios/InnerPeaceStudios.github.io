var ref = new Firebase("https://<realchatbyips>.firebaseio.com");
ref.authWithOAuthPopup("github", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
