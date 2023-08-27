<template>
   <div class="card border-start" :class="cardClasses">
      <div
         class="card-header text-center"
         :class="cardHeaderClasses"
         role="button"
         @click="setActiveDay(day.id)"
      >
         <strong>{{ day.fullName }}</strong>
      </div>

      <div class="card-body">
         <Transition name="fade" mode="out-in">
            <div v-if="day.events.length">
               <TransitionGroup name="list">
                  <CalendarEvent
                     v-for="event in store.sortedEvents(day.id)"
                     :key="event.title"
                     :day="day"
                     :event="event"
                  />
               </TransitionGroup>
            </div>
            <div v-else>
               <div class="alert alert-light text-center">
                  <i>Keine Termine</i>
               </div>
            </div>
         </Transition>
      </div>
   </div>
</template>

<script setup>
import { computed } from 'vue'
import { calendarStore } from '../store'
import CalendarEvent from './CalendarEvent.vue'

const store = calendarStore()

const props = defineProps({
   day: {
      type: Object,
      required: true,
      default: function () {
         return {
            id: -1,
            fullName: 'Fehlender Wochentag',
            events: []
         }
      }
   }
})

const cardClasses = computed(() => {
   // Variante 1
   // return props.day.active ? ['border-primary'] : null

   // Variante 2
   return props.day.id === store.activeDay.id
      ? ['border-primary']
      : null
})

const cardHeaderClasses = computed(() => {
   return props.day.id === store.activeDay.id
      ? ['bg-primary', 'text-white']
      : null
})

const setActiveDay = (dayId) => {
   store.setActiveDay(dayId)
}
</script>

<style scoped>
.list-enter-from {
   opacity: 0;
   transform: translateY(30px);
}
.list-enter-to {
   opacity: 1;
   transform: translateY(0);
}
.list-enter-active {
   transition: all 0.25s ease;
}
.list-leave-from {
   opacity: 1;
   transform: translateY(0);
}
.list-leave-to {
   opacity: 0;
   transform: translateY(30px);
}
.list-leave-active {
   transition: all 0.25s ease;
   /* position: absolute; */
}
.list-move {
   transition: all 0.8s ease;
}
</style>
