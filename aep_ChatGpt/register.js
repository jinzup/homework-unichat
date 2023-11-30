import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCA2DvBMUzVAh5j7awvRwptix_ce8DSspY",
    authDomain: "aep-chatgpt.firebaseapp.com",
    databaseURL: "https://aep-chatgpt-default-rtdb.firebaseio.com",
    projectId: "aep-chatgpt",
    storageBucket: "aep-chatgpt.appspot.com",
    messagingSenderId: "508838852741",
    appId: "1:508838852741:web:f5639cd84b14085a1991ec"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let FullnameInp = document.getElementById('fullnameInp')
let EmailInp = document.getElementById('registerEmailInp')
let PhoneInp = document.getElementById('phoneInp')
let PasswordInp = document.getElementById('registerPasswordInp')

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, PasswordInp.value)
        .then((credentials) => {
            set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                fullname: FullnameInp.value,
                phonenumber: PhoneInp.value
            })
            console.log("Criado com sucesso!");
            document.getElementById("RegisterForm").reset();

        })
        .catch((error) => {
            alert(error.message);
            console.log(error.code);
            console.log(error.message);
        })
}
RegisterForm.addEventListener('submit', RegisterUser);