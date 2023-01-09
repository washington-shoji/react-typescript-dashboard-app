import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGeoSuburb } from '../../../interface/poligon-data/poligonData.interface';
import { RootState } from '../../store/store';

export type Suburb = string;
type FetchError = { message: string };
type SuburbState = {
	// In `status` we will watch
	// if api being loaded.
	status: 'idle' | 'loading' | 'error';
	// `error` will contain an error message.
	error: string | null;
	data: IGeoSuburb;
};

const BASE_URL = 'http://localhost:9090/api/v1/polygon/suburb-name';

export const fetchSuburb = createAsyncThunk<
	IGeoSuburb,
	string,
	{ rejectValue: FetchError }
>('suburb/fetch', async (suburb: Suburb, thunkApi) => {
	try {
		const response = await axios.get<IGeoSuburb>(BASE_URL, {
			params: { suburb: suburb },
		});
		const data: IGeoSuburb = response.data;
		return data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({
			message: error.message,
		});
	}
});

const initialState: SuburbState = {
	status: 'idle',
	error: null,
	data: {},
};

export const suburbSlice = createSlice({
	name: 'suburb',
	initialState: initialState,
	reducers: {},
	// In `extraReducers` we declare
	// all the actions:
	extraReducers: (builder) => {
		// When we send a request,
		// `fetchSuburb.pending` is being fired:
		builder.addCase(fetchSuburb.pending, (state) => {
			// At that moment,
			// we change status to `loading`
			// and clear all the previous errors:
			state.status = 'loading';
			state.error = null;
		});
		// When a server responses with the data,
		// `fetchSuburb.fulfilled` is fired:
		builder.addCase(fetchSuburb.fulfilled, (state, { payload }) => {
			// We add all the new data into the state
			// and change `status` back to `idle`:
			state.data = payload;
			state.status = 'idle';
		});
		// When a server responses with an error:
		builder.addCase(fetchSuburb.rejected, (state, { payload }) => {
			// We show the error message
			// and change `status` back to `idle` again.
			if (payload) state.error = payload.message;
			state.status = 'error';
		});
	},
});

export const selectDashboardApiStatus = (state: RootState) =>
	state.dashboardApi.status;

export default suburbSlice.reducer;
