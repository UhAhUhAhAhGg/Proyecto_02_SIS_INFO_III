<template>
    <div><h1>Inicio u.u con Barrita / pq sino no da xD supongo que pq son configuraciones de vue</h1></div>
    <div>
    <h1>Bienvenido 7n7</h1>
    <p>Selecciona una opción:</p>
    <button @click="irAHola">Ir a Hello</button>
    <button @click="irAUsuarios">Ir a Usuarios</button>
  </div>
</template>
<script>
export default {
  name: 'InicioVue',
  methods: {
    irAHola() {
      this.$router.push('/hello');
    },
    irAUsuarios() {
      this.$router.push('/usuarios');
    }
  }
}
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

button:hover {
  background-color: #2c8e6f;
}
</style>