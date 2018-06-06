var email = document.getElementById("emailID");
var login = document.querySelector("#login");
var password = document.getElementById("password");
var error = document.querySelector(".error");
var config = {
apiKey: "",
authDomain: "",
databaseURL: "",
projectId: "",
storageBucket: "",
messagingSenderId: ""
};
firebase.initializeApp(config);

login.addEventListener("click",function(){
	firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
		.catch(function (err) {
			firebase.auth().signInWithEmailAndPassword(email.value, password.value)
			 .catch(function(err) {
			   error.textContent = err.message;
			 });
		});
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = "./gallery.html";   
  }
});
