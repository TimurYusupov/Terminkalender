<template>
   <div id="calender-entry">
      <div class="card">
         <div class="card-header text-center">
            <h5>
               Neuer Termin für: <strong>{{ activeDayName }}</strong>
            </h5>
         </div>

         <div class="card-body">
            <div v-if="error" class="alert alert-danger">
               Der Titel darf nicht leer sein
            </div>
            <input
               type="text"
               class="form-control"
               placeholder="Neuer Eintrag"
               ref="eventTitleInput"
               v-model="event.title"
               @keyup.enter.exact="addEvent()"
               @keyup.ctrl.enter.exact="resetEventTitle()"
            />
            <select class="form-select mt-2" v-model="event.priority">
               <option value="-1">Hoch</option>
               <option value="0">Mittel</option>
               <option value="1">Tief</option>
            </select>
            <div class="text-center mt-3">
               <span
                  v-for="color in eventColors"
                  :key="color"
                  class="d-inline-block alert m-0 me-2 square"
                  :class="eventColorClasses(color)"
                  role="button"
                  @click="setEventColor(color)"
               >
               </span>
            </div>
            <hr />
            <div class="d-grid gap-2">
               <button class="btn btn-primary" @click="addEvent()">
                  Eintragen
               </button>
               <button
                  class="btn btn-danger"
                  @click="resetEventTitle()"
               >
                  Inhalt löschen
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { calendarStore } from '../store'

const store = calendarStore()
const eventColors = ref([
   'primary',
   'success',
   'info',
   'warning',
   'danger'
])
const event = ref({
   title: '',
   color: 'primary',
   priority: 0
})
const error = ref(false)
const eventTitleInput = ref(null)

const activeDayName = computed(() => {
   return store.activeDay.fullName
})

const eventColorClasses = (color) => {
   return [
      `alert-${color}`,
      event.value.color === color
         ? `border border-${event.value.color}`
         : ''
   ]
}

const setEventColor = (color) => {
   event.value.color = color
}

const addEvent = () => {
   if (event.value.title === '') {
      error.value = true
   } else {
      store.addEvent({
         title: event.value.title,
         color: event.value.color,
         priority: Number(event.value.priority),
         edit: false
      })
      event.value = {
         title: '',
         color: 'primary',
         priority: 0
      }
      error.value = false
   }
}

const resetEventTitle = () => {
   event.value.title = ''
}

onMounted(() => {
   eventTitleInput.value.focus()
})
</script>

<style scoped></style>
