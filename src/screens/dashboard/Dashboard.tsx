import { useState, useEffect, useCallback } from 'react';
import './Dashboard.scss';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {
	getHexagonToolTip,
	Layers,
} from '../../components/layers/dashboard/dashboarLayers';
import {
	useAppDispatch,
	useAppSelector,
} from '../../redux/custom-hooks/reduxHooks';
import { fetchSchool } from '../../redux/api-service/school/school';
import { fetchPopulationGrowth } from './../../redux/api-service/population-growth/populationGrowth';
import { MapOption } from '../../components/map-option/MapOption';
import { LAYER_CONFIG } from '../../components/layers/layer-config/layerConfig';
import { fetchSuburbGis } from '../../redux/api-service/suburb/suburb';
import { fetchSuburbPolygon } from '../../redux/api-service/suburb/suburbPolygon';
import { MapInformation } from '../../components/map-information/MapInformation';
import { FaInfoCircle } from 'react-icons/fa';
import { setMainMenuControlIsOpen } from '../../redux/slices/main-menu-control/MainMenuControl.slice';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAP_BOX_KEY;

type Status = {
	status: 'idle' | 'loading' | 'error';
};

export default function Dashboard() {
	const [information, setInformation] = useState<any>({});
	const { isOpen } = useAppSelector((state) => state.mainMenuState);
	const dispatch = useAppDispatch();

	const mapOptionState = useAppSelector(
		(state) => state.mapOptionState.mapOption
	);

	const suburbGisData = useAppSelector((state) => state.suburbApi.data);
	const suburbPolygonData = useAppSelector((state) => state.suburbPolygon.data);
	const schooldata = useAppSelector((state) => state.schoolApi.data);
	const populationGrowthdata = useAppSelector(
		(state) => state.populationGrowthApi.data
	);

	useEffect(() => {}, [suburbGisData, suburbPolygonData]);

	const [viewState, setViewState] = useState({
		latitude: suburbGisData.geo_point_2d?.coordinates[0]
			? suburbGisData.geo_point_2d?.coordinates[0]
			: -33.865143,
		longitude: suburbGisData.geo_point_2d?.coordinates[1]
			? suburbGisData.geo_point_2d?.coordinates[1]
			: 151.2099,
		zoom: 12,
		maxZoom: 20,
		pitch: 30,
		bearing: 0,
	});

	const MAP_STYLE = mapOptionState.style;

	// const INITIAL_VIEW_STATE = {
	// 	latitude: suburbGisData.geo_point_2d?.coordinates[1]
	// 		? suburbGisData.geo_point_2d?.coordinates[1]
	// 		: -33.865143,
	// 	longitude: suburbGisData.geo_point_2d?.coordinates[0]
	// 		? suburbGisData.geo_point_2d?.coordinates[0]
	// 		: 151.2099,
	// 	zoom: 12,
	// 	maxZoom: 20,
	// 	pitch: 30,
	// 	bearing: 0,
	// };
	function handleCoordinateState(coordinate: any) {
		if (coordinate) {
			dispatch(
				fetchSuburbPolygon({
					longitude: coordinate[0],
					latitude: coordinate[1],
				})
			);
		}
	}

	const geoLayers = Layers({
		suburbData: suburbGisData,
		schoolData: schooldata,
		populationGrowthLayerData: populationGrowthdata,
		suburbPolygonData: suburbPolygonData,
	});

	return (
		<div className='dashboard-container'>
			<div className='map-container'>
				<DeckGL
					viewState={viewState}
					onViewStateChange={(event) => {
						setViewState(event.viewState);
					}}
					//initialViewState={INITIAL_VIEW_STATE}
					controller={true}
					layers={geoLayers}
					effects={[LAYER_CONFIG.lightingEffect]}
					getTooltip={(info: any) => {
						return getHexagonToolTip(info);
					}}
					onClick={(info) => {
						if (info.object) {
							setInformation(info.object);
						}

						if (info.coordinate) {
							handleCoordinateState(info.coordinate);
							dispatch(setMainMenuControlIsOpen(true));
						}
					}}
				>
					<StaticMap
						mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
						reuseMaps
						mapStyle={MAP_STYLE}
						styleDiffing={false}
						scrollZoom={true}
					/>
				</DeckGL>
			</div>
			<div className='map-option'>
				<MapOption />
			</div>
			{isOpen && (
				<div className='map-data-info'>
					<MapInformation information={information} />
				</div>
			)}
			{!isOpen && (
				<div className='map-data-info-icon-container'>
					<FaInfoCircle
						className='map-data-info-icon orange'
						onClick={() => dispatch(setMainMenuControlIsOpen(!isOpen))}
					/>
				</div>
			)}
		</div>
	);
}
