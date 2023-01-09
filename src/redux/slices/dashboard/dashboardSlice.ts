import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface IDashboardMenuState {
	suburbName: string;
}

const initialState: IDashboardMenuState = {
	suburbName: '',
};

export const dashboardMenuSlice = createSlice({
	name: 'apiStatusState',
	initialState: initialState,
	reducers: {
		setSuburbName: (state, action: PayloadAction<string>) => {
			state.suburbName = action.payload;
		},
	},
});

// Set reducer actions
export const { setSuburbName } = dashboardMenuSlice.actions;

// Need to add the reducer to store first to get access to Root state
// Other code such as selectors can use the imported `RootState` type
export const selectDashboardMenu = (state: RootState): IDashboardMenuState =>
	state.dashboardMenu;

export default dashboardMenuSlice.reducer;
