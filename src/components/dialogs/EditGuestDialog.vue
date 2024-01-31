<template>
  <v-dialog v-model="editGuestDialog" width="500">
    <template #default="{ isActive }">
      <v-card title="Editar Acompanhante">
        <v-card-text>
          <v-form v-model="form">
            <v-text-field v-model="name" label="Nome" clearable variant="underlined" />
            <v-text-field v-model="document" label="Documento" clearable variant="underlined" />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancelar" color="primary" @click="isActive.value = false"></v-btn>
          <v-btn text="Atualizar" color="primary" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const editGuestDialog = ref(false)
const form = ref(false)
const name = ref('')
const document = ref('')

const openEditGuestDialog = () => {
  editGuestDialog.value = true
}

defineExpose({
  openEditGuestDialog,
})
</script>
