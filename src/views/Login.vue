<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12">
        <v-form v-model="form" class="mt-6" @submit="login">
          <v-text-field
            v-model.trim="email"
            placeholder="Usuário"
            variant="underlined"
            prepend-icon="mdi-account"
            :rules="emailRules"
          />
          <v-text-field
            v-model.trim="password"
            placeholder="Senha"
            variant="underlined"
            type="password"
            prepend-icon="mdi-lock"
          />
          <v-btn
            color="primary"
            block
            flat
            depressed
            height="40px"
            class="text-unset"
            :loading="loading"
            :disabled="loading"
            :rules="passwordRules"
            type="submit"
            rounded="xl"
            @click="login"
          >
            <span style="color: white">Login</span>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <Toast ref="toast" />
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import Toast from '@/components/Toast.vue'
import { useList } from '@/composables'
import type { Property } from '@/types/Booking'

const listComposable = useList()
const route = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const form = ref(false)
const toast = ref()

const login = async () => {
  if (!form.value) return
  loading.value = true
  await api
    .post('/concierge-user-api/login', {
      email: email.value,
      password: password.value,
    })
    .then(({ data }) => {
      localStorage.setItem('token-concierge', data.AccessToken)
      localStorage.setItem('user-concierge', JSON.stringify(data))
      const properties = data.properties.map((prop: Property) => prop.id)
      listComposable.setPropertiesIds(properties)
      route.replace('/home')
    })
    .catch(() => {
      toast.value?.show('Usuário ou senha inválidos', {
        timeout: -1,
        color: 'error',
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]

const passwordRules = [(v: string) => !!v || 'Senha é obrigatória']
</script>
<style lang="scss" scoped>
.text-unset {
  text-transform: unset !important;
  letter-spacing: 0px !important;
}
</style>
