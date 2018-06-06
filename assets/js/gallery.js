var logout = document.getElementById("logout");
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById("file");

var config = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: ""
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location = "./index.html";   
  } else {
  	  	firebase.database().ref(`/users/${user.uid}/files`)
  	.on('value', snapshot => {
  		var allli = document.querySelectorAll(".thumbnail");
  		for(var i = 0; i < allli.length; i++) {
			allli[i].remove();
		}
		var i = 0; 		
  		snapshot.forEach(function(item){
  			var itemVal = item.val();
  			var key = Object.keys(snapshot.val())[i];
  			i++;
  			document.querySelector(".photos").innerHTML += `<div class="col-md-3 col-sm-6"><div class="thumbnail"><span id =${key}><i class='fa fa-times'></i></span><img src="${itemVal.link}"></div></div>`;
  		});
  	});

  }
});

logout.addEventListener("click", function(){
	firebase.auth().signOut()
	 .catch(function (err) {

	 });

});

$("div").on("click", "span", function(event){
	const { currentUser } = firebase.auth();
	var id = $(this).attr("id");
	firebase.database().ref(`/users/${currentUser.uid}/files/${id}`)
  	.on('value', snapshot => {
  		var loc = snapshot.val().loc;
   		var storageRef = firebase.storage().ref(loc);
   		storageRef.delete().then(function() {
		 }).catch(function(error) {
		   	console.log(error);
		 });
  	});


	 $(this).parent().fadeOut(500, function(){
	  	firebase.database().ref(`/users/${currentUser.uid}/files/${id}`)
	   	.remove();
	  });
	 event.stopPropagation();
});

fileButton.addEventListener("change", function(e){

	var file = e.target.files[0];

	const { currentUser } = firebase.auth();
	var text = "";
  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  	for (var i = 0; i < 5; i++){
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
  	}


  	var loc = currentUser.uid+"/"+text+file.name;

	var storageRef = firebase.storage().ref(loc);

	var task = storageRef.put(file);

	

	task.on('state_changed',
		function progress(snapshot) {
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			uploader.style.display = "block";
			uploader.value = percentage;
		},

		function error(err) {

		},

		async function complete() {
			fileButton.value="";
			var link = await storageRef.getDownloadURL();
			firebase.database().ref(`/users/${currentUser.uid}/files`).push({ link, loc });
		}
	);
});

