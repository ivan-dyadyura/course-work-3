<template>
  <form class="card" @submit.prevent="submitHandler">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" required>
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" required>
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description" required></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useSetDate } from '@/use/setDate'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const description = ref('')
    const title = ref('')
    const date = ref(useSetDate('-', 3))
    let status = 'active'

    const isValid = computed(() => {
      return description.value !== '' && title.value !== '' && date.value !== ''
    })

    const submitHandler = e => {
      if (deadLinePassed()) {
        status = 'canceled'
      }

      if (isValid.value) {
        addContent()
        description.value = ''
        title.value = ''
        date.value = useSetDate('-', 3)
      }
    }

    const deadLinePassed = () => {
      const today = Number(useSetDate().replace(/-/g, ''))
      const deadLine = Number(date.value.replace(/-/g, ''))

      return today > deadLine
    }

    async function addContent () {
      try {
        await fetch('https://coursework-3-d4de3-default-rtdb.firebaseio.com/tasks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: date.value,
            description: description.value,
            title: title.value,
            status: status
          })
        })

        store.dispatch('loadContent').then()
      } catch (e) {
        console.log(e)
      }
    }

    return {
      submitHandler,
      date,
      description,
      title,
      isValid
    }
  }
}

</script>
