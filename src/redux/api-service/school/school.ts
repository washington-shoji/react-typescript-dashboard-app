import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISchool } from '../../../interface/school-data/schoolData.interface';
import { RootState } from '../../store/store';

type FetchError = { message: string };

type SchoolState = {
	status: 'idle' | 'loading' | 'error';
	error: string | null;
	data: ISchool;
};

const BASE_URL = 'http://localhost:9090/api/v1/school';

export const fetchSchool = createAsyncThunk<
	ISchool,
	string,
	{ rejectValue: FetchError }
>('school/fetch', async (_: string | undefined, thunkApi) => {
	try {
		const response = await axios.get<ISchool>(BASE_URL);
		const data: ISchool = response.data;
		return data;
	} catch (error: any) {
		return thunkApi.rejectWithValue({
			message: error.message,
		});
	}
});

const initialState: SchoolState = {
	status: 'idle',
	error: null,
	data: {},
};

export const schoolSlice = createSlice({
	name: 'school',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSchool.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(fetchSchool.fulfilled, (state, { payload }) => {
			state.data = payload;
			state.status = 'idle';
		});
		builder.addCase(fetchSchool.rejected, (state, { payload }) => {
			if (payload) state.error = payload.message;
			state.status = 'error';
		});
	},
});

export const selectSchoolApiStatus = (state: RootState) =>
	state.schoolApi.status;

export default schoolSlice.reducer;
