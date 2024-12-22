import { create } from 'zustand'
import { configureStore } from '@reduxjs/toolkit'
// import { counterReducer } from 'src/stateSlices/stateSlice'
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

interface sideNavigationState {
  sideNavigation: boolean
  handleSideNavigation: () => void
}
interface cardAccordionState {
  cardAccordion: boolean
  handleCardAccordion: () => void
}
interface messageAccordionState {
  messageAccordion: boolean
  handleMessageAccordion: () => void
}
interface bottomAccordionState {
  bottomNavigation: number
  handleBottomNavigation: (state: number) => void
}
interface avatarColorState {
  avatarColor: string
  handleAvatarColor: (state: string) => void
}
interface tabsState {
  tabs: number
  handleTabs: (state: number) => void
}
interface themeState {
  theme: string
  handleThemeLight: () => void
  handleThemeDark: () => void
}
interface piazzaSwitchState {
  piazzaSwitch: string
  handlePiazzaSwitchOn: () => void
  handlePiazzaSwitchOff: () => void
}
interface newMessageState {
  newMessage: boolean
  handleNewMessage: (state: boolean) => void
  handleNewMessageFalse: () => void
  handleNewMessageTrue: () => void
}
interface avatarImageState {
  avatarImage: string | null
  handleAvatarImage: (state: string | null) => void
}
interface profileUrlState {
  profileUrl: string | null
  handleProfileUrl: (state: string | null) => void
}
interface completedDrawerState {
  completedDrawer: string | null
  handleCompletedDrawer: (state: string | null) => void
}
const useSideNavigationStore = create<sideNavigationState>()((set) => ({
    sideNavigation: false,
    handleSideNavigation: () => set((state) => ({ sideNavigation: !state.sideNavigation })),
}))
const useCardAccordionStore = create<cardAccordionState>()((set) => ({
    cardAccordion: false,
    handleCardAccordion: () => set((state) => ({ cardAccordion: !state.cardAccordion })),
}))
const useMessageAccordionStore = create<messageAccordionState>()((set) => ({
    messageAccordion: true,
    handleMessageAccordion: () => set((state) => ({ messageAccordion: !state.messageAccordion })),
}))
const useBottomNavigationStore = create<bottomAccordionState>()((set) => ({
    bottomNavigation: 1,
    handleBottomNavigation: (newState) => set(() => ({ bottomNavigation: newState })),
}))
const useAvatarColorStore = create<avatarColorState>()((set) => ({
    avatarColor: '#2196f3',
    handleAvatarColor: (newState) => set(() => ({ avatarColor: newState })),
}))
// const useActionStore = create((set) => ({
//     action: 0,
//     handleAction: (newState) => set(() => ({ action: newState })),
// }))
const useTabsStore = create<tabsState>()((set) => ({
    tabs: 0,
    handleTabs: (newState) => set(() => ({ tabs: newState }))
}))
const useThemeStore = create<themeState>()((set) => ({
  theme: localStorage.getItem('theme') || 'light',
  handleThemeLight: () => set(() => {
    return (
      { theme: 'light' }
    )
  }),
  handleThemeDark: () => set(() => {
    return (
      { theme: 'dark' }
    )
  })
}))
const usePiazzaSwitchStore = create<piazzaSwitchState>()((set) => ({
  piazzaSwitch: localStorage.getItem('piazza') || 'false',
  handlePiazzaSwitchOn: () => set(() => {
    return (
      { piazzaSwitch: 'true' }
    )
  }),
  handlePiazzaSwitchOff: () => set(() => {
    return (
      { piazzaSwitch: 'false' }
    )
  })
}))
const useNewMessageStore = create<newMessageState>()((set) => ({
  newMessage: true,
  handleNewMessage: (newState) => set(() => ({ newMessage: newState })),
  handleNewMessageFalse: () => set(() => ({ newMessage: false })),
  handleNewMessageTrue: () => set(() => ({ newMessage: true })),
}))
const useAvatarImageStore = create<avatarImageState>()((set) => ({
  avatarImage: null,
  handleAvatarImage: (newState) => set(() => ({ avatarImage: newState }))
}))
const useProfileUrlStore = create<profileUrlState>()((set) => ({
  profileUrl: null,
  handleProfileUrl: (newState) => set(() => ({ profileUrl: newState }))
}))
const useCompletedDrawerStore = create<completedDrawerState>()((set) => ({
  completedDrawer: null,
  handleCompletedDrawer: (newState) => set(() => ({ completedDrawer: newState }))
}))

const bookStore = (set, get) => ({    
  books: [],
  noOfAvailable: 0,
  noOfIssued: 0,
  addBook: (book) => {
    set((state) => ({
      books: [...state.books, { ...book, status: "available" }],
      noOfAvailable: state.noOfAvailable + 1,
    }));
  },
  issueBook: (id) => {
    const books = get().books;
    const updatedBooks = books?.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          status: "issued",
        };
      } else {
        return book;
      }
    });
    set((state) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable - 1,
      noOfIssued: state.noOfIssued + 1,
    }));
  },
  returnBook: (id) => {
    const books = get().books;
    const updatedBooks = books?.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          status: "available",
        };
      } else {
        return book;
      }
    });
    set((state) => ({
      books: updatedBooks,
      noOfAvailable: state.noOfAvailable + 1,
      noOfIssued: state.noOfIssued - 1,
    }));
  },
  reset: () => {
    set({
      books: [],
      noOfAvailable: 0,
      noOfIssued: 0,
    });
  },
});
  const useBookStore = create(bookStore);
  
  const store = configureStore({
    reducer: {
      profileUrl: profileUrlReducer.reducer,
      profileColor: profileColorReducer.reducer,
      profileImage: profileImageReducer.reducer,
      cardAccordion: cardAccordionReducer.reducer,
      messageAccordion: messageAccordionReducer.reducer,
      piazzaSwitch: piazzaSwitchReducer.reducer,
      theme: themeReducer.reducer,
      bottomNavigation: bottomNavigationReducer.reducer,
      tabs: tabsReducer.reducer,
      completedAction: completedActionReducer.reducer,
      newMessage: newMessageReducer.reducer,
    }
  })
  export { store, 
    // useSideNavigationStore, useCardAccordionStore, useMessageAccordionStore, useBottomNavigationStore, useAvatarColorStore, useTabsStore, useThemeStore, usePiazzaSwitchStore, useNewMessageStore, useAvatarImageStore, useProfileUrlStore, useCompletedDrawerStore 
  };
  