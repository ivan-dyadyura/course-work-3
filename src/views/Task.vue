<template>
  <template v-if="loading">
    <p class="text-white center">Загрузка</p>
  </template>
  <template v-else>
    <div class="card">
      <h2>{{ currentTask.title }}</h2>
      <p><strong>Статус</strong>:
        <AppStatus :status="currentTask.status"/>
      </p>
      <p><strong>Дэдлайн</strong>: {{ currentTask.date }}</p>
      <p><strong>Описание</strong>: {{ currentTask.description }}</p>
      <div>
        <button class="btn" @click="takeToWork">Взять в работу</button>
        <button class="btn primary" @click="complete">Завершить</button>
        <button class="btn danger" @click="cancel">Отменить</button>
      </div>
    </div>
    <h3 class="text-white center">
      Задача с id = <strong>{{ currentTask.id }}</strong>.
    </h3>
  </template>
</template>

<script>
// import { ref } from 'vue'
import AppStatus from '../components/AppStatus'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()
    const taskId = route.params.taskId
    const currentTask = ref({})
    const loading = ref(true)

    onMounted(() => {
      store.dispatch('loadContent').then(() => {
        store.getters.tasks.find((task) => {
          if (task.id === taskId) {
            currentTask.value = task
          }
          loading.value = false
        })
      })
    })

    async function addContent (status) {
      if (currentTask.value.title) {
        try {
          console.log(taskId)
          await fetch(`https://coursework-3-d4de3-default-rtdb.firebaseio.com/tasks/${taskId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: status,
              date: currentTask.value.date,
              description: currentTask.value.description,
              title: currentTask.value.title
            })
          })
          currentTask.value.status = status

          store.dispatch('loadContent').then()
          console.log('rrr')
        } catch (e) {
          console.log(e)
        }
      }
    }

    const takeToWork = (status) => addContent('taken')
    const complete = (status) => addContent('ready')
    const cancel = (status) => addContent('canceled')

    return {
      currentTask,
      takeToWork,
      complete,
      cancel,
      loading
    }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>
