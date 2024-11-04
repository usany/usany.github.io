import { StaticDatePicker } from '@mui/x-date-pickers'
import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { create } from 'zustand'

interface sideNavigationState {
  sideNavigation: boolean
  handleSideNavigation: (state: boolean) => void
}
const useSideNavigationStore = create<sideNavigationState>()((set) => ({
    sideNavigation: false,
    handleSideNavigation: () => set((state) => ({ sideNavigation: !state.sideNavigation })),
}))
const useBottomNavigationStore = create((set) => ({
    bottomNavigation: 1,
    handleBottomNavigation: (newState) => set(() => ({ bottomNavigation: newState })),
}))
const useAvatarColorStore = create((set) => ({
    profileColor: '#2196f3',
    handleProfileColor: (newState) => set(() => ({ profileColor: newState })),
}))
const actionStore = create((set) => ({
    action: 0,
    handleAction: (newState) => set(() => ({ action: newState })),
}))
const useTabsStore = create((set) => ({
    toggleTabs: 0,
    handleToggleTabs: (newState) => set(() => ({ toggleTabs: newState }))
}))
const useThemeStore = create((set) => ({
  mode: localStorage.getItem('theme') || 'light',
  handleModeLight: () => set(() => {
    return (
      { mode: 'light' }
    )
  }),
  handleModeDark: () => set(() => {
    return (
      { mode: 'dark' }
    )
  })
}))
const usePiazzaSwitchStore = create((set) => ({
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

// store.set(state => ({ count: state.count + 1 }));

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
  
  export { useSideNavigationStore, useBottomNavigationStore, useAvatarColorStore, actionStore, useTabsStore, useThemeStore, usePiazzaSwitchStore };
  