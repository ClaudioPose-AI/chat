const firebase = require('firebase');
require('firebase/firestore');

/*

<script src="https://www.gstatic.com/firebasejs/5.4.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCB_WmlBlQtBEXykLYalh2HkeKmAiaLxxY",
    authDomain: "rudi-chatbot.firebaseapp.com",
    databaseURL: "https://rudi-chatbot.firebaseio.com",
    projectId: "rudi-chatbot",
    storageBucket: "rudi-chatbot.appspot.com",
    messagingSenderId: "469924925742"
  };
  firebase.initializeApp(config);
</script>
*/


export class Firebase{
    constructor(){
        this._config = {
            apiKey: "AIzaSyCB_WmlBlQtBEXykLYalh2HkeKmAiaLxxY",
            authDomain: "rudi-chatbot.firebaseapp.com",
            databaseURL: "https://rudi-chatbot.firebaseio.com",
            projectId: "rudi-chatbot",
            storageBucket: "rudi-chatbot.appspot.com",
            messagingSenderId: "469924925742"
        };


        this.init();
    };

    init(){

        if (!window._initializedFirebase){
            firebase.initializeApp(this._config);

            //Para garantir que será visto o tempo todo
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;
        };

    };

    static db(){

        return firebase.firestore();

    };

    static hd(){

        return firebase.storage();

    };

    initAuth(){

        return new Promise((s,f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result =>{
                
                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });
            })
            .catch(err=>{
                f(err);
            });

        });

    }
}