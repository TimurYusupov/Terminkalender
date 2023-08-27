<template>
   <div class="card">
      <div class="card-header text-center bg-success text-white">
         <strong>Einstellungen</strong>
      </div>

      <div class="card-body">
         <ul class="nav nav-pills nav-fill">
            <li class="nav-item" role="button">
               <a
                  class="nav-link"
                  :class="isActiveView('CalendarWeek')"
                  @click="setActiveView('CalendarWeek')"
                  ><i class="fas fa-table text-success"></i
               ></a>
            </li>
            <li class="nav-item" role="button">
               <a
                  class="nav-link"
                  :class="isActiveView('CalendarWeekAsList')"
                  @click="setActiveView('CalendarWeekAsList')"
                  ><i class="fas fa-list text-success"></i
               ></a>
            </li>
         </ul>

         <hr />

         <ul class="nav nav-pills nav-fill">
            <li class="nav-item" role="button">
               <a
                  class="nav-link"
                  :class="isActiveOrdering('priority')"
                  @click="changeOrdering('priority')"
                  ><i
                     class="fas fa-sort-numeric-down-alt text-success"
                  ></i
               ></a>
            </li>
            <li class="nav-item" role="button">
               <a
                  class="nav-link"
                  :class="isActiveOrdering('title')"
                  @click="changeOrdering('title')"
                  ><i class="fas fa-sort-alpha-down text-success"></i
               ></a>
            </li>
         </ul>
      </div>
   </div>
</template>

<script setup>
import { calendarStore } from '../store'

const store = calendarStore()

const isActiveView = (view) => {
   if (view === store.view) {
      return ['border border-success']
   }
}

const isActiveOrdering = (ordering) => {
   if (ordering === store.activeOrdering) {
      return ['border border-success']
   }
}

const setActiveView = (newView) => {
   store.setActiveView(newView)
}

const changeOrdering = (ordering) => {
   store.setActiveordering(ordering)
}
</script>

<style scoped></style>
