<template>
  <v-row justify="center">
    <v-dialog
      v-model="propertiesDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="black">
          <v-btn icon dark @click="propertiesDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Propriedades</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-tooltip :text="tooltipText">
              <template #activator="{ props }">
                <v-btn icon v-bind="props" @click="selectAll">
                  <v-icon>mdi-check-all</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-toolbar-items>
        </v-toolbar>
        <div class="px-4 mt-2">
          <v-checkbox
            v-for="property in properties"
            :key="property.id"
            v-model="selected"
            hide-details
            :label="property.name"
            :value="property.id"
          />
        </div>
        <v-row no-gutters class="mt-4">
          <v-col cols="12" class="px-8">
            <v-btn
              color="green"
              block
              flat
              depressed
              height="40px"
              class="text-unset"
              type="submit"
              rounded="xl"
              @click="updateProperties"
            >
              <span style="color: white">Escolher</span>
            </v-btn></v-col
          >
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useList } from '@/composables'

const listComposable = useList()
const propertiesDialog = ref(false)
const tooltipText = ref('Marcar todas')

const openPropertiesDialog = () => {
  propertiesDialog.value = true
}

const closeDialog = () => {
  propertiesDialog.value = false
}

const selected = ref([])
const user = JSON.parse(localStorage.getItem('user-concierge') || '{}')
const properties = user?.properties || []

const selectAll = () => {
  const allProps = properties.map((property: any) => property.id)
  if (selected.value.length === allProps.length) {
    tooltipText.value = 'Marcar todas'
    selected.value = []
    return
  }
  tooltipText.value = 'Desmarcar todas'
  selected.value = properties.map((property: any) => property.id)
}

const updateProperties = () => {
  listComposable.setPropertiesIds(selected.value)
  closeDialog()
}
defineExpose({ openPropertiesDialog })
</script>
