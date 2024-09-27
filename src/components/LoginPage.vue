<template>
    <div class="form-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <router-link to="/register">Registrarse</router-link>
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
  
  const login = () => {
    try {
      userStore.loginUser(email.value, password.value);
      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };
  </script>
  <style scoped>

  h2 {
  text-align: center;
  margin-bottom: 1em;
}

.form-container {
  background: #191e29;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
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


label {
  margin-bottom: 0.5em;
  margin-right: 10px;
  font-weight: bold;
  width: 100px;
}

input {
  padding: 0.5em;
  margin-bottom: 1em;
  border: transparent;
  border-radius: 5px;
  background-color: #ffffff;
}

button {
  padding: 0.75em;
  border: none;
  border-radius: 5px;
  background: #01c38d;
  color: white;
  font-weight: bold;
}

</style>
  