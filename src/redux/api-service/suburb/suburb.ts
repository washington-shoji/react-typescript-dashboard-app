import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGeoSuburb } from '../../../interface/poligon-data/poligonData.interface';
import {
	setApiLoadingState,
	setApiSuccessState,
	setApiErrorState,
} from '../../slices/api-state/apiStateSlice.slice';
import { RootState } from '../../store/store';

type FetchError = { message: string };

type SuburbState = {
	status: 'idle' | 'loading' | 'error';
	error: string | null;
	data: IGeoSuburb;
};

const BASE_URL = 'http://localhost:9090/api/v1/polygon/suburb';

export const fetchSuburbGis = createAsyncThunk<
	IGeoSuburb,
	undefined,
	{ rejectValue: FetchError }
>('suburb/fetch', async (_: undefined, thunkApi) => {
	thunkApi.dispatch(setApiLoadingState());
	try {
		const response = await axios.get<IGeoSuburb>(BASE_URL);
		const data: IGeoSuburb = response.data;
		thunkApi.dispatch(setApiSuccessState());
		return data;
	} catch (error: any) {
		thunkApi.dispatch(setApiErrorState());
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
	extraReducers: (builder) => {
		builder.addCase(fetchSuburbGis.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(fetchSuburbGis.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.status = 'idle';
		});
		builder.addCase(fetchSuburbGis.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = 'error';
		});
	},
});

export const selectSuburbApiStatus = (state: RootState) =>
	state.suburbApi.status;

export default suburbSlice.reducer;
