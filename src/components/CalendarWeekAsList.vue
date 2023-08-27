<template>
   <div class="row">
      <div class="col-2 offset-3">
         <ul class="list-group">
            <li
               v-for="day in store.calendarWeekData"
               :key="day.id"
               class="list-group-item"
               :class="isActive(day.id)"
               @click="setActiveDay(day.id)"
            >
               {{ day.fullName }}
            </li>
         </ul>
      </div>

      <div class="col-4">
         <CalendarDay :day="activeDay" />
      </div>
   </div>
</template>

<script setup>
import { computed } from 'vue'
import { calendarStore } from '../store'
import CalendarDay from './CalendarDay.vue'

const store = calendarStore()

const activeDay = computed(() => {
   return store.activeDay
})

const setActiveDay = (dayId) => {
   store.setActiveDay(dayId)
}

const isActive = (dayId) => {
   if (dayId === activeDay.value.id) {
      return ['active']
   }
}
</script>

<style scoped></style>
