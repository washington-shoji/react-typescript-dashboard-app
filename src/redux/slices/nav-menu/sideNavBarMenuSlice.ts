import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface IMenuToggle {
	menuState: boolean;
}

const initialState: IMenuToggle = {
	menuState: false,
};

export const navMenuSlice = createSlice({
	name: 'navMenu',
	initialState: initialState,
	reducers: {
		setMenuState: (state, action: PayloadAction<boolean>) => {
			state.menuState = action.payload;
		},
	},
});

export const { setMenuState } = navMenuSlice.actions;

export const selectNavMenuState = (state: RootState) => state.navMenuState;
export default navMenuSlice.reducer;
