<template>
  <v-layout>
    <nav-bar :has-back-button="false" />
    <v-main style="height: 100%; background-color: #f4f4f4; width: 100%">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
</script>
