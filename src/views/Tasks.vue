<template>
  <template v-if="loading">
    <p class="text-white center">Загрузка</p>
  </template>
  <template v-else>
    <h1 class="text-white center" v-if="data.length === 0">Задач пока нет</h1>
    <template v-else>
      <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
      <div class="card" v-for="item in data" :key="item.id">
        <h2 class="card-title">
          {{ item.title }}
        </h2>
        <app-status :status="item.status"></app-status>
        <p>
          {{ item.description }}
          <strong>
            <small class="bold">
              {{ item.date }}
            </small>
          </strong>
        </p>
        <router-link class="btn primary" :to="'/tasks/' +  item.id">
          Посмотреть
        </router-link>
      </div>
    </template>
  </template>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import AppStatus from '@/components/AppStatus'

export default {
  setup () {
    const store = useStore()
    const loading = ref(true)
    const activeTasks = computed(() => {
      return store.getters.activeTask
    })
    const data = computed(() => {
      return store.getters.tasks
    })

    onMounted(() => {
      store.dispatch('loadContent').then(() => {
        loading.value = false
      })
    })

    return {
      data,
      activeTasks,
      loading
    }
  },
  components: { AppStatus }
}
</script>
