<template>
  <div>
    <input v-model="newTask" type="text" class="form-element" placeholder="Adicione uma nova tarefa"
      :class="{ 'input-error': nameError }" @keydown.enter="validateInput" @focus="clearError" ref="newTaskInput">

    <button @click="validateInput" class="form-element" title="Adicionar nova tarefa">+</button>

    <div><span v-if="nameError" class="error-message">{{ nameError }}</span></div>
  </div>
</template>

<script setup>

const taskStore = useTaskStore()
const newTask = ref('')
const nameError = ref('')
const newTaskInput = ref(null);

/**
 * Valida a entrada do usuário antes de adicionar uma nova tarefa.
 * 
 * - Se o campo estiver vazio, define uma mensagem de erro.
 * - Se a tarefa já existir (ignorando maiúsculas e minúsculas), define uma mensagem de erro.
 * - Caso contrário, adiciona a nova tarefa.
 * 
 * @function
 * @returns {void}
 */
const validateInput = () => {
  nameError.value = ''

  if (!newTask.value.trim()) {
    nameError.value = 'Adicione um nome para uma nova tarefa'
    return
  }

  const taskExists = taskStore.tasks.some(t => t.name.toLowerCase() === newTask.value.toLowerCase())
  if (taskExists) {
    nameError.value = 'Essa tarefa já existe! Use outro nome para uma nova tarefa.'
    return
  }
  addNewTask()
}

/**
 * Adiciona uma nova tarefa à lista de tarefas e reseta o campo de entrada.
 * 
 * - A tarefa adicionada contém um nome e é definida como pendente (`pending: true`).
 * - Após adicionar a tarefa, o campo de entrada (`newTask.value`) é resetado para uma string vazia.
 * 
 * @function
 * @returns {void}
 */
const addNewTask = () => {
  taskStore.addTask({ name: newTask.value, pending: true })
  newTask.value = ''
}
/**
 * Limpa a mensagem de erro relacionada ao nome da tarefa.
 * 
 * - Define `nameError.value` como uma string vazia, removendo qualquer mensagem de erro exibida anteriormente.
 * 
 * @function
 * @returns {void}
 */
const clearError = () => {
  nameError.value = ''
}

/**
 * Coloca o foco no campo de entrada quando o componente for montado.
 * 
 * @function
 * @returns {void}
 */
onMounted(() => {
  newTaskInput.value?.focus()
})

/**
 * Limpa o erro antes de desmontar o componente.
 * 
 * @function
 * @returns {void}
 */
onBeforeUnmount(() => {
  nameError.value = ''
})

</script>

<style scoped>
.new-task {
  margin: 35px;
}

.form-element {
  outline: none;
  font-size: 1rem;
  padding: 5px 10px 8px;
}

input.form-element {
  width: 450px;
  height: 30px;
  background: #FFF2;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 0px solid black;
  box-shadow: var(--shadow-soft);
}

button.form-element {
  border-left: none;
  height: 45px;
  background-color: var(--button-color);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: var(--shadow-soft);
  border: 0px solid black;
  cursor: pointer;
}

button:hover {
  background-color: #1E88E5;
  transition: 0.3s ease, transform 0.2s ease;
}

.error-message {
  color: #EF5350;
  font-size: 12px;
}

@media (max-width: 480px) {
  input.form-element {
    width: 350px;
    height: 30px;
  }
}
</style>
