<template>
  <v-snackbar v-model="model" :timeout="options.timeout" :color="options.color">
    {{ text }}
    <template #actions>
      <v-btn color="white" variant="text" class="text-unset" @click="close"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue'

type Options = {
  timeout: number
  color: string
}

const model = ref(false)
const text = ref('')
const options = ref({
  timeout: 3000,
  color: 'default',
})
const promise = ref({
  // eslint-disable-next-line no-unused-vars
  resolve: (value: boolean) => {},
  // eslint-disable-next-line no-unused-vars
  reject: (value: boolean) => {},
})

const show = (_text: string, _options: Options) => {
  return new Promise((resolve, reject) => {
    if (model.value) model.value = false
    nextTick(() => {
      promise.value = Object.assign({}, { resolve, reject })
      text.value = _text
      options.value = Object.assign(_options, options)
      model.value = true
    })
  })
}

const close = () => {
  promise.value.resolve(true)
  model.value = false
}

defineExpose({
  show,
  close,
})
</script>
