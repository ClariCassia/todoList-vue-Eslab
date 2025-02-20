<template>
    <div class="container-list">
        <TasksFilter></TasksFilter>       
        <TasksProgress :progress="processed()" :tasks="taskStore.filteredTasks"></TasksProgress>
        <ul>
            <TaskItem v-for="(task, index) in taskStore.filteredTasks" :key="task.name" :task="task" :index="index" />
        </ul>
    </div>
</template>

<script setup>

const taskStore = useTaskStore();

/**
 * Calcula a porcentagem de tarefas concluídas.
 * 
 * A função calcula a porcentagem de tarefas que foram marcadas como concluídas (não pendentes) 
 * em relação ao total de tarefas. Retorna a porcentagem arredondada. Se não houver tarefas, 
 * o valor retornado é 0.
 * 
 * @function processed
 * @returns {number} A porcentagem de tarefas concluídas (de 0 a 100).
 */
const processed = () => {
    const total = taskStore.tasks.length;
    const done = taskStore.tasks.filter(t => !t.pending).length;
    return Math.round((done / total) * 100) || 0;
}

</script>
