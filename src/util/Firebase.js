const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{
    constructor(){
        this._config = {
            apiKey: "AIzaSyCuARTLETQlU7HnixRqQJiP0g8lxdnoblQ",
            authDomain: "whattsapp-clone-3bb59.firebaseapp.com",
            databaseURL: "https://whattsapp-clone-3bb59.firebaseio.com",
            projectId: "whattsapp-clone-3bb59",
            storageBucket: "",
            messagingSenderId: "1018328994069"
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