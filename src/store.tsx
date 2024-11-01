import { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { create } from 'zustand'

const bottomNavigationStore = create((set) => ({
    bottomNavigation: 1,
    setBottomNavigation: (newState) => set(() => ({ bottomNavigation: newState })),
}))
const modeStore = create((set) => ({
  mode: localStorage.getItem('theme') || 'light',
  handleModeToggle: () => set(() => {
    if (modeStore.mode === 'light') {
      return (
        { mode: 'dark' }
      )
    } else {
      return (
        { mode: 'light' }
      )
    }
  }),
  handleModeLight: () => set(() => ({ mode: 'light' })),
  handleModeDark: () => set(() => ({ mode: 'dark' }))
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
  
  export { bottomNavigationStore, modeStore };
  