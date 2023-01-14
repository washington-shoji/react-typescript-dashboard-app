import { PolygonLayer } from '@deck.gl/layers';
import { RGBAColor } from 'deck.gl';
import { LAYER_CONFIG } from '../layer-config/layerConfig';

const layerColour: RGBAColor = [175, 105, 238];

function getRandomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
export function polygonLayer(polygonData: any) {
	return new PolygonLayer({
		id: 'polygon-layer',
		data: polygonData,
		/* props from PolygonLayer class */
		elevationScale: 0.01,
		extruded: false,
		filled: true,
		// getElevation: (d: any) => d.population / d.area / 10,
		//getFillColor: layerColour,
		getFillColor: (f: any) => {
			return LAYER_CONFIG.COLOR_SCALE(
				getRandomIntInclusive(0.0, 65.0)
			) as unknown as RGBAColor;
		},
		getLineColor: [80, 80, 80],
		getLineWidth: (d: any) => 1,
		getPolygon: (d: any) => {
			if (d?.geo_point_3d?.coordinates[0]) {
				return d?.geo_point_3d?.coordinates[0];
			}
		},
		// lineJointRounded: false,
		// lineMiterLimit: 4,
		// lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
		lineWidthMinPixels: 1,
		// lineWidthScale: 1,
		// lineWidthUnits: 'meters',
		// material: true,
		stroked: false,
		wireframe: true,
		/* props inherited from Layer class */
		autoHighlight: false,
		// coordinateOrigin: [0, 0, 0],
		// coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
		highlightColor: [0, 0, 128, 128],
		// modelMatrix: null,
		opacity: 0.15,
		pickable: true,
		visible: true,
		wrapLongitude: false,
	});
}
