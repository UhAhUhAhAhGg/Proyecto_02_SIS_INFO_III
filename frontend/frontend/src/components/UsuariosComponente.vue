<template>
    <div>
      <h2>Usuarios U.U</h2>
  
      <div v-if="mensaje" :class="{'exito': esExito, 'error': !esExito}">
        {{ mensaje }}
      </div>
  
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id">
          {{ usuario.nombre }} - {{ usuario.email }}
        </li>
      </ul>
  
      <h3>Crear Usuario</h3>
      <form @submit.prevent="crearUsuario">
        <input type="text" v-model="nuevoUsuario.nombre" placeholder="Nombre" />
        <input type="email" v-model="nuevoUsuario.email" placeholder="Email" />
        <button type="submit">Guardar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        usuarios: [],
        nuevoUsuario: {
          nombre: "",
          email: ""
        },
        mensaje: "",
        esExito: true // true: verde (éxito), false: rojo (error)
      };
    },
    mounted() {
      this.obtenerUsuarios();
    },
    methods: {
      async obtenerUsuarios() {
        try {
          const res = await axios.get("http://localhost:5000/api/usuarios");
          this.usuarios = res.data;
        } catch (error) {
          this.mostrarMensaje("Error al obtener usuarios", false);
          console.error("Error al obtener usuarios:", error);
        }
      },
      async crearUsuario() {
        try {
          await axios.post("http://localhost:5000/api/usuarios", this.nuevoUsuario);
          this.nuevoUsuario = { nombre: "", email: "" };
          this.mostrarMensaje("Usuario creado con éxito", true);
          this.obtenerUsuarios();
        } catch (error) {
          this.mostrarMensaje("Error al crear usuario", false);
          console.error("Error al crear usuario:", error);
        }
      },
      mostrarMensaje(texto, esExito = true) {
        this.mensaje = texto;
        this.esExito = esExito;
        setTimeout(() => {
          this.mensaje = "";
        }, 3000);
      }
    }
  };
  </script>
  
  <style scoped>
  .exito {
    color: green;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .error {
    color: red;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>
  