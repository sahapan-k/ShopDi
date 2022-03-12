import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    storeItems: [],
    queryAll: true,
    queryElectronics: false,
    queryBeautyPersonalCare: false,
    queryFashion: false,
    querySportOutdoor: false,
    queryTools: false,
    queryPetSupplies: false,
  },
  reducers: {
    setItems(state, action) {
      state.storeItems = action.payload;
    },
    setCategoryAll(state) {
      state.queryAll = true;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = false;
      state.querySportOutdoor = false;
      state.queryTools = false;
      state.queryPetSupplies = false;
    },
    setCategoryElectronics(state) {
      state.queryAll = false;
      state.queryElectronics = true;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = false;
      state.querySportOutdoor = false;
      state.queryTools = false;
      state.queryPetSupplies = false;
    },
    setCategoryBeautyPersonalCare(state) {
      state.queryAll = false;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = true;
      state.queryFashion = false;
      state.querySportOutdoor = false;
      state.queryTools = false;
      state.queryPetSupplies = false;
    },
    setCategoryFashion(state) {
      state.queryAll = false;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = true;
      state.querySportOutdoor = false;
      state.queryTools = false;
      state.queryPetSupplies = false;
    },
    setCategorySportOutdoor(state) {
      state.queryAll = false;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = false;
      state.querySportOutdoor = true;
      state.queryTools = false;
      state.queryPetSupplies = false;
    },
    setCategoryTools(state) {
      state.queryAll = false;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = false;
      state.querySportOutdoor = false;
      state.queryTools = true;
      state.queryPetSupplies = false;
    },
    setCategoryPetSupplies(state) {
      state.queryAll = false;
      state.queryElectronics = false;
      state.queryBeautyPersonalCare = false;
      state.queryFashion = false;
      state.querySportOutdoor = false;
      state.queryTools = false;
      state.queryPetSupplies = true;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;
