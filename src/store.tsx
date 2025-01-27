// import { create } from 'zustand'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { piazzaSwitchReducer } from 'src/stateSlices/piazzaSwitchSlice'
import { profileUrlReducer } from 'src/stateSlices/profileUrlSlice'
import { profileColorReducer } from 'src/stateSlices/profileColorSlice'
import { profileImageReducer } from 'src/stateSlices/profileImageSlice'
import { cardAccordionReducer } from 'src/stateSlices/cardAccordionSlice'
import { messageAccordionReducer } from 'src/stateSlices/messageAccordionSlice'
import { themeReducer } from 'src/stateSlices/themeSlice'
import { bottomNavigationReducer } from 'src/stateSlices/bottomNavigationSlice'
import { tabsReducer } from 'src/stateSlices/tabsSlice'
import { completedActionReducer } from 'src/stateSlices/completedActionSlice'
import { newMessageReducer } from 'src/stateSlices/newMessageSlice'
import { createMachine } from 'xstate';
import { piazza } from './stateSlices/piazza'
import { weather } from './stateSlices/weather'

const toggleMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEaG2A2gAwC6ioADqrORagQ4gAHogCMANgk4ATM3nMxAZgAsSpTICsYgDQgAnuKVicCxSuYB2CwA4JGgL4O99LLgCCZKrVdM2Q7l5+QSQRcSlZM2U1DW09QwQbEyUzSxsbaxsZFTEnZxACVAg4IV8wAJ4+cgEhUQQAWgl4xHrLEwBOTs7NZgt2u2ZNJxd0N3xiL2oKoOqQ0DqVGWbE6X71FU1NG1VmCSzhkDKcTwop0MCqmtC6mWscS1T2zUtLGSUM5Zt2nBVtpU2HpoNBobAcjgQwAB3AAEsGQRGQYGhYmmlzmYQQMhsmhwYi67QkG3aGw0yzEOJSCjSGV+2WYoLyQA */
  id: 'toggle',
  initial: 'Inactive',
  states: {
    Inactive: {
      on: {
        toggle: 'Active'
      },
    },

    Active: {
      on: { toggle: 'Inactive' },
    },

    "new state 1": {}
  },
});


export const store = configureStore({
  reducer: {
    profileUrl: profileUrlReducer.reducer,
    profileColor: profileColorReducer.reducer,
    profileImage: profileImageReducer.reducer,
    cardAccordion: cardAccordionReducer.reducer,
    messageAccordion: messageAccordionReducer.reducer,
    piazzaSwitch: piazzaSwitchReducer.reducer,
    theme: themeReducer.reducer,
    bottomNavigation: bottomNavigationReducer,
    tabs: tabsReducer.reducer,
    completedAction: completedActionReducer.reducer,
    newMessage: newMessageReducer.reducer,
    piazza: piazza.reducer,
    weather: weather.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(piazza.middleware, weather.middleware)
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

// export { store, 
// };
// useSideNavigationStore, useCardAccordionStore, useMessageAccordionStore, useBottomNavigationStore, useAvatarColorStore, useTabsStore, useThemeStore, usePiazzaSwitchStore, useNewMessageStore, useAvatarImageStore, useProfileUrlStore, useCompletedDrawerStore 
