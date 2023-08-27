Es handelt sich um eine Kalenderanwendung, die mit Vue3 (Composition API) entwickelt wurde. Die Hauptkomponente "App.vue" enthält das grundlegende Layout, das aus einem Container besteht. In diesem Container werden verschiedene Ansichten dynamisch angezeigt, je nachdem, welcher Ansichtsmodus ausgewählt ist. Die Ansicht kann zwischen "CalendarWeek" und "CalendarWeekAsList" gewechselt werden. Der Übergang zwischen den Ansichten erfolgt mit einer Fade-Transition.

Die Kalenderwoche wird in der "CalendarWeek.vue"-Komponente dargestellt. Jeder Wochentag in dieser Ansicht wird durch die "CalendarDay.vue"-Komponente dargestellt, die Ereignisse für den jeweiligen Tag enthält. Die Ereignisse können hinzugefügt, bearbeitet und gelöscht werden. Die Darstellung der Ereignisse erfolgt ebenfalls mit einer Fade-Transition.

Es gibt auch die "CalendarEntry.vue"-Komponente, die die Möglichkeit bietet, neue Ereignisse hinzuzufügen. Hier können Sie den Titel, die Priorität und die Farbe des Ereignisses festlegen. Die Priorität kann zwischen "Hoch", "Mittel" und "Tief" ausgewählt werden. Nach dem Hinzufügen eines Ereignisses wird es zur entsprechenden Wochentagskomponente hinzugefügt.

Die "CalendarSettings.vue"-Komponente ermöglicht es dem Benutzer, verschiedene Einstellungen vorzunehmen. Sie können zwischen verschiedenen Ansichtsmodi ("CalendarWeek" und "CalendarWeekAsList") wählen und die Sortierung der Ereignisse nach Priorität oder Titel ändern.

Der Datenfluss und die Zustandsverwaltung erfolgen über den "store.js", der mithilfe von Pinia implementiert wurde. Hier werden die Kalenderdaten, die aktive Ansicht, die aktuelle Sortierung und der ausgewählte Tag gespeichert. Der Store ermöglicht das Hinzufügen, Bearbeiten und Löschen von Ereignissen sowie das Ändern der Einstellungen.

Insgesamt handelt es sich bei dem Projekt um eine Vue.js-basierte Kalenderanwendung, die es Benutzern ermöglicht, Ereignisse in einer wöchentlichen Ansicht zu verwalten, Einstellungen anzupassen und verschiedene Ansichtsmodi zu nutzen.
