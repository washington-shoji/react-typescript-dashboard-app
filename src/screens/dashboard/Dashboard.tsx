import { useState, useEffect, useCallback } from 'react';
import './Dashboard.scss';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { SydneySuburbRiskDataApi } from '../../api/layers/sydneySuburbRiskData';
import { IColours, rgbaColours } from '../../data/colour/colours';
import { RGBAColor } from 'deck.gl';
import { MAP_BOX_STYLE } from '../../enum/mapstyle';
import {
	Layers,
	lightingEffect,
} from '../../components/layers/dashboard/dashboarLayers';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAP_BOX_KEY;

export default function Dashboard() {
	const [querySuburb, setQuerySuburb] = useState<string>('');
	const [polygonData, setPolygonData] = useState<[[[number]]]>([[[0]]]);
	const [geometryData, setGeometryData] = useState<number[]>([]);
	const [selectedColour, setSelectedColour] = useState<string>('');
	const [layerColour, setLayerColour] = useState<RGBAColor>([175, 105, 238]);
	const [geoLayers, setGeoLayers] = useState<any>();
	const [schoolData, setSchoolData] = useState<number[]>([]);

	const INITIAL_VIEW_STATE = {
		latitude:
			geometryData[1] !== (null || undefined) ? geometryData[1] : -33.865143,
		longitude:
			geometryData[0] !== (null || undefined) ? geometryData[0] : 151.2099,
		zoom: 11,
		maxZoom: 20,
		pitch: 30,
		bearing: 0,
	};

	const MAP_STYLE = MAP_BOX_STYLE.MapBoxDark;

	const layersCallback = useCallback(() => {
		function layers() {
			const layers = Layers(polygonData, schoolData, layerColour);
			setGeoLayers(layers);
		}
		layers();
	}, [polygonData, layerColour, schoolData]);

	function handleQuerySuburb(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		setQuerySuburb(event.target.value);
	}

	const colourUseCallback = useCallback(() => {
		function handleLayerColor() {
			const colourOption = rgbaColours.filter(
				(option) => option.key === selectedColour
			);
			if (colourOption[0]?.rgbaValues) {
				setLayerColour(colourOption[0].rgbaValues);
			}
		}
		handleLayerColor();
	}, [selectedColour]);

	async function handleFetchData(event: { preventDefault: () => void }) {
		event.preventDefault();
		const polyArray: any = [];
		const suburbName = querySuburb.toUpperCase();
		if (suburbName) {
			SydneySuburbRiskDataApi.fetchBySuburbName(suburbName).then((result) => {
				if (result) {
					polyArray.push(result.polygonData[0].fields.geo_shape);
					setPolygonData(result.polygonData[0].fields.geo_shape.coordinates);
					setGeometryData(result.polygonData[0].geometry.coordinates);
				}
			});
		}
		SydneySuburbRiskDataApi.fetchAllSchoolData().then((result) => {
			if (result) {
				let arrayCoordinates: any = [];
				result.map((value: any) =>
					arrayCoordinates.push({
						coordinates: [value.Longitude, value.Latitude],
					})
				);
				setSchoolData(arrayCoordinates);
			}
		});
		return;
	}

	function handleOnchangeColours(event: React.ChangeEvent<HTMLSelectElement>) {
		event.preventDefault();
		setSelectedColour(event.target.value);
	}

	useEffect(() => {
		layersCallback();
		colourUseCallback();
	}, [colourUseCallback, layersCallback]);

	return (
		<div className='dashboard-container'>
			<div className='control-container'>
				<div className='control-search-title'>
					<h3>Suburb Info</h3>
				</div>
				<div className='control-search'>
					<form onSubmit={handleFetchData}>
						<input
							className='control-search-input'
							type='text'
							name='suburb'
							placeholder='Search for a suburb'
							value={querySuburb}
							onChange={(event) => handleQuerySuburb(event)}
						/>
						<button className='control-search-button' type='submit'>
							Submit
						</button>
					</form>
				</div>
				<div className='control-colour'>
					<select
						className='control-colour-select'
						onChange={handleOnchangeColours}
						value={selectedColour}
					>
						{rgbaColours.map((value: IColours) => {
							return <option key={value.id}>{value.key}</option>;
						})}
					</select>
				</div>
			</div>
			<div className='map-container'>
				<DeckGL
					initialViewState={INITIAL_VIEW_STATE}
					controller={true}
					layers={geoLayers}
					effects={[lightingEffect]}
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
		</div>
	);
}
