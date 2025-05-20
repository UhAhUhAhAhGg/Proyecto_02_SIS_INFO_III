<template>
  <div class="container-fluid">
    <!-- Navigation -->
    <header class="header">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><i class="fas fa-paw me-2"></i>VetPredict</a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav nav-progress ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#home">
                  <span class="nav-icon"><i class="fas fa-home"></i></span>
                  <span class="nav-text">Home</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                  <span class="badge bg-dark">4</span>
                </a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/hello">
                  <span class="nav-icon"><i class="fas fa-box-open"></i></span>
                  <span class="nav-text">EditarCSV</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/usuarios">
                  <span class="nav-icon"><i class="fas fa-blog"></i></span>
                  <span class="nav-text">Uusuarios</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
              
            </ul>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="row align-items-center">
          <!-- Texto a la izquierda -->
          <div class="col-md-6 hero-content animate__animated animate__fadeInLeft">
            <h1 class="hero-title text-dark">
              VetPredict: <br><span class="highlight">Protegemos</span> a Nuestros Amigos
            </h1>
            <p class="lead text-dark mt-3">Detecta enfermedades peligrosas en animales con Ciencia de Datos.</p>
            <h3 class="fw-bold text-gold mt-4">Sistema de Información orientado a</h3>
            <p class="lead text-dark">la Obtención de Patrones para la Predicción de Enfermedades Peligrosas en Animales mediante el Análisis de Síntomas.</p>
            <!--<a href="#checker" class="btn btn-elegant mt-3 animate__animated animate__pulse">Explorar Ahora</a>-->
          </div>
          <!-- Slider a la derecha -->
          <div class="col-md-6 hero-slider animate__animated animate__fadeInRight">
            <div id="animalCarousel" class="carousel slide animal-carousel" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#animalCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#animalCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#animalCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item">
                  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzQ2b2N4Njg4c3UzcnZ4eTkxczdkYXc0eW52dWhtcDR6eXRjNm9pZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/crWTdtGRk5xv5EAXs8/giphy.gif" class="d-block w-100" alt="Caballo">
                </div>
                <div class="carousel-item active">
                  <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjN0a2ZnczRpeDRkOHZvenQyMTF2NzMwMDJwa2t1bXpjOTVteXNvNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Yomr19B3bTgPUl0N3H/giphy.gif" class="d-block w-100" alt="Perro">
                </div>
                <div class="carousel-item">
                  <img src="https://media1.giphy.com/media/mFGdByKIurgsF6CiPu/giphy.webp?cid=ecf05e47hd9z6obdit3xo4mavvt7vjte71tt48q9mn514pw9&ep=v1_stickers_related&rid=giphy.webp&ct=s" class="d-block w-100" alt="Gato">
                </div>
              </div>
              
              <button class="carousel-control-next" type="button" data-bs-target="#animalCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section animate__animated animate__fadeInUp text-center py-5">
      <div class="features-header">
        <h2 class="display-4 fw-bold text-gold">
          <i class="fas fa-search me-3"></i>CONOCE NUESTRO SISTEMA<i class="fas fa-search ms-3"></i>
        </h2>
        <h5 class="text-blue mb-5">Sistema de Información orientado a la Obtención de </h5>
                <h5 class="text-blue mb-5">Patrones para la Predicción de Enfermedades Peligrosas en Animales mediante el Análisis de Síntomas.</h5>

      </div>
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-4 mb-4">
            <div class="card h-100 glass-card feature-card animate__animated animate__flipInX">
              <div class="card-icon-wrapper">
                <i class="fas fa-search card-img-top rounded-circle mx-auto mt-3 glowing-border"></i>
              </div>
              <div class="card-body">
                <h3 class="card-title text-gold-subtle">DETECTA PATRONES <i class="fas fa-search"></i></h3>
                <p class="card-text text-dark">Analizamos síntomas para predecir enfermedades peligrosas en animales con Ciencia de Datos.</p>
                <button @click="irAHola" class="btn btn-elegant mt-2">Editar CSV</button>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 glass-card feature-card animate__animated animate__flipInX animate__delay-1s">
              <div class="card-icon-wrapper">
                <i class="fas fa-bullseye card-img-top rounded-circle mx-auto mt-3 glowing-border"></i>
              </div>
              <div class="card-body">
                <h3 class="card-title text-gold-subtle">NUESTRA MISIÓN <i class="fas fa-bullseye"></i></h3>
                <p class="card-text text-dark">Crear un sistema que detecte a tiempo enfermedades en animales, optimizando decisiones veterinarias.</p>
                <button class="btn btn-elegant mt-2">LEARN MORE</button>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 glass-card feature-card animate__animated animate__flipInX animate__delay-2s">
              <div class="card-icon-wrapper">
                <i class="fas fa-shield-alt card-img-top rounded-circle mx-auto mt-3 glowing-border"></i>
              </div>
              <div class="card-body">
                <h3 class="card-title text-gold-subtle">APOYO PREVENTIVO <i class="fas fa-shield-alt"></i></h3>
                <p class="card-text text-dark">Empoderamos a veterinarios para prevenir y manejar riesgos en la salud animal.</p>
                <button @click="irAUsuarios" class="btn btn-elegant mt-2">Ir a Usuarios</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Disease Spotlight Section (Full-Width Continuous Horizontal Accordion) -->
    <section id="spotlight" class="disease-spotlight-section animate__animated animate__fadeInUp">
      <div class="container-fluid px-0 position-relative">
        <div class="animal-bg">
          <i class="fas fa-horse" style="top: 20%; left: 10%; color: #be8b08;"></i>
          <i class="fas fa-paw" style="bottom: 10%; right: 15%; color: #be8b08;"></i>
        </div>
        <div class="disease-accordion">
          <div
            v-for="(disease, index) in diseases"
            :key="index"
            class="disease-panel"
            :class="{ active: activeDiseaseIndex === index }"
            :style="{ backgroundImage: `url(${disease.image})`, backgroundColor: disease.color }"
            @click="activeDiseaseIndex = index"
            @mouseover="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          >
            <div class="disease-overlay"></div>
            <div class="disease-title">
              <h2 v-if="index === 0 && activeDiseaseIndex === 0" class="text-gold animate__animated animate__zoomIn mb-4">Enfermedades a Conocer</h2>
              <h3 v-if="activeDiseaseIndex === index" :class="index === 0 ? 'text-gold-subtle' : 'disease-title-color'" class="animate__animated animate__fadeIn">{{ disease.title }}</h3>
              <h4 v-else :class="index === 0 ? 'text-gold-subtle' : 'disease-title-color'">{{ disease.title }}</h4>
            </div>
            <transition name="typewriter">
              <div v-if="activeDiseaseIndex === index && index !== 0" class="disease-content animate__animated animate__bounceInUp">
                <p class="text-dark typewriter">{{ disease.content }}</p>
                <a href="#" class="btn btn-elegant mt-3">Leer Más</a>
              </div>
            </transition>
          </div>
        </div>
        
      </div>
    </section>


    <!-- Did You Know Section -->
    <section id="facts" class="did-you-know-section animate__animated animate__fadeInUp">
  <div class="animal-bg">
    <i class="fas fa-fish floating-icon" style="top: 15%; left: 20%;"></i>
    <i class="fas fa-paw floating-icon" style="bottom: 20%; right: 25%;"></i>
    <i class="fas fa-bone floating-icon" style="top: 30%; right: 15%;"></i>
  </div>
  <div class="section-header text-center">
    <h2 class="text-gold mb-5 animate__animated animate__bounceIn">
      <i class="fas fa-paw me-2"></i> ¿Sabías que...? <i class="fas fa-paw ms-2"></i>
    </h2>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(fact, index) in facts.slice(0, 3)" :key="index">
        <div class="fact-card glass-card" :class="{ 'flipped': fact.flipped }" @click="toggleFlip(index)">
          <div class="fact-card-inner">
            <!-- Front of the Card -->
            <div class="fact-card-front animate__animated" :class="`animate__zoomIn animate__delay-${index}s`">
              <div class="card-body text-center">
                <i :class="fact.icon" class="fact-icon glowing-border"></i>
                <h5 class="text-gold-subtle mt-3">{{ fact.title }}</h5>
                <p class="text-dark">{{ fact.summary }}</p>
                <small class="text-turquoise">¡Haz clic para saber más!</small>
              </div>
            </div>
            <!-- Back of the Card -->
            <div class="fact-card-back glass-card">
              <div class="card-body text-center">
                <i :class="fact.icon" class="fact-icon glowing-border"></i>
                <h5 class="text-gold-subtle mt-3">{{ fact.title }}</h5>
                <p class="text-dark">{{ fact.detail }}</p>
                <button class="btn btn-elegant mt-2" @click.stop="playSound(fact.sound)">Escuchar Sonido</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button class="btn btn-elegant" @click="showRandomFact">¡Descubre un dato curioso!</button>
    </div>
  </div>
  <!-- Random Fact Modal -->
  <transition name="modal">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content glass-card animate__animated animate__zoomIn">
        <h4 class="text-gold-subtle mb-3">¡Dato Curioso!</h4>
        <p class="text-dark">{{ randomFact?.detail }}</p>
        <button class="btn btn-elegant mt-3" @click="showModal = false">Cerrar</button>
      </div>
    </div>
  </transition>
    </section>


<!-- Footer Section -->
<footer id="footer" class="footer-section animate__animated animate__fadeInUp">
  <div class="container">
    <div class="row">
      <div class="col-md-4 text-center text-md-start">
        <div class="footer-logo mb-3">
          <i class="fas fa-paw fa-3x text-gold"></i>
          <span class="logo-text ms-2 text-gold-subtle">AnimalCare</span>
        </div>
        <p class="text-light">Cuidando la salud de tus mascotas con amor y conocimiento.</p>
      </div>
      <div class="col-md-4 text-center">
        <h5 class="text-gold-subtle mb-3">Enlaces</h5>
        <ul class="list-unstyled">
          <li><a href="#" @click.prevent="irAHola" class="text-turquoise">Inicio</a></li>
          <li><a href="#" @click.prevent="irAUsuarios" class="text-turquoise">Usuarios</a></li>
          <li><a href="#" @click.prevent="goToAbout" class="text-turquoise">Acerca de</a></li>
        </ul>
      </div>
      <div class="col-md-4 text-center text-md-end">
        <h5 class="text-gold-subtle mb-3">Síguenos</h5>
        <div class="social-icons">
          <a href="#" class="me-3"><i class="fab fa-facebook-f text-turquoise"></i></a>
          <a href="#" class="me-3"><i class="fab fa-twitter text-turquoise"></i></a>
          <a href="#" class="me-3"><i class="fab fa-instagram text-turquoise"></i></a>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <p class="text-light">&copy; 2025 AnimalCare. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'InicioVue',
  setup() {
    const activeDiseaseIndex = ref(0);
    const hoverIndex = ref(null);
    const showModal = ref(false);
    const randomFact = ref(null);
    const facts = ref([
      {
        title: 'Los perros y la rabia',
        summary: 'La rabia puede transmitirse a humanos si no se vacuna a las mascotas.',
        detail: 'La rabia es una enfermedad viral mortal que afecta el sistema nervioso. Vacunar a tu perro es clave para prevenirla.',
        icon: 'fas fa-dog',
        flipped: false,
        sound: '/sounds/bark.mp3' // Optional: Add sound file
      },
      {
        title: 'Los gatos y el estrés',
        summary: 'Los gatos pueden ocultar síntomas debido al estrés o instinto.',
        detail: 'Los gatos son expertos en ocultar su dolor para protegerse de depredadores, lo que dificulta detectar enfermedades.',
        icon: 'fas fa-cat',
        flipped: false,
        sound: '/sounds/meow.mp3' // Optional: Add sound file
      },
      {
        title: 'Los caballos y el tétanos',
        summary: 'Los caballos son muy susceptibles al tétanos sin vacunación.',
        detail: 'El tétanos en caballos puede causar rigidez muscular y muerte. La vacunación regular es esencial.',
        icon: 'fas fa-horse',
        flipped: false,
        sound: '/sounds/neigh.mp3' // Optional: Add sound file
      },
      {
        title: 'Las vacas y su memoria',
        summary: 'Las vacas tienen una excelente memoria.',
        detail: 'Las vacas pueden recordar rostros humanos y otros animales durante años, lo que las ayuda a formar lazos sociales fuertes.',
        icon: 'fas fa-cow',
        flipped: false,
        sound: '/sounds/moo.mp3' // Optional: Add sound file
      },
      {
        title: 'Las ovejas y su visión',
        summary: 'Las ovejas tienen un campo de visión amplio.',
        detail: 'Gracias a sus ojos laterales, las ovejas tienen un campo de visión de casi 300 grados, lo que las ayuda a detectar depredadores.',
        icon: 'fas fa-sheep',
        flipped: false,
        sound: '/sounds/baa.mp3' // Optional: Add sound file
      },
      {
        title: 'Los cerdos y su inteligencia',
        summary: 'Los cerdos son muy inteligentes.',
        detail: 'Los cerdos pueden aprender trucos tan rápido como los perros y tienen una inteligencia comparable a la de un niño de 3 años.',
        icon: 'fas fa-piggy-bank',
        flipped: false,
        sound: '/sounds/oink.mp3' // Optional: Add sound file
      },
      {
        title: 'Los zorros y su comunicación',
        summary: 'Los zorros tienen una amplia gama de sonidos.',
        detail: 'Los zorros emiten más de 40 sonidos diferentes, desde ladridos hasta chillidos, para comunicarse entre sí.',
        icon: 'fas fa-fox',
        flipped: false,
        sound: '/sounds/fox.mp3' // Optional: Add sound file
      },
      {
        title: 'Los conejos y sus saltos',
        summary: 'Los conejos pueden saltar muy alto.',
        detail: 'Algunos conejos pueden saltar hasta un metro de altura, lo que les permite escapar rápidamente de peligros.',
        icon: 'fas fa-rabbit',
        flipped: false,
        sound: '/sounds/bunny.mp3' // Optional: Add sound file
      }
    ]);

    const diseases = [
      {
        title: 'Introducción',
        color: '#D3E4CD',
        image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExem1qZ3VmaGdxeDFta2N1Y3AxYjAzcXJlcWgwdXRiaWJ5MzBidmd6YyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/rWBEkXG55Aoo4NhapT/giphy.webp',
        content: '',
        symptoms: []
      },
      {
        title: '🐶 Dog: Canine Parvovirus',
        color: '#FFD59E',
        image: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnN5MThsZzg1dzdnNmdiMGFhMjB0cms1OXV6eTExNDZhajA5ZTduciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9PirK9E84PArHFEoJC/giphy.gif',
        content: 'Casos registrados: 20. El parvovirus canino es un virus altamente contagioso que afecta principalmente a cachorros y perros no vacunados. Es una enfermedad grave que puede ser mortal si no se trata a tiempo. Síntomas: Vómitos, diarrea severa (a menudo con sangre), fiebre, letargo, pérdida de apetito, deshidratación.'
      },
      {
        title: '🐱 Cat: Feline Herpesvirus',
        color: '#A7D8DE',
        image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDRlMXc0eTJpdGY1d3NyNnRkcDM4dDV5ZDRueWVlM2lxdXoxdzBjMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3ohze2VeFY3yBycSt2/giphy.gif',
        content: 'Casos registrados: 16. Síntomas: Estornudos, secreción nasal y ocular, fiebre, pérdida de apetito, úlceras en los ojos. Descripción: Virus común en gatos que afecta el sistema respiratorio. Se transmite por contacto directo.'
      },
      {
        title: '🐴 Horse: Equine Influenza',
        color: '#FFDFD3',
        image: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWo5czV3NDdsMGhtd29yOWs1Z3RoeHpmZGZoY2dtMmozb21tbmQ1eSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/wKM9McePiSOR1Jb5BV/200.webp',
        content: 'Casos registrados: 18. Síntomas: Fiebre alta, tos seca, secreción nasal, debilidad, pérdida de apetito. Descripción: Enfermedad respiratoria muy contagiosa en caballos. Similar a la gripe humana.'
      },
      {
        title: '🐄 Cow: Bovine Tuberculosis',
        color: '#C3B1E1',
        image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWxwcDFpYWhteHRnbmQ3NDZ3NGFzaXVzaW1kNWI5a3lmNmF0cW43NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2yxKQzWkvCxYMhmEEI/giphy.gif',
        content: 'Casos registrados: 20. Síntomas: Tos crónica, pérdida de peso, fiebre intermitente, debilidad. Descripción: Enfermedad bacteriana que puede transmitirse a humanos. Afecta pulmones y ganglios linfáticos.'
      },
      {
        title: '🐇 Rabbit: Rabbit Viral Hemorrhagic Disease',
        color: '#F6C6EA',
        image: 'https://media1.giphy.com/media/98XyhRxHz65MNJVjai/giphy.webp?cid=ecf05e47px6wk3u3ruet8qinw97it4ctaym93eljjvenuwj6&ep=v1_stickers_related&rid=giphy.webp&ct=s',
        content: 'Casos registrados: 16. Síntomas: Fiebre alta, sangrado por la nariz, letargo, muerte súbita. Descripción: Enfermedad viral altamente mortal en conejos. Avanza muy rápido.'
      },
      {
        title: '🐑 Sheep: Scrapie',
        color: '#FFF1A6',
        image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXZsOHpkZjhienNvYTNhejk2MWg3M2ZxdGw3Y2JvcG9xMmNnbjI3bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SgwPtMD47PV04/200.webp',
        content: 'Casos registrados: 18. Síntomas: Picazón intensa (se rascan mucho), pérdida de peso, problemas de movimiento, comportamiento anormal. Descripción: Enfermedad neurodegenerativa priónica. Similar a la enfermedad de las vacas locas.'
      },
      {
        title: '🐐 Goat: Caprine Arthritis Encephalitis',
        color: '#ACE7EF',
        image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExanA5d21lbmd6dXNnYzE0OXpibWx1cjAzZ2NqMmM1cnpvcGl2cHU5aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l0Iy83KT5HX0DwpZC/giphy.gif',
        content: 'Casos registrados: 20. Síntomas: Inflamación en articulaciones, cojera, debilidad, en jóvenes puede causar problemas neurológicos. Descripción: Enfermedad viral crónica. No tiene cura, pero se puede controlar.'
      },
      {
        title: '🐖 Pig: Swine Influenza',
        color: '#FCD5CE',
        image: 'https://media3.giphy.com/media/KoBAvsnVkKSaJ4vk8R/giphy.webp?cid=ecf05e47emew96vd03v5fkm18sbvm7vga6vpagsphemo5gz3&ep=v1_stickers_related&rid=giphy.webp&ct=s',
        content: 'Casos registrados: 16. Síntomas: Tos, fiebre, estornudos, pérdida de apetito, dificultad para respirar. Descripción: Gripe porcina, causada por virus que pueden afectar también a humanos.'
      }
    ];

    const toggleFlip = (index) => {
      facts.value[index].flipped = !facts.value[index].flipped;
    };

    const showRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * facts.value.length);
      randomFact.value = facts.value[randomIndex];
      showModal.value = true;
    };

    const playSound = (sound) => {
      if (sound) {
        const audio = new Audio(sound);
        audio.play().catch((error) => console.error('Error playing sound:', error));
      }
    };

    return { activeDiseaseIndex, hoverIndex, facts, toggleFlip, showRandomFact, showModal, randomFact, playSound, diseases };
  },
  data() {
    return {
      selectedAnswer: null
    };
  },
  methods: {
    checkQuiz() {
      if (this.selectedAnswer === 'q1a1') {
        alert('¡Correcto! Los animales esconden síntomas para evitar ser vistos como presa.');
      } else {
        alert('Incorrecto. La respuesta correcta es: Para evitar depredadores.');
      }
    },
    irAHola() {
      this.$router.push('/hello');
    },
    irAUsuarios() {
      this.$router.push('/usuarios');
    }
  }
};

</script>

<style scoped>
/* Import Bootstrap and Animate.css via CDN */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Import a professional font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');

/* Resetear márgenes y paddings globales */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  background: linear-gradient(135deg, #3A5F4A 0%, #F0F4F1 50%, #3A5F4A 100%) !important;
  min-height: 100vh;
}

.container-fluid {
  font-family: 'Roboto Slab', serif;
  background: linear-gradient(135deg, #3A5F4A 0%, #F0F4F1 50%, #3A5F4A 100%);
  color: #2F3E46;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
}

.container-fluid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(218, 165, 32, 0.05) 10%, transparent 10%);
  background-size: 50px 50px;
  opacity: 0.2;
  z-index: 0;
}

/* Estilos para el Header y Navbar */
.header {
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(240, 244, 241, 0.9) 0%, rgba(78, 205, 196, 0.1) 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 0;
  border-radius: 0;
}

.navbar-brand {
  color: #be8b08 !important;
  font-weight: 700;
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.1);
}

.nav-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.nav-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.nav-item {
  position: relative;
  margin: 0 15px;
  z-index: 2;
}

.nav-link {
  color: #2F3E46 !important;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-link .nav-icon {
  font-size: 1.3rem;
  margin-right: 8px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #e0e0e0;
  text-align: center;
  transition: background 0.3s ease;
}

.nav-link .nav-text {
  font-size: 1rem;
  white-space: nowrap;
}

.nav-link .nav-check {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  color: #28a745;
  font-size: 0.9rem;
  display: none;
  background: #fff;
  border-radius: 50%;
  padding: 2px;
}

.nav-link .badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background: #2F3E46;
  color: #FFFFFF;
  border-radius: 50%;
  font-size: 0.8rem;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.nav-link:hover .badge {
  transform: scale(1.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #2F3E46 !important;
  transform: translateY(-2px);
}

.nav-link.active {
  background: #C8E6C9;
  color: #2F3E46 !important;
  font-weight: 600;
}

.nav-link.active .nav-icon {
  background: #28a745;
  color: #FFFFFF;
}

.nav-link.active .nav-check {
  display: inline;
}

.navbar-toggler {
  border: none;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(47, 62, 70, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 120px 0 80px;
  background: linear-gradient(135deg, rgba(240, 244, 241, 0.9) 0%, rgba(78, 205, 196, 0.1) 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(78, 205, 196, 0.2) 0%, transparent 50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: left;
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 25px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.hero-slider {
  position: relative;
  z-index: 2;
  padding: 0; /* Eliminar cualquier padding que pueda agregar margen */
}

.animal-carousel {
  width: 100%; /* Asegurar que ocupe todo el ancho disponible */
  max-width: 100%; /* Eliminar la restricción de ancho máximo */
  border-radius: 15px;
  overflow: hidden;
}

/*
.animal-carousel img {
  border-radius: 20px;
  /* Eliminamos el borde: border: 4px solid #be8b08;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  object-fit: cover;
  height: 450px;
}
 */

.carousel-indicators {
  bottom: -45px;
}

.carousel-indicators button {
  background-color: #be8b08;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 6px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.carousel-indicators button:hover,
.carousel-indicators .active {
  opacity: 1;
  background-color: #4ECDC4;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #2F3E46;
  border-radius: 50%;
  padding: 12px;
}

/* Estilos generales para secciones */
.section-header {
  position: relative;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 3rem;
  position: relative;
  padding-bottom: 15px;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 4px;
  background: linear-gradient(to right, transparent, #be8b08, transparent);
  border-radius: 2px;
}

.section-header h5 {
  font-size: 1.5rem;
  margin-top: 15px;
  font-weight: 500;
  letter-spacing: 1px;
}

.text-dark {
  color: #2F3E46;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.text-gold {
  color: #be8b08;
  text-shadow: 0 0 6px rgba(190, 139, 8, 0.6);
}

.text-gold-subtle {
  color: #be8b08;
  text-shadow: 0 0 4px rgba(190, 139, 8, 0.4);
}

.text-blue {
  color: #4ECDC4;
}

.highlight {
  color: #be8b08;
  text-shadow: 0 0 6px #be8b08;
}

.btn-elegant {
  background: #be8b08;
  color: #2F3E46;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  box-shadow: 0 0 6px rgba(190, 139, 8, 0.6);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.btn-elegant:hover {
  background: #4ECDC4;
  color: #2F3E46;
  box-shadow: 0 0 12px rgba(78, 205, 196, 0.8);
  transform: scale(1.1);
}

.glowing-border {
  border: 4px solid #be8b08;
  box-shadow: 0 0 10px #be8b08, 0 0 18px rgba(78, 205, 196, 0.4);
  transition: all 0.3s ease;
}

.glowing-border:hover {
  transform: rotate(360deg) scale(1.05);
}

.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(240, 244, 241, 0.6);
  border: 1px solid rgba(190, 139, 8, 0.2);
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

/* Updated Features Section Styles */
/* Enhanced Features Section Styles */
.features-section {
  background: linear-gradient(135deg, rgba(58, 95, 74, 0.4) 0%, rgba(240, 244, 241, 0.9) 50%, rgba(78, 205, 196, 0.3) 100%);
  border-radius: 25px;
  padding: 80px 0;
  position: relative;
  z-index: 1;
  margin: 20px 0;
  overflow: hidden;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(190, 139, 8, 0.15) 10%, transparent 10%);
  background-size: 60px 60px;
  opacity: 0.4;
  z-index: -1;
  animation: subtlePulse 10s ease-in-out infinite;
}

@keyframes subtlePulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.6; }
}

.feature-card {
  background: transparent;
  border: none;
  position: relative;
  padding: 20px;
  overflow: visible;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card-1 {
  background: linear-gradient(145deg, rgba(190, 139, 8, 0.2), rgba(240, 244, 241, 0.7));
}

.feature-card-2 {
  background: linear-gradient(145deg, rgba(78, 205, 196, 0.2), rgba(240, 244, 241, 0.7));
}

.feature-card-3 {
  background: linear-gradient(145deg, rgba(255, 111, 97, 0.2), rgba(240, 244, 241, 0.7));
}

.feature-card:hover {
  transform: translateY(-12px) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.card-icon-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  margin-top: -40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, background 0.3s ease;
}

.feature-card-1 .card-icon-wrapper {
  background: linear-gradient(145deg, #be8b08, #FFD700);
}

.feature-card-2 .card-icon-wrapper {
  background: linear-gradient(145deg, #4ECDC4, #80DEEA);
}

.feature-card-3 .card-icon-wrapper {
  background: linear-gradient(145deg, #FF6F61, #FFAB91);
}

.card-icon-wrapper i {
  font-size: 60px;
  width: 100%;
  height: 100%;
  line-height: 120px;
  transition: transform 0.3s ease;
}

.icon-color-1 {
  color: #FFD700; /* Gold accent */
}

.icon-color-2 {
  color: #80DEEA; /* Light turquoise */
}

.icon-color-3 {
  color: #FFAB91; /* Soft coral */
}

.feature-card:hover .card-icon-wrapper i {
  transform: scale(1.1) rotate(10deg);
}

.feature-card .card-title {
  font-size: 1.6rem;
  margin-bottom: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: color 0.3s ease;
}

.feature-card-1 .card-title { color: #FFD700; }
.feature-card-2 .card-title { color: #80DEEA; }
.feature-card-3 .card-title { color: #FFAB91; }

.feature-card .card-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #2F3E46;
}

.btn-color-1 {
  background: linear-gradient(145deg, #be8b08, #FFD700);
  color: #2F3E46;
}

.btn-color-2 {
  background: linear-gradient(145deg, #4ECDC4, #80DEEA);
  color: #2F3E46;
}

.btn-color-3 {
  background: linear-gradient(145deg, #FF6F61, #FFAB91);
  color: #2F3E46;
}

.btn-elegant:hover {
  background: linear-gradient(145deg, #4ECDC4, #80DEEA);
  color: #2F3E46;
  box-shadow: 0 0 12px rgba(78, 205, 196, 0.8);
  transform: scale(1.1);
}

/* Enhanced About Section Styles */
.about-section {
  background: linear-gradient(135deg, rgba(58, 95, 74, 0.3) 0%, rgba(240, 244, 241, 0.85) 50%, rgba(78, 205, 196, 0.2) 100%);
  border-radius: 25px;
  padding: 80px 0;
  position: relative;
  z-index: 1;
  margin: 20px 0;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(190, 139, 8, 0.1) 10%, transparent 10%);
  background-size: 50px 50px;
  opacity: 0.3;
  z-index: -1;
  animation: subtlePulse 12s ease-in-out infinite;
}

@keyframes subtlePulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

.about-card {
  background: rgba(240, 244, 241, 0.7);
  border: 2px solid rgba(190, 139, 8, 0.3);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(78, 205, 196, 0.2);
  transition: all 0.3s ease;
}

.about-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(78, 205, 196, 0.3);
}

.about-content {
  text-align: left;
}

.about-image i {
  color: #80DEEA; /* Light turquoise */
  transition: transform 0.3s ease, color 0.3s ease;
}

.about-image i:hover {
  transform: scale(1.2) rotate(15deg);
  color: #FFD700; /* Gold on hover */
}

.icon-color-gold {
  color: #FFD700; /* Lighter gold */
  text-shadow: 0 0 6px rgba(190, 139, 8, 0.6);
}

.icon-color-turquoise {
  color: #80DEEA; /* Light turquoise */
  text-shadow: 0 0 6px rgba(78, 205, 196, 0.6);
}

.text-turquoise {
  color: #80DEEA; /* Light turquoise for subtitle */
  text-shadow: 0 0 4px rgba(78, 205, 196, 0.4);
}

.btn-gradient {
  background: linear-gradient(145deg, #be8b08, #FFD700);
  color: #2F3E46;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  box-shadow: 0 0 6px rgba(190, 139, 8, 0.6);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.btn-gradient:hover {
  background: linear-gradient(145deg, #4ECDC4, #80DEEA);
  color: #2F3E46;
  box-shadow: 0 0 12px rgba(78, 205, 196, 0.8);
  transform: scale(1.1);
}


/* Disease Spotlight Section Styles (Full-Width Continuous Horizontal Accordion) */
.disease-spotlight-section {
  background: linear-gradient(135deg, rgba(58, 95, 74, 0.25) 0%, rgba(240, 244, 241, 0.8) 50%);
  padding: 0;
  position: relative;
  z-index: 1;
  margin: 0;
  border-top: none;
  border-bottom: none;
}

.disease-accordion {
  display: flex;
  height: 650px;
  overflow: hidden;
  position: relative;
  width: 100%;
  background: rgba(58, 95, 74, 0.1);
}

.disease-accordion::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(218, 165, 32, 0.1) 5%, transparent 5%);
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: 0;
  animation: particleMove 20s linear infinite;
}

@keyframes particleMove {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}

.disease-panel {
  flex: 1;
  color: #2F3E46;
  transition: flex 0.8s ease, transform 0.8s ease, box-shadow 0.8s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  transform: perspective(1000px) rotateY(0deg);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
}

.disease-panel:hover {
  flex: 1.5;
  transform: perspective(1000px) rotateY(5deg) translateZ(20px);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(190, 139, 8, 0.6);
}

.disease-panel.active {
  flex: 8; /* Expanded size for active slide */
  transform: perspective(1000px) rotateY(0deg) translateZ(40px);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(190, 139, 8, 0.8);
}

.disease-panel:not(.active) {
  flex: 0.5; /* Shrunk size for inactive slides */
  transform: perspective(1000px) rotateY(10deg);
}

.disease-panel.active .disease-overlay {
  background: rgba(47, 62, 70, 0.4);
}

.disease-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 62, 70, 0.2);
  backdrop-filter: blur(15px);
  transition: all 0.8s ease;
  z-index: 1;
}

.disease-panel.active {
  background-size: 130%;
  background-position: center 20%;
}

.disease-title {
  text-align: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.disease-title h2 {
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(190, 139, 8, 0.8);
}

.disease-title h3 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.disease-title h4 {
  font-size: 1.3rem;
  transform: rotate(-90deg);
  white-space: nowrap;
}

.disease-content {
  margin-top: 1.5rem;
  max-width: 600px;
  text-align: left;
  z-index: 2;
  position: relative;
  padding: 20px;
  background: rgba(240, 244, 241, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.disease-image {
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin: 0 auto;
  display: block;
}

.disease-description {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.disease-symptoms {
  font-size: 1.1rem;
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 15px;
}

.disease-content .btn-gradient {
  background: linear-gradient(145deg, #be8b08, #FFD700);
  color: #2F3E46;
}

.disease-content .btn-gradient:hover {
  background: linear-gradient(145deg, #4ECDC4, #80DEEA);
  box-shadow: 0 0 12px rgba(78, 205, 196, 0.8);
  transform: scale(1.1);
}

.disease-title-color {
  color: #80DEEA; /* Light turquoise */
  text-shadow: 0 0 4px rgba(78, 205, 196, 0.4);
}

.typewriter {
  overflow: hidden;
  white-space: normal;
  animation: typing 2s steps(40, end);
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

/* Indicators */
.disease-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  background: #be8b08;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.indicator:hover {
  opacity: 0.8;
  transform: scale(1.2);
}

.indicator.active {
  opacity: 1;
  background: #4ECDC4;
  transform: scale(1.5);
  box-shadow: 0 0 10px rgba(78, 205, 196, 0.8);
}

/* Typewriter transition */
.typewriter-enter-active,
.typewriter-leave-active {
  transition: opacity 0.5s ease;
}
.typewriter-enter-from,
.typewriter-leave-to {
  opacity: 0;
}

/* Did You Know Section Styles */
.did-you-know-section {
  background: linear-gradient(135deg, rgba(58, 95, 74, 0.3) 0%, rgba(240, 244, 241, 0.9) 50%, rgba(78, 205, 196, 0.3) 100%);
  border-radius: 25px;
  padding: 80px 0;
  position: relative;
  z-index: 1;
  margin: 20px 0;
  overflow: hidden;
}

.did-you-know-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(190, 139, 8, 0.15) 10%, transparent 10%);
  background-size: 50px 50px;
  opacity: 0.4;
  z-index: -1;
  animation: subtlePulse 10s ease-in-out infinite;
}

.fact-card {
  perspective: 1000px;
  height: 300px;
  cursor: pointer;
}

.fact-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform-style: preserve-3d;
}

.fact-card.flipped .fact-card-inner {
  transform: rotateY(180deg);
}

.fact-card-front,
.fact-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fact-card-front {
  background: rgba(240, 244, 241, 0.7);
  border: 2px solid rgba(190, 139, 8, 0.3);
}

.fact-card-back {
  background: linear-gradient(145deg, rgba(78, 205, 196, 0.7), rgba(240, 244, 241, 0.9));
  transform: rotateY(180deg);
  border: 2px solid rgba(78, 205, 196, 0.3);
}

.fact-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.fact-icon {
  font-size: 50px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.fact-card:hover .fact-icon {
  transform: scale(1.2) rotate(10deg);
}

.fact-card h5 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.fact-card p {
  font-size: 1.1rem;
  line-height: 1.5;
}

.floating-icon {
  font-size: 4rem;
  color: #4ECDC4;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(47, 62, 70, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  max-width: 500px;
  padding: 30px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Cuánto sabes? Section Styles */
.quiz-section {
  background: linear-gradient(135deg, rgba(20, 35, 40, 0.7) 0%, rgba(47, 62, 70, 0.9) 50%, rgba(30, 70, 80, 0.7) 100%);
  border-radius: 25px;
  padding: 80px 0;
  position: relative;
  z-index: 1;
  margin: 20px 0;
  overflow: hidden;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(150, 110, 20, 0.4);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  color: #E0E0E0;
  font-size: 0.9rem;
  width: 15%;
  text-align: center;
}

.step i {
  font-size: 24px;
  margin-bottom: 5px;
  color: #B8860B; /* Dark gold */
}

.step.completed i {
  color: #28A745; /* Green for completed */
}

.step.completed::before {
  content: '✔';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  color: #28A745; /* Green checkmark */
  font-size: 16px;
}

.step.completed span {
  color: #28A745; /* Green text for completed */
}

.quiz-content {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(47, 62, 70, 0.8);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.quiz-content h4 {
  color: #D4A017; /* Muted gold */
}

.quiz-content p {
  color: #E0E0E0; /* Light gray */
}

.text-success {
  color: #28A745; /* Green for correct */
}

.text-danger {
  color: #DC3545; /* Red for incorrect */
}

.btn-elegant {
  background-color: #1E90FF; /* Darker turquoise */
  color: #E0E0E0;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-elegant:hover {
  background-color: #1678D1; /* Slightly darker turquoise on hover */
}

.text-gold {
  color: #B8860B; /* Dark gold */
}

.text-gold-subtle {
  color: #D4A017; /* Muted gold */
}

.text-light {
  color: #E0E0E0; /* Light gray */
}


/* Footer Section Styles */
.footer-section {
  background: linear-gradient(135deg, rgba(30, 50, 60, 0.9) 0%, rgba(47, 80, 90, 0.9) 100%);
  padding: 40px 0 20px;
  color: #E0E0E0;
  border-top: 1px solid rgba(150, 110, 20, 0.2);
  margin-top: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.text-gold {
  color: #B8860B; /* Dark gold */
}

.text-gold-subtle {
  color: #D4A017; /* Muted gold */
}

.text-turquoise {
  color: #1E90FF; /* Darker turquoise */
  text-decoration: none;
  transition: color 0.3s ease;
}

.text-turquoise:hover {
  color: #1678D1; /* Slightly darker turquoise on hover */
}

.text-light {
  color: #E0E0E0; /* Light gray */
  font-size: 0.9rem;
}

.list-unstyled li {
  margin-bottom: 10px;
}

.social-icons a {
  font-size: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icons a:hover {
  transform: scale(1.2);
  color: #1678D1; /* Slightly darker turquoise on hover */
}

@media (max-width: 768px) {
  .footer-section .row > div {
    text-align: center !important;
    margin-bottom: 20px;
  }
  .social-icons {
    margin-top: 10px;
  }
}

</style>