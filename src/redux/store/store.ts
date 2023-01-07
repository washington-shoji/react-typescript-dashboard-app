import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import dashboardMenuReducer from '../slices/dashboard/dashboardSlice';
import navMenuState from '../slices/nav-menu/sideNavBarMenuSlice';
import mapOptionState from '../slices/map-option/mapOptionSlice';
import dashboardDataFetch from '../api-service/dashboard/dashboard';
import schoolDataFetch from '../api-service/school/school';
import populationGrowth from '../api-service/population-growth/populationGrowth';
import suburbDataFetch from '../api-service/suburb/suburb';
import suburbPolygonData from '../api-service/suburb/suburbPolygon';
import mainMenuControlState from '../slices/main-menu-control/MainMenuControl.slice';
import apiStatusState from '../slices/api-state/apiStateSlice.slice';
export const store = configureStore({
	reducer: {
		dashboardMenu: dashboardMenuReducer,
		navMenuState: navMenuState,
		mainMenuState: mainMenuControlState,
		mapOptionState: mapOptionState,
		apiStateStatus: apiStatusState,
		dashboardApi: dashboardDataFetch,
		suburbApi: suburbDataFetch,
		schoolApi: schoolDataFetch,
		suburbPolygon: suburbPolygonData,
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
