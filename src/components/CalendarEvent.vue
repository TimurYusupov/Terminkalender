<template>
   <div class="alert text-center" :class="alertColor">
      <Transition
         name="fade"
         mode="out-in"
         @after-enter="setInputFocus()"
      >
         <div v-if="!event.edit">
            <div>
               <strong>{{ priorityDisplayName }}</strong>
            </div>
            <div>{{ event.title }}</div>
            <div>
               <i
                  class="fas fa-edit me-2"
                  role="button"
                  @click="editEvent(day.id, event.title)"
               ></i>
               <i
                  class="far fa-trash-alt"
                  role="button"
                  @click="deleteEvent(day.id, event.title)"
               ></i>
            </div>
         </div>

         <div v-else>
            <input
               type="text"
               class="form-control"
               :placeholder="event.title"
               v-model="newEventTitle"
               ref="newEventTitleInputRef"
            />
            <select
               class="form-select mt-2"
               v-model="newEventPriority"
            >
               <option value="-1">Hoch</option>
               <option value="0">Mittel</option>
               <option value="1">Tief</option>
            </select>
            <hr />
            <i
               class="fas fa-check"
               role="button"
               @click="updateEvent(day.id, event.title)"
            ></i>
         </div>
      </Transition>
   </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { calendarStore } from '../store'

const props = defineProps({
   day: {
      type: Object,
      required: true
   },
   event: {
      type: Object,
      required: true
   }
})

const store = calendarStore()
const newEventTitle = ref('')
const newEventPriority = ref(props.event.priority)
const newEventTitleInputRef = ref(null)

const priorityDisplayName = computed(() => {
   switch (props.event.priority) {
      case 1:
         return 'Tief'
      case 0:
         return 'Mittel'
      case -1:
         return 'Hoch'
      default:
         return 'Unbekante Priorität'
   }
})

const alertColor = computed(() => {
   return `alert-${props.event.color}`
})

const editEvent = (dayId, eventTitle) => {
   store.editEvent(dayId, eventTitle)

   // nicht mehr erforderlich wegen @after-enter="setInputFocus()"
   /* nextTick(() => {
      newEventTitleInputRef.value.focus()
   }) */
}

const deleteEvent = (dayId, eventTitle) => {
   store.deleteEvent(dayId, eventTitle)
}

const updateEvent = (dayId, eventTitle) => {
   store.updateEvent(dayId, eventTitle, {
      title: newEventTitle.value,
      priority: newEventPriority.value
   })
}

const setInputFocus = () => {
   if (newEventTitleInputRef.value) {
      newEventTitleInputRef.value.focus()
      newEventTitleInputRef.value.select()
   }
}
</script>

<style scoped></style>
