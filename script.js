// 1. IMPORTATION FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. TA CONFIGURATION (Extraite de tes images)
const firebaseConfig = {
  apiKey: "AIzaSyBq5EdIl3eyS3Ima3FIHfkWEnzPoczkXFc",
  authDomain: "site-boutique-96f52.firebaseapp.com",
  projectId: "site-boutique-96f52",
  storageBucket: "site-boutique-96f52.firebasestorage.app",
  messagingSenderId: "1075677172691",
  appId: "1:1075677172691:web:8caae8a9d3b455e1011526",
  measurementId: "G-Q2MQR2P0WS"
};

// 3. INITIALISATION
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisCol = collection(db, "avis");

// --- SECTION NAVIGATION & MENU ---

// Menu Sticky au scroll
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Menu Mobile (Toggle)
window.toggleMenu = function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// --- SECTION GALERIE ---

window.ouvrirGalerie = function(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    grille.innerHTML = "";
    
    if (type === 'gateaux') {
        titre.innerText = "Nos Spécialités Sucrées";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg"><p>Gâteau Royal</p></div><div><img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg"><p>Tarte Fraise</p></div>`;
    } else if (type === 'burgers') {
        titre.innerText = "Nos Burgers Gourmet";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg"><p>Le Classique</p></div><div><img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg"><p>Le Montagnard</p></div>`;
    }
    modale.style.display = "block";
}

window.fermerGalerie = function() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// Fermer la galerie si on clique sur le fond noir
window.onclick = function(event) {
    const modale = document.getElementById('fenetreGalerie');
    if (event.target == modale) {
        modale.style.display = "none";
    }
}

// --- SECTION SYSTÈME D'AVIS (FIREBASE) ---

// 1. Envoyer un avis
const form = document.querySelector('#formAvis');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prenom = form.name.value;
        const texte = form.message.value;

        try {
            await addDoc(avisCol, {
                name: prenom,
                message: texte,
                date: new Date()
            });
            form.reset();
            alert("Merci ! Votre avis a été publié.");
        } catch (error) {
            console.error("Erreur d'envoi : ", error);
            alert("Une erreur est survenue.");
        }
    });
}

// 2. Afficher les avis en temps réel
const listeAvis = document.querySelector('#listeAvis');
if (listeAvis) {
    const q = query(avisCol, orderBy("date", "desc"));

    onSnapshot(q, (snapshot) => {
        listeAvis.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            const bulle = `
                <div class="bulle-avis">
                    <p>"${data.message}"</p>
                    <h4>- ${data.name}</h4>
                </div>
            `;
            listeAvis.insertAdjacentHTML('beforeend', bulle);
        });
    });
}
