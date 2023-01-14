import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export type ApiStatusState = {
	idle?: boolean;
	loading?: boolean;
	error?: boolean;
};

const initialState: ApiStatusState = {
	idle: true,
	loading: false,
	error: false,
};

export const apiStatusStateSlice = createSlice({
	name: 'apiStatusState',
	initialState: initialState,
	reducers: {
		setApiLoadingState: (state) => {
			state.idle = false;
			state.loading = true;
			state.error = false;
		},
		setApiSuccessState: (state) => {
			state.idle = true;
			state.loading = false;
			state.error = false;
		},
		setApiErrorState: (state) => {
			state.idle = false;
			state.loading = false;
			state.error = true;
		},
	},
});

// Set reducer actions
export const { setApiLoadingState, setApiSuccessState, setApiErrorState } =
	apiStatusStateSlice.actions;

// Need to add the reducer to store first to get access to Root state
// Other code such as selectors can use the imported `RootState` type
export const selectDashboardMenu = (state: RootState): ApiStatusState =>
	state.apiStateStatus;

export default apiStatusStateSlice.reducer;
