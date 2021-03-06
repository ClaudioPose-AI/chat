import { Firebase } from './../util/Firebase';
import { Model } from './Model';

export class User extends Model{

    constructor(id){

        super();

        if (id) this.getById(id);
    };

    get name(){ return this._data.name; };
    set name(value){ this._data.name = value; };

    get email(){ return this._data.email; };
    set email(value){ this._data.email = value; };
    
    get photo(){ return this._data.photo; };
    set photo(value){ this._data.photo = value; };

    get chatId(){ return this._data.chatId; };
    set chatId(value){ this._data.chatId = value; };

    getById(id){
        
        return new Promise((s,f) => {

            User.findByEmail(id).onSnapshot(doc=>{
                this.fromJson(doc.data());
                s(doc);
            });
        });
    };

    save(){

        return User.findByEmail(this.email).set(this.toJson());
    }

    static getRef(){
        
        return Firebase.db().collection('/users');
    };

    static getContactRef(id){

        return User.getRef()
                       .doc(id)
                       .collection('contacts');

    };

    static findByEmail(email){

        return User.getRef().doc(email);
    };

    addContact(contact){

        // Buscando contato e adicionando a coleção de contatos
        return User.getContactRef(this.email)
                   .doc(btoa(contact.email))
                   .set(contact.toJson());

    };

    getContacts(){

        return new Promise((s,f)=>{
            
            User.getContactRef(this.email).onSnapshot(docs =>{

                let contacts = [];

                docs.forEach(doc=>{

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);

                });

                this.trigger('contactschange', docs);

                s(contacts);
            });
        })

    };
}