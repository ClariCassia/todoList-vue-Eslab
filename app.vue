<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout />
    <NuxtPage />
  </div>
</template>

<script setup>

useHead({
  title: 'Minhas Tarefas',
  meta: [
    { name: 'description', content: 'Gerencie suas tarefas com eficiência' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/clipboard.png' }
  ]
});
</script>
