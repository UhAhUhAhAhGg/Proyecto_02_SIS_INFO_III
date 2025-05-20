<template>
  <div class="container-fluid">
    <!-- Navigation -->
    <header class="header">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><i class="fas fa-paw me-2"></i>VetPredict</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav nav-progress ms-auto">
              <li class="nav-item">
                <router-link class="nav-link active" to="/">
                  <span class="nav-icon"><i class="fas fa-home"></i></span>
                  <span class="nav-text">Home</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                  <span class="badge bg-dark">4</span>
                </router-link>
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
                  <span class="nav-text">Usuarios</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/contactos">
                  <span class="nav-icon"><i class="fas fa-info-circle"></i></span>
                  <span class="nav-text">Contactos</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center animate__animated animate__fadeInUp">
            <h1 class="hero-title text-dark">Página de Inicio para colocar Opciones</h1>
            <button @click="irAEditarCSV" class="btn btn-elegant mt-3 animate__animated animate__pulse">
              Ir a EditarCSV
            </button>
            <div class="mt-4">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHFyNHk2ZXo1MnhkOW0xcmk1ZzM2ajkyYmFjY2pya2h4OHR6NW9pciZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/lMwqB96QDgBFYTj3uT/giphy.webp"
                class="img-fluid rounded"
                alt="Logo externo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    irAEditarCSV() {
      this.$router.push('/EditarCSV');
    },
  },
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
html,
body {
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

/* Main Content Section */
.main-content {
  padding: 80px 0;
  background: linear-gradient(135deg, rgba(240, 244, 241, 0.9) 0%, rgba(78, 205, 196, 0.1) 100%);
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 25px;
  color: #2F3E46;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
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

.img-fluid {
  max-height: 300px;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
</style>