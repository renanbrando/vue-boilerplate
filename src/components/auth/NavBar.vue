<template>
  <v-app-bar color="black" prominent>
    <v-app-bar-nav-icon v-if="!hasBackButton" variant="text" @click.stop="drawer = !drawer" />

    <v-toolbar-title v-if="!hasBackButton && $vuetify.display.lgAndUp" class="text-h6"
      >Reservas</v-toolbar-title
    >
    <v-toolbar-title v-if="hasBackButton" class="pointer" @click="goBack">
      <v-icon size="25">mdi-arrow-left</v-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-spacer v-if="$vuetify.display.mdAndDown"></v-spacer>
    <span v-if="!bookId?.length" :class="$vuetify.display.lgAndUp ? 'text-h6' : 'text-caption'"
      >{{
        capitalizeFirstLetter(
          format(parseISO(listComposable.selectedDate), 'EEEE, d MMMM', { locale: ptBR })
        )
      }}
      de
      {{ new Date(listComposable.selectedDate).getFullYear() }}
    </span>
    <v-tooltip text="Copiar">
      <template #activator="{ props }">
        <span
          v-if="bookId?.length"
          v-bind="props"
          class="pointer text-h6"
          @click="copy(bookId, 'ID Copiado')"
          >Reserva {{ bookId }}</span
        >
      </template>
    </v-tooltip>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <v-btn v-if="!hasShareButton" variant="text" icon="mdi-sync" @click="reloadBookings" />
    <v-btn v-if="!hasShareButton" variant="text" icon="mdi-magnify" @click="openSearchDialog" />
    <v-tooltip v-else text="Compartilhar reserva">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          icon="mdi-share-variant"
          @click="copy(shareContent as string, 'Booking copiado')"
        />
      </template>
    </v-tooltip>

    <v-btn v-if="!hasDeleteButton" variant="text" icon="mdi-target" @click="openPropertiesDialog" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :width="350" temporary>
    <v-list-item
      style="background-color: black; color: white; height: 100px"
      class="px-6 py-5 pointer"
      prepend-avatar="../../assets/logo.png"
      :title="user.name"
      :subtitle="user.email"
    >
    </v-list-item>

    <div v-for="(item, index) in items" :key="item.title" class="pointer" @click="item.action">
      <v-row class="px-6 py-5">
        <v-col cols="2">
          <v-icon>{{ item.icon }}</v-icon>
        </v-col>
        <v-col cols="10">
          <span>{{ item.title }}</span>
        </v-col>
      </v-row>
      <v-divider v-if="index < 2"></v-divider>
    </div>
  </v-navigation-drawer>

  <properties-dialog ref="propertiesDialogRef" />
  <search-dialog ref="searchDialogRef" />
  <toast ref="toastRef" />
</template>

<script lang="ts" setup>
import { format, parseISO } from 'date-fns'
import { ref } from 'vue'
import { ptBR } from 'date-fns/locale'
import { capitalizeFirstLetter } from '@/helpers'
import { useRouter } from 'vue-router'
import { writeClipboardText } from '@/helpers'
import PropertiesDialog from '../dialogs/PropertiesDialog.vue'
import SearchDialog from '../dialogs/SearchDialog.vue'
import Toast from '../Toast.vue'
import { useList } from '@/composables'

const listComposable = useList()
const drawer = ref(false)

const route = useRouter()
const items = ref([
  { title: 'Ligar', icon: 'mdi-phone', action: () => call() },
  { title: 'Sair', icon: 'mdi-power', action: () => signOut() },
])

defineProps<{
  hasBackButton?: boolean
  hasShareButton?: boolean
  hasDeleteButton?: boolean
  bookId?: string
  shareContent?: string
}>()

const propertiesDialogRef = ref()
const searchDialogRef = ref()
const toastRef = ref()
const user = ref(JSON.parse(localStorage.getItem('user-concierge') as string))

const signOut = () => {
  localStorage.removeItem('token-concierge')
  localStorage.removeItem('user-concierge')
  route.replace('/login')
  listComposable.selectedDate = format(new Date(), 'yyyy-MM-dd')
  listComposable.setPropertiesIds([])
}

const call = () => {
  const number = 'tel:++551131361757'
  window.open(number, '_system')
}

const openPropertiesDialog = () => {
  propertiesDialogRef.value.openPropertiesDialog()
}

const openSearchDialog = () => {
  searchDialogRef.value.openSearchDialog()
}

const goBack = () => {
  route.back()
}

const copy = (text: string, message: string) => {
  writeClipboardText(text).then(() => {
    toastRef.value?.show(message, {
      timeout: 2000,
      color: 'green',
    })
  })
}

const reloadBookings = async () => {
  listComposable.isLoading = true
  await listComposable.getBookings()
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
