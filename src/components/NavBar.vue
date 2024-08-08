<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

    <v-toolbar-title class="text-h6">
      <v-img src="../assets/logo.png" height="64px" width="128px" />
    </v-toolbar-title>

    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :width="350" temporary>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="secondary"
      :to="item.route"
    >
      <template #prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title color="primary" v-text="item.title" />
    </v-list-item>
  </v-navigation-drawer>
  <toast ref="toastRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Toast from './Toast.vue'

const drawer = ref(false)

const items = ref([{ title: 'Home', icon: 'mdi-home', route: '/' }])

const toastRef = ref()
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
