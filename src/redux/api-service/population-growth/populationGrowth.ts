import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPopulationGrowth } from '../../../interface/population-growth/populationGrowth.interface';
import { RootState } from '../../store/store';

type FetchError = { message: string };

type PopulationGrowthState = {
	status: 'idle' | 'loading' | 'error';
	error: string | null;
	data: IPopulationGrowth;
};

const BASE_URL = 'http://localhost:9090/api/v1/population';

export const fetchPopulationGrowth = createAsyncThunk<
	IPopulationGrowth,
	any,
	{ rejectValue: FetchError }
>('populationGrowth/fetch', async (_: string | undefined, thunkApi) => {
	try {
		const response = await axios.get<IPopulationGrowth>(BASE_URL);
		const data: IPopulationGrowth = response.data;
		return data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({
			message: error.message,
		});
	}
});

const initialState: PopulationGrowthState = {
	status: 'idle',
	error: null,
	data: {
		_id: '',
		lga: '',
		y_2011: 0,
		y_2016: 0,
		y_2021: 0,
		y_2026: 0,
		y_2031: 0,
	},
};

export const populationGrowthSlice = createSlice({
	name: 'population-growth',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPopulationGrowth.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(fetchPopulationGrowth.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.status = 'idle';
		});
		builder.addCase(fetchPopulationGrowth.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = 'error';
		});
	},
});

export const selectPopulationGrowthApiStatus = (state: RootState) =>
	state.populationGrowthApi.status;

export default populationGrowthSlice.reducer;
