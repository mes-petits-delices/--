import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBq5EdIl3eyS3Ima3FIHfkWEnzPoczkXFc",
  authDomain: "site-boutique-96f52.firebaseapp.com",
  projectId: "site-boutique-96f52",
  storageBucket: "site-boutique-96f52.firebasestorage.app",
  messagingSenderId: "1075677172691",
  appId: "1:1075677172691:web:8caae8a9d3b455e1011526"
};

// Initialisation sécurisée
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisCol = collection(db, "avis");

// Fonctions de base (Menu et Scroll)
window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle("sticky", window.scrollY > 0);
});

window.toggleMenu = () => {
    document.querySelector('.navbar').classList.toggle('active');
};

// Gestion de l'envoi
const formAvis = document.getElementById('formAvis');
if (formAvis) {
    formAvis.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('btnPublier');
        btn.innerText = "Envoi...";
        
        try {
            await addDoc(avisCol, {
                name: formAvis.name.value,
                message: formAvis.message.value,
                date: new Date()
            });
            formAvis.reset();
            btn.innerText = "Publier l'avis";
        } catch (error) {
            alert("Erreur de connexion à la base de données.");
            btn.innerText = "Réessayer";
        }
    });
}

// Affichage des avis
onSnapshot(query(avisCol, orderBy("date", "desc")), (snapshot) => {
    const liste = document.getElementById('listeAvis');
    if (liste) {
        liste.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.className = 'bulle-avis';
            div.innerHTML = `<p>"${data.message}"</p><h4>- ${data.name}</h4>`;
            liste.appendChild(div);
        });
    }
});
