<template>
    <div class="form-container">
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <input  class="input-reg" v-model="email" type="email" placeholder="Correo" required />
        <input class="input-reg" v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      <router-link to="/">Volver al inicio de sesión</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/userStore';
  
  const email = ref('');
  const password = ref('');
  const userStore = useUserStore();
  const router = useRouter();
  
  const register = () => {
    userStore.registerUser(email.value, password.value);
    router.push('/');
  };
  </script>
  <style>
  h2 {
  text-align: center;
  margin-bottom: 1em;
}

.form-container {
  background: #191e29;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 288px;
  width: 100%;
}

form {
  margin-bottom: 20px;
}

form div {
  display: block;
  align-items: center;
  margin-bottom: 30px;
}

p {
  margin: 0;
}

label {
  margin-bottom: 0.5em;
  margin-right: 10px;
  font-weight: bold;
  width: 100px;
}

.input-reg {
  padding: 0.5em;
  margin-bottom: 1em;
  border: transparent;
  border-radius: 5px;
  background-color: #737373;
}

button {
  padding: 0.70em;
  border: none;
  border-radius: 5px;
  background: #01c38d;
  color: white;
  font-weight: bold;
}

</style>
  