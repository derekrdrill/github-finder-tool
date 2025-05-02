import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: (): { _ghSearchValue: string } => ({
    _ghSearchValue: '',
  }),
  getters: {
    ghSearchValue(state) {
      return state._ghSearchValue;
    },
  },
  actions: {
    setGhSearchValue(ghSearchValue: string) {
      this._ghSearchValue = ghSearchValue;
    },
  },
  persist: {
    storage: typeof window !== 'undefined' ? sessionStorage : undefined,
    pick: ['_ghSearchValue'],
  },
});
