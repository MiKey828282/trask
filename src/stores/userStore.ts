import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as Array<{ email: string, password: string }>,
    currentUser: null as null | { email: string, password: string },
  }),
  actions: {
    registerUser(email: string, password: string) {
      const existingUser = this.users.find(user => user.email === email);
      if (!existingUser) {
        this.users.push({ email, password });
      }
    },
    loginUser(email: string, password: string) {
      const user = this.users.find(user => user.email === email && user.password === password);
      if (user) {
        this.currentUser = user;
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    },
    logoutUser() {
      this.currentUser = null;
    },
  },
  persist: {
    storage: localStorage,
  },
});
