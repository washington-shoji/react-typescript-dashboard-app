import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGeoSuburb } from '../../../interface/poligon-data/poligonData.interface';
import {
	setApiErrorState,
	setApiLoadingState,
	setApiSuccessState,
} from '../../slices/api-state/apiStateSlice.slice';
import { RootState } from '../../store/store';

type FetchError = { message: string };

type SuburbState = {
	status: 'idle' | 'loading' | 'error';
	error: string | null;
	data: IGeoSuburb;
};

const BASE_URL = 'http://localhost:9090/api/v1/polygon/near';

export const fetchSuburbPolygon = createAsyncThunk<
	IGeoSuburb,
	{ longitude: number; latitude: number },
	{ rejectValue: FetchError }
>(
	'suburb-polygon/fetch',
	async (
		{ longitude, latitude }: { longitude: number; latitude: number },
		thunkApi
	) => {
		thunkApi.dispatch(setApiLoadingState());
		try {
			const response = await axios.get<IGeoSuburb>(BASE_URL, {
				params: { longitude: longitude, latitude: latitude },
			});
			const data: IGeoSuburb = response.data;
			thunkApi.dispatch(setApiSuccessState());
			return data;
		} catch (error: any) {
			thunkApi.dispatch(setApiErrorState());
			return thunkApi.rejectWithValue({
				message: error.message,
			});
		}
	}
);

const initialState: SuburbState = {
	status: 'idle',
	error: null,
	data: {},
};

export const suburbPolygonSlice = createSlice({
	name: 'suburb-polygon',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSuburbPolygon.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(fetchSuburbPolygon.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.status = 'idle';
		});
		builder.addCase(fetchSuburbPolygon.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = 'error';
		});
	},
});

export const selectSuburbPolygonApiStatus = (state: RootState) =>
	state.suburbPolygon.status;

export default suburbPolygonSlice.reducer;
