# Firebase-Cloud-Photos
This is the React-Cloud-Photos project without React

<b>Note: This project is only created for comparing a react app with a non react app</b>

## Setting up firebase

1) Go to firebase.com

2) Go to the console and start a new project

3) Go to authentication from the menu on the left and enable email under sign up methods

<img width="1439" alt="firebase auth" src="https://user-images.githubusercontent.com/33552991/41003230-48f2bfee-6927-11e8-8ed8-3d2ae85318c2.png">
  
4) Next go to databse right below the authentication option, create a real time database

5) Under the rules tab enter this in

        {
          "rules": {
           "users": {
             "$uid":{
               ".read" : "$uid === auth.uid",
               ".write": "$uid === auth.uid"
             }
           }
          }
        }
        
6) Next go to databse right below the Storage option and click on get started

7) Click on project overview above authentication and select "Add Firebase to your web app". Copy only the config variable

8) Copy it into the assets/js/gallery.js and assets/js/login.js and replace it with the exisiting config var

For more info check out - https://firebase.google.com/docs/web/setup

## Screenshots

## Screenshots

<b>Login Screen</b>
<img width="1440" alt="screen shot 2018-06-06 at 3 23 05 pm" src="https://user-images.githubusercontent.com/33552991/41067928-61749b24-69f8-11e8-9f8c-b71409685d17.png">

<b>Home Screen (Initial)</b>
<img width="1440" alt="screen shot 2018-06-07 at 2 45 46 am" src="https://user-images.githubusercontent.com/33552991/41069142-afefed58-69fd-11e8-8a98-76f62eb3e37b.png">

<b>Home Screen (After an upload of a picture)</b>
<img width="1440" alt="screen shot 2018-06-07 at 2 46 05 am" src="https://user-images.githubusercontent.com/33552991/41069161-c5b1b81a-69fd-11e8-8558-2d99c99f103e.png">

## Extras

Check out the react version of the app intergrated with Google Cloud Vision API and its Lighthouse score here - https://github.com/amansahil/React-Cloud-Photos

<b>Lighthouse score</b>
<img width="1440" alt="no react" src="https://user-images.githubusercontent.com/33552991/41068567-1fd4a7a6-69fb-11e8-8a00-79cadec1bf9b.png">
