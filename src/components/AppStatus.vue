<template>
  <span class="badge" :class="statusClass">{{ statusText }}</span>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['status'],
  setup (props) {
    const statusClass = computed(() => {
      let result = 'primary'

      if (props.status === 'ready') {
        result = 'ready'
      }

      if (props.status === 'canceled') {
        result = 'danger'
      }

      if (props.status === 'taken') {
        result = 'warning'
      }

      return result
    })

    const statusText = computed(() => {
      let result = 'Активный'

      if (props.status === 'ready') {
        result = 'Выполнен'
      }

      if (props.status === 'canceled') {
        result = 'Отменен'
      }

      if (props.status === 'taken') {
        result = 'Выполняется'
      }

      return result
    })

    return {
      statusClass,
      statusText
    }
  }
}
</script>
