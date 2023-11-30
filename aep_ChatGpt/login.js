import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCA2DvBMUzVAh5j7awvRwptix_ce8DSspY",
    authDomain: "aep-chatgpt.firebaseapp.com",
    databaseURL: "https://aep-chatgpt-default-rtdb.firebaseio.com",
    projectId: "aep-chatgpt",
    storageBucket: "aep-chatgpt.appspot.com",
    messagingSenderId: "508838852741",
    appId: "1:508838852741:web:f5639cd84b14085a1991ec"
};


document.addEventListener('DOMContentLoaded', function () {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const auth = getAuth(app);
    const dbref = ref(db);

    let EmailInp = document.getElementById('emailInp');
    let PasswordInp = document.getElementById('passwordInp');

    let SignInUser = evt => {
        evt.preventDefault();

        let emailValue = EmailInp.value.trim();
        let passwordValue = PasswordInp.value.trim();

        if (!isValidEmail(emailValue)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((credentials) => {
                get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
                    if (snapshot.exists) {
                        sessionStorage.setItem("user-info", JSON.stringify({
                            fullnameInp: snapshot.val().fullname,
                            phoneNumberInp: snapshot.val().phonenumber
                        }));
                        sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                        window.location.href = 'prompt.html';
                    }
                });
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.code);
                console.log(error.message);
            });
    };

    let LoginForm = document.querySelector('#LoginForm');
    LoginForm.addEventListener('submit', SignInUser);
});

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}