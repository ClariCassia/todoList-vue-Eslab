<template>
    <div v-if="taskStore.tasks.length" class="container-progress">
        <div class="tasks-progress" title='Porcentagem de tarefas concluidas'>
            <span class="progress-value">
                {{ progress }}%
            </span>
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
    </div>
</template>

<script setup>

const taskStore = useTaskStore();

const props = defineProps({
    progress: {
        type: Number,
        default: 0
    }
});

</script>

<style>
.container-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    margin: 20px 0;
}

.tasks-progress {
    position: relative;
    width: 100%;
    height: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0px solid black;
}

.progress-bar {
    position: absolute;
    border-radius: 5px;
    height: 100%;
    background-color: var(--button-color);
    width: 0;
    transition: 1s ease-in-out;
    align-self: start;
}

.progress-value {
    font-size: 0.7rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.info-paragraph {
    font-size: 1rem;
    color: #FFF;
    margin: 0;
}

@media (max-width: 480px) {
    .tasks-progress {
        width: 80%;
    }
}
</style>