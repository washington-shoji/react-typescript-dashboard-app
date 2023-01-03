import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dashboardMenuReducer from '../slices/dashboard/dashboardSlice';
import navMenuState from '../slices/nav-menu/sideNavBarMenuSlice';
import mapOptionState from '../slices/map-option/mapOptionSlice';
import dashboardDataFetch from '../api-service/dashboard/dashboard';
import schoolDataFetch from '../api-service/school/school';
import populationGrowth from '../api-service/population-growth/populationGrowth';
export const store = configureStore({
	reducer: {
		dashboardMenu: dashboardMenuReducer,
		navMenuState: navMenuState,
		mapOptionState: mapOptionState,
		dashboardApi: dashboardDataFetch,
		schoolApi: schoolDataFetch,
		populationGrowthApi: populationGrowth,
	},
	devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
