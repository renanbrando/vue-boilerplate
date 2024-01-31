<template>
  <v-layout>
    <nav-bar :has-back-button="false" />
    <v-main style="height: 100vh; background-color: #f4f4f4; width: 100%">
      <router-view />
    </v-main>
    <bottom-tab />
  </v-layout>
</template>
<script lang="ts" setup>
import NavBar from '@/components/auth/NavBar.vue'
import BottomTab from '@/components/auth/BottomTab.vue'
</script>
