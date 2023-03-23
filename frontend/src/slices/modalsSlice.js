/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modalType = payload.modalType;
      state.channelId = payload.channelId;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.channelId = null;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
