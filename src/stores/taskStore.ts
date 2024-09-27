import { defineStore } from 'pinia';

interface Task {
  id: number;
  description: string;
  status: string;
  time: string;
  title: string; // Asegúrate de que el título esté aquí
  date: string;  // Asegúrate de que la fecha esté aquí
  priority: number; // Asegúrate de que la prioridad esté aquí
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: {} as Record<string, Array<Task>>,
  }),
  actions: {
    loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    },
    addTask(userEmail: string, title: string, description: string, time: string, date: string, priority: number) {
      if (!this.tasks[userEmail]) {
        this.tasks[userEmail] = [];
      }
      this.tasks[userEmail].push({
        id: Date.now(),
        title,
        description,
        status: 'created',
        time,
        date,
        priority,
      });
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    updateTask(userEmail: string, taskId: number, newStatus: string) {
      const userTasks = this.tasks[userEmail] || [];
      const task = userTasks.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus;
        this.saveTasks();
      }
    },
    deleteTask(userEmail: string, taskId: number) {
      this.tasks[userEmail] = this.tasks[userEmail].filter(task => task.id !== taskId);
      this.saveTasks();
    },
  },
});
