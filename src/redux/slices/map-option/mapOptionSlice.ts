import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { MapInfo, maps } from '../../../data/map/mapInfo';

const initialState = {
	mapOption: maps[0],
};

export const mapOptionSlice = createSlice({
	name: 'mapOption',
	initialState: initialState,
	reducers: {
		setMapOptionState: (state, action: PayloadAction<MapInfo>) => {
			state.mapOption = action.payload;
		},
	},
});

export const { setMapOptionState } = mapOptionSlice.actions;

export const selectMapOptionState = (state: RootState) => state.mapOptionState;
export default mapOptionSlice.reducer;
