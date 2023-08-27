import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const calendarStore = defineStore('calendar', () => {
   const calendarWeekData = ref(
      JSON.parse(localStorage.getItem('calendarWeekData')) || [
         {
            id: 1,
            shortName: 'Mo',
            fullName: 'Montag',
            events: [],
            active: false
         },
         {
            id: 2,
            shortName: 'Di',
            fullName: 'Dienstag',
            events: [],
            active: false
         },
         {
            id: 3,
            shortName: 'Mi',
            fullName: 'Mittwoch',
            events: [],
            active: false
         },
         {
            id: 4,
            shortName: 'Do',
            fullName: 'Donnerstag',
            events: [],
            active: true
         },
         {
            id: 5,
            shortName: 'Fr',
            fullName: 'Freitag',
            events: [],
            active: false
         },
         {
            id: 6,
            shortName: 'Sa',
            fullName: 'Samstag',
            events: [],
            active: false
         },
         {
            id: 7,
            shortName: 'So',
            fullName: 'Sonntag',
            events: [],
            active: false
         }
      ]
   )

   const view = ref('CalendarWeek')
   const activeOrdering = ref('priority')

   const activeDay = computed(() => {
      return calendarWeekData.value.find((day) => day.active)
   })

   const sortedEvents = (dayId) => {
      const day = calendarWeekData.value.find(
         (day) => day.id === dayId
      )

      if (activeOrdering.value === 'priority') {
         return day.events.sort((a, b) => a.priority - b.priority)
      } else {
         return day.events.sort((a, b) =>
            a.title.localeCompare(b.title)
         )
      }
   }

   const editEvent = (dayId, eventTitle) => {
      calendarWeekData.value.forEach((day) => {
         day.events.forEach((event) => {
            event.edit = false
         })
      })
      const day = calendarWeekData.value.find(
         (day) => day.id === dayId
      )
      const event = day.events.find(
         (event) => event.title === eventTitle
      )
      event.edit = true
   }

   const deleteEvent = (dayId, eventTitle) => {
      const day = calendarWeekData.value.find(
         (day) => day.id === dayId
      )
      const eventIndex = day.events.findIndex(
         (event) => event.title === eventTitle
      )
      day.events.splice(eventIndex, 1)
      updateLocalStorage()
   }

   const updateEvent = (dayId, eventTitle, eventObj) => {
      eventObj.title =
         eventObj.title !== '' ? eventObj.title : eventTitle
      const day = calendarWeekData.value.find(
         (day) => day.id === dayId
      )
      const event = day.events.find(
         (event) => event.title === eventTitle
      )
      event.title = eventObj.title
      event.priority = Number(eventObj.priority)
      event.edit = false
      updateLocalStorage()
   }

   const setActiveDay = (dayId) => {
      calendarWeekData.value.forEach((day) => {
         day.active = false
      })
      const day = calendarWeekData.value.find(
         (day) => day.id === dayId
      )
      day.active = true
   }

   const addEvent = (newEvent) => {
      activeDay.value.events.push(newEvent)
      updateLocalStorage()
   }

   const setActiveView = (newView) => {
      view.value = newView
   }

   const setActiveordering = (newOrdering) => {
      activeOrdering.value = newOrdering
   }

   const updateLocalStorage = () => {
      localStorage.setItem(
         'calendarWeekData',
         JSON.stringify(calendarWeekData.value)
      )
   }

   return {
      calendarWeekData,
      view,
      activeOrdering,
      activeDay,
      sortedEvents,
      editEvent,
      deleteEvent,
      updateEvent,
      setActiveDay,
      addEvent,
      setActiveView,
      setActiveordering,
      updateLocalStorage
   }
})
