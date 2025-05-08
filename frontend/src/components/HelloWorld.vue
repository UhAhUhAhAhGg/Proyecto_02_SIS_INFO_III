<template>
    <div class="Inicio">
    <div><h1>Pagina de Inicio para colocar Opciones</h1></div>
    <button @click="irAEditarCSV">Ir a EditarCSV</button>
    <div><img src="https://vuejs.org/images/logo.png" alt="Logo externo" />
  
    </div>
    
    </div>
</template>
<script>
import logo from '@/assets/logo.png';
// Asegúrate de ajustar la ruta si es necesario

export default 
{
  
  name: 'HelloWorld',
  methods: {
    irAEditarCSV() {
      this.$router.push('/EditarCSV');
    },
  },
  data() {
    return {
      logo
    };
  }
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>