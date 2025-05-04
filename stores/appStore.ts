import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: (): { _ghSearchValue: string; _previousPath: string } => ({
    _ghSearchValue: '',
    _previousPath: '',
  }),
  getters: {
    ghSearchValue(state) {
      return state._ghSearchValue;
    },
    previousPath(state) {
      return state._previousPath;
    },
  },
  actions: {
    setGhSearchValue(ghSearchValue: string) {
      this._ghSearchValue = ghSearchValue;
    },
    setPreviousPath(previousPath: string) {
      this._previousPath = previousPath;
    },
  },
  persist: {
    storage: typeof window !== 'undefined' ? sessionStorage : undefined,
    pick: ['_ghSearchValue', '_previousPath'],
  },
});
