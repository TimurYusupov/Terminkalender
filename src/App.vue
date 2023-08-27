<template>
   <div class="container-fluid mt-5">
      <div class="row">
         <div class="col-12">
            <Transition name="fade" mode="out-in" appear>
               <component :is="dynamicView" />
            </Transition>
         </div>
      </div>

      <div class="row mt-3">
         <div class="col-4 offset-4">
            <CalendarEntry />
         </div>

         <div class="col-2 offset-2">
            <div class="float-end">
               <button
                  class="btn btn-lg mb-2"
                  :class="buttonSettingsClasses"
                  @click="toggleSettings()"
               >
                  <i class="fas fa-cogs"></i>
               </button>
            </div>
            <Transition name="fade">
               <CalendarSettings v-if="showSetting" />
            </Transition>
         </div>
      </div>
   </div>
</template>

<script setup>
import CalendarWeek from './components/CalendarWeek.vue'
import CalendarWeekAsList from './components/CalendarWeekAsList.vue'
import CalendarEntry from './components/CalendarEntry.vue'
import CalendarSettings from './components/CalendarSettings.vue'
import { computed, ref } from 'vue'
import { calendarStore } from './store'

const store = calendarStore()
const showSetting = ref(false)

const buttonSettingsClasses = computed(() => {
   return showSetting.value
      ? ['btn-success']
      : ['btn-outline-success']
})

const dynamicView = computed(() => {
   return store.view === 'CalendarWeek'
      ? CalendarWeek
      : CalendarWeekAsList
})

const toggleSettings = () => {
   showSetting.value = !showSetting.value
}
</script>

<style>
.square {
   width: 40px;
   height: 40px;
}
/* == Transtion Fade == */
.fade-enter-from {
   opacity: 0;
}
.fade-enter-to {
   opacity: 1;
}
.fade-enter-active {
   transition: all 0.25s ease-out;
}
.fade-leave-from {
   opacity: 1;
}
.fade-leave-to {
   opacity: 0;
}
.fade-leave-active {
   transition: all 0.25s ease-out;
}
</style>
