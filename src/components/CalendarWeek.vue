<template>
   <div class="card-group">
      <CalendarDay
         v-for="day in store.calendarWeekData"
         :key="day.id"
         :day="day"
      />
   </div>
</template>

<script setup>
import CalendarDay from './CalendarDay.vue'
import { calendarStore } from '../store/index.js'

const store = calendarStore()
</script>