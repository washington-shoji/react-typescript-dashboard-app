import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export type MainMenuControl = {
	id?: number;
	isOpen?: boolean;
	menuStatus?: 'idle' | 'loading' | 'error';
	menuName?: string;
};

const initialState: MainMenuControl = {
	id: 0,
	isOpen: false,
	menuStatus: 'idle',
	menuName: '',
};

export const mainMenuControlSlice = createSlice({
	name: 'mainMenuControl',
	initialState: initialState,
	reducers: {
		setMainMenuControlState: (
			state,
			action: PayloadAction<MainMenuControl>
		) => {
			state.id = action.payload.id;
			state.menuName = action.payload.menuName;
		},
		setMainMenuControlIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		setMainMenuControlStatus: (
			state,
			action: PayloadAction<MainMenuControl>
		) => {
			state.menuStatus = action.payload.menuStatus;
		},
	},
});

export const {
	setMainMenuControlState,
	setMainMenuControlIsOpen,
	setMainMenuControlStatus,
} = mainMenuControlSlice.actions;

export const selectMainMenuControlState = (state: RootState) =>
	state.mainMenuState;
export default mainMenuControlSlice.reducer;
