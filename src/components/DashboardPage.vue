<template>
  <div>
    <router-link to="/login"><button class="logout">Cerrar sesion</button></router-link>
    <h2>Mis Tareas</h2>

    <form @submit.prevent="addOrUpdateTask">
      <input v-model="title" type="text" placeholder="Título de la tarea" required />
      <input class="input-desc"  v-model="description" type="text" placeholder="Descripción de la tarea" required />
      <input class="input-select"  v-model="time" type="time" required />
      <input  class="input-select" v-model="date" type="date" required />
      <select v-model="priority">
        <option value="1">Prioridad 1</option>
        <option value="2">Prioridad 2</option>
        <option value="3">Prioridad 3</option>
        <option value="4">Prioridad 4</option>
        <option value="5">Prioridad 5</option>
      </select>
      <button type="submit">{{ isEditing ? 'Actualizar Tarea' : 'Agregar Tarea' }}</button>
    </form>

    <div class="task-list">
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task" 
        @delete="deleteTask(task.id)"
        @updateStatus="updateTaskStatus(task.id, $event)" 
        @edit="editTask(task)" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import { useUserStore } from '../stores/userStore';
import TaskItem from '../components/TaskItem.vue';

const title = ref('');
const description = ref('');
const time = ref('');
const date = ref('');
const priority = ref('1');
const isEditing = ref(false);
let currentTaskId = null;

const taskStore = useTaskStore();
const userStore = useUserStore();

const tasks = computed(() => taskStore.tasks[userStore.currentUser.email] || []);

const addOrUpdateTask = () => {
  if (isEditing.value) {
    taskStore.updateTask(userStore.currentUser.email, currentTaskId, {
      title: title.value,
      description: description.value,
      time: time.value,
      date: date.value,
      priority: Number(priority.value),
    });
    resetForm();
  } else {
    taskStore.addTask(userStore.currentUser.email, title.value, description.value, time.value, date.value, priority.value);
    resetForm();
  }
};

const deleteTask = (taskId) => {
  taskStore.deleteTask(userStore.currentUser.email, taskId);
};

const updateTaskStatus = (taskId, status) => {
  taskStore.updateTask(userStore.currentUser.email, taskId, { status });
};

const editTask = (task) => {
  title.value = task.title;
  description.value = task.description;
  time.value = task.time;
  date.value = task.date;
  priority.value = task.priority;
  currentTaskId = task.id;
  isEditing.value = true;
};

const resetForm = () => {
  title.value = '';
  description.value = '';
  time.value = '';
  date.value = '';
  priority.value = '1';
  isEditing.value = false;
  currentTaskId = null;
};

onMounted(() => {
  taskStore.loadTasks();
});
</script>

<style scoped>

.logout {
  background-color: #01c38d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
  position: absolute;
  right: 16px;
  top: 16px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

form {
  margin-bottom: 24px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-select {
  width: 30%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-desc {
  width: 100%;
  padding: 70px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
}

select {
  width: 30%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
