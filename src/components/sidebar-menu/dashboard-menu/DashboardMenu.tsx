import './DashboardMenu.scss';
import {
	useAppSelector,
	useAppDispatch,
} from '../../../redux/custom-hooks/reduxHooks';
import { setSuburbName } from '../../../redux/slices/dashboard/dashboardSlice';
import { fetchSuburb } from '../../../redux/api-service/dashboard/dashboard';
import { fetchSuburbPolygon } from './../../../redux/api-service/suburb/suburbPolygon';

export function DashboardMenu() {
	const navMenuState = useAppSelector((state) => state.navMenuState.menuState);
	const suburbName = useAppSelector((state) => state.dashboardMenu.suburbName);
	const suburbGisData: any = useAppSelector((state) => state.suburbApi.data);
	const { loading } = useAppSelector((state) => state.apiStateStatus);
	const dispatch = useAppDispatch();

	function handleSuburbName(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		dispatch(setSuburbName(event.target.value));
	}
	function handleFetchData(event: { preventDefault: () => void }) {
		event.preventDefault();

		//dispatch(fetchSuburb(suburbName));
		if (!loading) {
			suburbGisData
				.filter((suburb: any) => suburb.suburb_name === suburbName)
				.map((suburbCoord: any) => {
					const longitude = suburbCoord.geo_point_2d.coordinates[0];
					const latitude = suburbCoord.geo_point_2d.coordinates[1];
					const queryParams = { longitude, latitude };

					return dispatch(fetchSuburbPolygon(queryParams));
				});
			//dispatch(setMenuState(!navMenuState));
			//dispatch(setSuburbName(''));
		}
	}

	return (
		<div className='dashboard-menu-container'>
			<h4>Dashboard Menu</h4>
			<div className='dashboard-menu-control'>
				<span>Search a suburb</span>
				<form>
					<div className='control-search'>
						<input
							className='control-search-input'
							type='text'
							name='suburb'
							placeholder='Enter a suburb name'
							value={suburbName}
							onChange={(event) => handleSuburbName(event)}
						/>
						<button
							className='control-search-button'
							type='submit'
							onClick={handleFetchData}
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
