<template>
    <main>
        <div class="container">
            <h1>Minhas Tarefas</h1>
            <img src="@/public/images/clipboard.png" alt="">
        </div>
        <TasksCreator></TasksCreator>
        <TasksManager></TasksManager>
    </main>
</template>

<script setup>

definePageMeta({
    layout: 'default'
});

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container h1 {
    margin: 0 0 5px 0;
    font-weight: 500;
    font-size: 4rem;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
    padding: 20px 20px;
}

.container img {
    width: 120px;
    margin-bottom: 20px;
    height: auto;
    filter: drop-shadow(rgba(221, 220, 220, 0.356) 1px 1px 1px);
}

@media (max-width: 480px) {
    .container h1 {
        font-size: 2.5rem;
    }

    .container img {
        width: 70px;
        margin-bottom: 20px;
        height: auto;
        filter: drop-shadow(rgba(221, 220, 220, 0.356) 1px 1px 1px);
    }
}
</style>