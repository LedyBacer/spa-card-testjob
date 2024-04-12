import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFavoriteItem {
  imdbID: string;
  Title: string;
  Poster: string;
}

interface IModalSliceInitialState {
  deletedItems: string[];
  favoriteItems: IFavoriteItem[];
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
    // handleFavorite(state, action: PayloadAction<string>) {
    //   state.favoriteItems.includes(action.payload)
    //     ? state.favoriteItems.splice(
    //         state.favoriteItems.indexOf(action.payload),
    //         1,
    //       )
    //     : state.favoriteItems.push(action.payload);
    // },
    handleEnableFavorite(state, action: PayloadAction<IFavoriteItem>) {
      state.favoriteItems.push(action.payload);
    },
    handleDisableFavorite(state, action: PayloadAction<string>) {
      state.favoriteItems.splice(
        state.favoriteItems.findIndex(el => el.imdbID === action.payload),
        1,
      );
    },
  },
});

export const { handleDelete, handleEnableFavorite, handleDisableFavorite } =
  userActionsSlice.actions;

export default userActionsSlice.reducer;
