<template>
  <div class="task-card">
    <h3>{{ task.title }}</h3>
    <p><strong>Descripción:</strong> {{ task.description }}</p>
    <p><strong>Fecha:</strong> {{ task.date }}</p>
    <p><strong>Hora:</strong> {{ task.time }}</p>
    <p>
      <strong>Prioridad:</strong> 
      <span :style="{ backgroundColor: getPriorityColor(task.priority) }">
        {{ task.priority }}
      </span>
    </p>
    <p>
      <strong>Estado:</strong>
      <select v-model="localStatus" @change="updateStatus($event.target.value)">
        <option value="created">Creado</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completado</option>
      </select>
    </p>

    <div class="task-actions">
      <button @click="$emit('delete', task.id)">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['updateStatus', 'delete', 'edit']);

const localStatus = ref(props.task.status); // Estado local para el select

const updateStatus = (status) => {
  emit('updateStatus', status);
};

const editTask = () => {
  emit('edit', props.task); // Emitimos el evento para editar la tarea
};

const getPriorityColor = (priority) => {
  // Colores basados en la prioridad
  switch (priority) {
    case '1':
      return 'red';
    case '2':
      return 'orange';
    case '3':
      return 'yellow';
    case '4':
      return 'green';
    case '5':
      return 'blue';
    default:
      return 'transparent';
  }
};
</script>

<style scoped>
.task-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  color: rgb(255, 255, 255);
  margin-bottom: 16px;
  background-color: #191e29;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.task-card h3 {
  margin: 0 0 8px;
  font-size: 24px; /* Hacemos el título más grande */
}

.task-card p {
  margin: 4px 0;
}

.task-card span {
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
}

.task-actions {
  margin-top: 16px;
}

button {
  margin-right: 8px;
}
</style>
