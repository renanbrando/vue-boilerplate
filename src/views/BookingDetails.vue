<template>
  <v-container fluid style="margin: 0; padding: 0">
    <v-tabs v-model="tab" fixed-tabs bg-color="black" color="primary">
      <v-tab value="reservation" class="text-unset">Reserva</v-tab>
      <v-tab value="visitors" class="text-unset">Visitantes</v-tab>
      <v-tab value="vehicle" class="text-unset">Veículos</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="reservation">
        <v-row no-gutters class="mt-6">
          <v-col cols="12" align="center">
            <v-tooltip text="Copiar">
              <template #activator="{ props }">
                <span
                  class="text-h6 pointer"
                  v-bind="props"
                  @click="copy(formatUnit(selectedBooking.unitName), 'Apartamento copiado')"
                  >Apartamento: {{ formatUnit(selectedBooking.unitName) }}</span
                >
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2 mx-4">
          <v-col cols="12" align="center">
            <v-text-field
              v-model="name"
              label="Nome"
              variant="underlined"
              readonly
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(name, 'Nome copiado')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="email"
              label="E-mail"
              variant="underlined"
              readonly
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(email, 'E-mail copiado')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="checkin"
              label="Entrada"
              variant="underlined"
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(checkin, 'Entrada copiada')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="checkout"
              label="Saída"
              variant="underlined"
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(checkout, 'Saída copiada')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="phone"
              label="Telefone"
              variant="underlined"
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(phone, 'Telefone copiado')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="document"
              label="Documento"
              variant="underlined"
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon
                      class="pointer"
                      v-bind="props"
                      @click="copy(document, 'Documento copiado')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="birthdate"
              label="Data de nascimento"
              variant="underlined"
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon
                      class="pointer"
                      v-bind="props"
                      @click="copy(birthdate, 'Data de Nascimento copiada')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row
          v-if="
            selectedBooking.custom9.length > 0 &&
            selectedBooking.precheckin?.guests?.length &&
            selectedBooking.precheckin?.guests[0]?.name.length
          "
          no-gutters
          class="mt-2"
        >
          <v-col cols="12" align="center">
            <span class="text-h6">Acompanhante</span>
          </v-col>
        </v-row>
        <v-row
          v-for="guest in selectedBooking?.precheckin?.guests"
          v-if="
            selectedBooking.custom9.length > 0 &&
            selectedBooking.precheckin?.guests?.length &&
            selectedBooking.precheckin?.guests[0]?.name.length
          "
          :key="guest.id"
          no-gutte
          no-gutters
          class="mt-2 mx-4"
        >
          <v-col cols="12" align="center">
            <v-text-field
              v-model="guest.name"
              label="Nome"
              variant="underlined"
              readonly
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon class="pointer" v-bind="props" @click="copy(guest.name, 'Nome copiado')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-text-field
              v-model="guest.doc"
              label="Documento"
              variant="underlined"
              readonly
              hide-details
              class="mb-2"
            >
              <template #append-inner>
                <v-tooltip text="Copiar">
                  <template #activator="{ props }">
                    <v-icon
                      class="pointer"
                      v-bind="props"
                      @click="copy(guest.doc, 'Documento copiada')"
                      >mdi-clipboard-multiple-outline</v-icon
                    >
                  </template>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="visitors">
        <v-row v-if="visitors.length" no-gutters>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel v-for="visitor in visitors" :key="visitor.doc">
                <template #title>
                  <div style="display: flex; justify-content: space-between; align-items: center">
                    <div style="display: flex; align-items: center">
                      <v-icon size="30" class="mr-2">mdi-account</v-icon>
                      <div class="ml-2">
                        <small :style="`color: #${selectedBooking?.flagColor}`">{{
                          selectedBooking?.room.property.name
                        }}</small>
                        <br />
                        <span>{{ visitor.name }}</span>
                        <br />
                        <small class="text-grey"> {{ visitor.doc }}</small>
                      </div>
                    </div>
                  </div>
                </template>
                <template #text>
                  <v-row no-gutters>
                    <v-col cols="12" align="center">
                      <v-text-field
                        v-model="visitor.name"
                        label="Nome"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="copy(visitor.name, 'Nome copiado')"
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="visitor.doc"
                        label="Documento"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="copy(visitor.doc, 'Documento copiado')"
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row v-else no-gutters class="mt-4">
          <v-col cols="12" align="center"> Nenhum visitante cadastrado. </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="vehicle">
        <v-row v-if="selectedBooking.custom2" no-gutters>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <template #title>
                  <div style="display: flex; justify-content: space-between; align-items: center">
                    <div style="display: flex; align-items: center">
                      <v-icon size="30" class="mr-2">mdi-car</v-icon>
                      <div class="ml-2">
                        <small :style="`color: #${selectedBooking?.flagColor}`">{{
                          selectedBooking?.room.property.name
                        }}</small>
                        <br />
                        <span>{{ formatVehicle(selectedBooking.custom2).model }}</span> -
                        <span>Cor: {{ formatVehicle(selectedBooking.custom2).color }}</span>
                        <br />
                        <small class="text-grey">
                          {{ formatVehicle(selectedBooking.custom2).plate }}</small
                        >
                      </div>
                    </div>
                  </div>
                </template>
                <template #text>
                  <v-row no-gutters>
                    <v-col cols="12" align="center">
                      <v-text-field
                        v-model="formatVehicle(selectedBooking.custom2).model"
                        label="Modelo"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="
                                  copy(
                                    formatVehicle(selectedBooking.custom2).model,
                                    'Modelo copiado'
                                  )
                                "
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="formatVehicle(selectedBooking.custom2).color"
                        label="Cor"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="
                                  copy(formatVehicle(selectedBooking.custom2).color, 'Cor copiada')
                                "
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="formatVehicle(selectedBooking.custom2).plate"
                        label="Placa"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="
                                  copy(
                                    formatVehicle(selectedBooking.custom2).plate,
                                    'Placa copiada'
                                  )
                                "
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="selectedBooking.formattedArrival"
                        label="Entrada"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="copy(selectedBooking.formattedArrival, 'Entrada copiada')"
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="selectedBooking.formattedDeparture"
                        label="Saída"
                        variant="underlined"
                        readonly
                        hide-details
                        class="mb-2"
                      >
                        <template #append-inner>
                          <v-tooltip text="Copiar">
                            <template #activator="{ props }">
                              <v-icon
                                class="pointer"
                                v-bind="props"
                                @click="copy(selectedBooking.formattedDeparture, 'Saída copiada')"
                                >mdi-clipboard-multiple-outline</v-icon
                              >
                            </template>
                          </v-tooltip>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row v-else no-gutters class="mt-4">
          <v-col cols="12" align="center"> Não há veículos cadastrados. </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <toast ref="toastRef" />
    <edit-guest-dialog ref="editGuest" />
    <!-- <div :class="$vuetify.display.lgAndUp ? 'fab-wrapper-desktop' : 'fab-wrapper-mobile'">
      <v-tooltip text="Enviar dados do apartamento">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon="mdi-cellphone-key"
            size="x-large"
            color="blue"
            :disabled="isLoading || !selectedBooking.custom9.length"
            :loading="isLoading"
            @click="sendMessage"
          />
        </template>
      </v-tooltip>
    </div> -->
    <div
      :class="
        $vuetify.display.lgAndUp ? 'button-bottom-wrapper-desktop' : 'button-bottom-wrapper-mobile'
      "
    >
      <v-divider class="mb-6 mt-8" />
      <div style="padding-left: 50px; padding-right: 50px">
        <v-btn
          block
          size="x-large"
          color="green"
          rounded="xl"
          class="mb-3 text-unset"
          :disabled="
            isFinishing ||
            !selectedBooking.custom9.length ||
            !!selectedBooking?.precheckin?.checkinDone
          "
          :loading="isFinishing"
          @click="finishCheckin"
        >
          {{
            `${!!selectedBooking?.precheckin?.checkinDone ? 'Entrada Registrada' : 'Registrar Entrada'}`
          }}
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import EditGuestDialog from '@/components/dialogs/EditGuestDialog.vue'
import Toast from '@/components/Toast.vue'
import { writeClipboardText } from '@/helpers'
import { ref } from 'vue'
import { useList } from '@/composables'
import { format } from 'date-fns'
import { formatVehicle } from '@/helpers'
import api from '@/api'
import { formatUnit } from '@/helpers'

window.scrollTo({ top: 0, behavior: 'smooth' })

const { selectedBooking, tab: stateTab } = useList()
const editGuest = ref()
const tab = ref(stateTab)
const toastRef = ref()
const isFinishing = ref(false)

const name = ref(selectedBooking.precheckin?.name || '')
const email = ref(selectedBooking.precheckin?.email || '')
const checkin = ref(selectedBooking.formattedArrival || '')
const checkout = ref(selectedBooking.formattedDeparture || '')
const phone = ref(selectedBooking.precheckin?.phone || '')
const document = ref(selectedBooking.precheckin?.doc || '')
const birthdate = ref(
  selectedBooking.precheckin?.birthday
    ? format(new Date(selectedBooking.precheckin?.birthday), 'dd/MM/yyyy')
    : '' || ''
)

const copy = (text: string, message: string) => {
  writeClipboardText(text).then(() => {
    toastRef.value?.show(message, {
      timeout: 2000,
      color: 'green',
    })
  })
}

const visitors = ref(selectedBooking.precheckin?.visitors || [])

// const sendMessage = async () => {
//   isLoading.value = true
//   api
//     .post(`/check-in-api/precheckin/confirmation/${selectedBooking.id}`)
//     .then(() => {
//       toastRef.value?.show('Mensagem enviada com sucesso', {
//         timeout: 2000,
//         color: 'green',
//       })
//     })
//     .catch(() => {
//       toastRef.value?.show('Erro ao enviar mensagem', {
//         timeout: 2000,
//         color: 'error',
//       })
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }

const finishCheckin = () => {
  isFinishing.value = true
  api
    .post(`/check-in-api/precheckin/finish/${selectedBooking.id}`)
    .then(() => {
      toastRef.value?.show('Check-in finalizado com sucesso', {
        timeout: 2000,
        color: 'green',
      })
    })
    .catch(() => {
      toastRef.value?.show('Erro ao registrar Check-in', {
        timeout: 2000,
        color: 'error',
      })
    })
    .finally(() => {
      isFinishing.value = false
    })
}
</script>
<style lang="scss" scoped>
.text-unset {
  text-transform: unset !important;
  letter-spacing: 0px !important;
}

.pointer {
  cursor: pointer;
}

.fab-wrapper-desktop {
  position: fixed;
  bottom: 10rem;
  right: 3rem;
  z-index: 9999;
}

.fab-wrapper-mobile {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 9999;
}

.button-bottom-wrapper-desktop {
  position: fixed;
  bottom: 0rem;
  width: 100%;
}

.button-bottom-wrapper-mobile {
  bottom: 0rem;
  width: 100%;
}
</style>
