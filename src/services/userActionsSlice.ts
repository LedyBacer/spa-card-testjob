import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalSliceInitialState {
  deletedItems: string[];
  favoriteItems: string[];
}

const initialState: IModalSliceInitialState = {
  deletedItems: [],
  favoriteItems: [],
};

const userActionsSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {
    handleDelete(state, action: PayloadAction<string>) {
      state.deletedItems.push(action.payload);
    },
    handleFavorite(state, action: PayloadAction<string>) {
      state.favoriteItems.includes(action.payload)
        ? state.favoriteItems.splice(
            state.favoriteItems.indexOf(action.payload),
            1,
          )
        : state.favoriteItems.push(action.payload);
    },
  },
});

export const { handleDelete, handleFavorite } = userActionsSlice.actions;

export default userActionsSlice.reducer;
