<script setup lang="ts">

const taskStore = useTaskStore();

const showModal = ref<boolean>(false)

/**
 * Manipula a confirmação da exclusão de todas as tarefas.
 * 
 * Esta função limpa todas as tarefas do `taskStore` e fecha o modal de confirmação.
 * 
 * @function handleConfirm
 * @returns {void}
 */
const handleConfirm = () => {
  taskStore.clearTasks();
  showModal.value = false;
};

</script>

<template>
  <div v-if="taskStore.tasks.length" class="container">
    <div id="firstFilter" class="filter-switch">
      <input v-model="taskStore.selectedFilter" id="option1" name="options" type="radio" value="todas" />
      <label class="option" for="option1">Todas</label>

      <input v-model="taskStore.selectedFilter" id="option2" name="options" type="radio" value="pendentes" />
      <label class="option" for="option2">Pendentes</label>

      <input v-model="taskStore.selectedFilter" id="option3" name="options" type="radio" value="concluidas" />
      <label class="option" for="option3">Concluídas</label>

      <span class="background"></span>
    </div>

    <span v-if="taskStore.tasks.length > 0" title="Deletar todas as Tarefas" @click="showModal = true">
      <font-awesome icon="trash" class="trash" />
    </span>

    <ModalTrash v-if="showModal" :message="'Tem certeza que deseja deletar todas as tarefas?'" @confirm="handleConfirm"
      @cancel="showModal = false" />
  </div>

  <p v-else>Nenhuma tarefa registrada</p>

</template>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.filter-switch {
  position: relative;
  display: flex;
  align-items: center;
  height: 28px;
  width: 352px;
  overflow: hidden;
}

.filter-switch input {
  display: none;
}

.filter-switch label {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.5s;
  font-size: 15px;
}

.filter-switch .background {
  position: absolute;
  width: 33.33%;
  height: 23px;
  background-color: var(--button-color);
  border-radius: 11px;
  transition: left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 0px solid black;
  box-shadow: var(--shadow-soft);
}

#option1:checked~.background {
  left: 0;
}

#option2:checked~.background {
  left: 33.33%;
  /* Move para o meio */
}

#option3:checked~.background {
  left: 66.66%;
  /* Move para a última opção */
}


#option1:checked+label[for="option1"],
#option2:checked+label[for="option2"],
#option3:checked+label[for="option3"] {
  color: #212121;

}

#option1:not(:checked)+label[for="option1"],
#option2:not(:checked)+label[for="option2"],
#option3:not(:checked)+label[for="option3"] {
  color: #7d7d7d;
}

.trash {
  cursor: pointer;
  color: #EF5350;
}

.trash:hover {
  transition: color 0.3s;
  color: #ef53508c;
}
</style>
