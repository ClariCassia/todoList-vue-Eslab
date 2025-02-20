<template>
  <div class="modal-backdrop">
    <div class="modal">
      <p>{{ message }}</p>
      <button @click="confirmAction">Sim</button>
      <button @click="cancelAction">Não</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm', 'cancel']);

/**
 * Emite o evento 'confirm' para notificar o componente pai sobre a ação de confirmação.
 * 
 * @function
 * @returns {void}
 */
const confirmAction = () => {
  emit('confirm');
};

/**
 * Emite o evento 'confirm' para indicar que a ação de confirmação foi realizada.
 * 
 * @function confirmAction
 * @emits confirm - Evento emitido para notificar o componente pai sobre a confirmação.
 * @returns {void}
 */
const cancelAction = () => {
  emit('cancel'); 
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

.modal {
  color: #fff;
  max-width: 500px;
  width: 100%;
  text-align: center;
  animation: slideIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal button {
  background-color: #616161;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 10px;
  transition: background-color 0.5s ease;
  color: #fff;
}

.modal button:hover {
  background-color: #0c7cd5;
}
</style>