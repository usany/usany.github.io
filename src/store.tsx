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
  }
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
