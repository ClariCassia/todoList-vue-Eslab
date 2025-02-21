<template>
  <li class="container">
    <div class="card-task" :class="stateClass">
      <span v-if="!editing" class="span-edit">
        <span :class="{ 'completed': !task.pending }" class="task">{{ task.name }}</span>
        <div>
        </div>
        <div class="container-buttons">
          <button class="buttons" @click="toggleTask(index)" :title="stateTitle"><font-awesome icon="check" /></button>
          <button class="buttons" @click="startEditing"> <font-awesome icon="pencil" title="Editar Tarefa" /></button>
          <button class="buttons" @click="removeTask(index)" title="Excluir Tarefa"> <font-awesome icon="trash"
              class="close" /></button>
        </div>
      </span>

      <span class="span-edit" v-else>
        <input v-model="newTaskName" />
        <div class="buttons-edit">
          <button @click="saveEdit" class="buttons" title="Editar Tarefa"> <font-awesome icon="floppy-disk" /></button>
          <span class="buttons" @click="removeTask(index)" title="Excluir Tarefa"> <font-awesome icon="trash"
              class="close" /></span>
        </div>
      </span>
    </div>

  </li>
</template>

<script setup>

const taskStore = useTaskStore()
const props = defineProps(['task', 'index'])
const editing = ref(false)
const newTaskName = ref(props.task.name)


/**
 * Computed property que retorna as classes dinâmicas com base no estado da tarefa.
 * 
 * Aplica a classe 'pending' se a tarefa estiver pendente e 'done' se estiver concluída.
 * 
 * @constant {ComputedRef<Object>} stateClass
 * @returns {Object} Objeto contendo as classes CSS dinâmicas para o estado da tarefa.
 */
const stateClass = computed(() => ({
  pending: props.task.pending,
  done: !props.task.pending
}))

/**
 * Computed property que retorna o título dinâmico com base no estado da tarefa.
 * 
 * Exibe 'Marcar como concluído' se a tarefa estiver pendente e 
 * 'Marcar como pendente' se a tarefa estiver concluída.
 * 
 * @constant {ComputedRef<string>} stateTitle
 * @returns {string} O título correspondente ao estado atual da tarefa.
 */
const stateTitle = computed(() =>
  props.task.pending ? 'Marcar como concluído' : 'Marcar como pendente'
)

/**
 * Alterna o estado da tarefa entre pendente e concluída.
 * 
 * Chama o método `toggleTask` da store para atualizar o estado da tarefa com base no índice fornecido.
 * 
 * @function toggleTask
 * @returns {void}
 */
const toggleTask = () => {
  taskStore.toggleTask(props.index)
}

/**
 * Inicia o modo de edição para a tarefa.
 * 
 * Define o estado de `editing` como `true` e copia o nome da tarefa atual para `newTaskName` 
 * para que o usuário possa editar o nome da tarefa.
 * 
 * @function startEditing
 * @returns {void}
 */
const startEditing = () => {
  editing.value = true
  newTaskName.value = props.task.name
}

/**
 * Remove uma tarefa após confirmação do usuário.
 * 
 * Exibe uma caixa de diálogo para confirmar a remoção. Se o usuário confirmar, 
 * a tarefa é removida da store com base no índice fornecido.
 * 
 * @function removeTask
 * @param {number} index - O índice da tarefa a ser removida.
 * @returns {void}
 */
const removeTask = (index) => {
  if (confirm('Tem certeza de que deseja remover esta tarefa?')) {
    taskStore.removeTask(index)
  }
}

/**
 * Salva a edição do nome da tarefa ou exibe um alerta se o novo nome estiver vazio.
 * 
 * Verifica se o novo nome da tarefa não está vazio antes de chamar a função `editTask` 
 * para salvar a alteração. Se o novo nome estiver vazio, exibe um alerta pedindo ao usuário 
 * para adicionar um nome para a tarefa. Após salvar a edição, o estado de `editing` é alterado 
 * para `false`, finalizando o modo de edição.
 * 
 * @function saveEdit
 * @returns {void}
 */
const saveEdit = () => {
  if (newTaskName.value.trim() !== '') {
    taskStore.editTask(props.index, newTaskName.value)
    editing.value = false
  } else {
    alert('Adicione um nome para uma nova tarefa')
  }
}

</script>


<style scoped>
.container {
  display: flex;
  margin-bottom: 15px;
}

.container-buttons {
  display: flex;
  align-items: center;
  width: 28%;
}

.card-task {
  position: relative;
  box-sizing: border-box;
  width: 450px;
  height: 40px;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: 300;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-soft);
  color: #FAFAFA;
}

.task .done {
  text-decoration: line-through;
}

.completed {
  text-decoration: line-through;
  color: #FAFAFA;
}

.span-edit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.span-edit input {
  border: none;
  outline: none;
  font-size: 1.2rem;
  font-weight: 300;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 2px 5px;

}

.buttons-edit {
  display: flex;
  align-items: center;
}

.buttons {
  all: unset;
  margin-right: 15px;
  cursor: pointer;
}

.pending {
  border-left: 12px solid #B73229;
  background-color: #EF5350;
}

.pending .close {
  background-color: #B73229;
}

.done {
  color: #DDD;
  border-left: 12px solid #0a8f08;
  background-color: #66BB6A;
}

.done .close {
  background-color: #0a8f08d3;
}

.close {
  font-size: 18px;
  display: flex;
  justify-content: center;
  background-color: transparent;
}

.buttons font-awesome:hover,
.buttons svg:hover {
  color: #cacac7;
  transition: color 0.3s;
}

@media (max-width: 480px) {
  .card-task {
    width: 90%;
  }
}
</style>