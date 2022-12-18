import { PolygonLayer } from '@deck.gl/layers';
import { RGBAColor } from 'deck.gl';

export const Layers = (polygonData: [[[number]]], layerColour: RGBAColor) => {
	return [
		new PolygonLayer({
			id: 'polygon-layer',
			data: polygonData,

			/* props from PolygonLayer class */

			elevationScale: 0.01,
			extruded: false,
			filled: true,
			// getElevation: (d: any) => d.population / d.area / 10,
			getFillColor: layerColour,
			getLineColor: [80, 80, 80],
			getLineWidth: (d: any) => 1,
			getPolygon: (d: any) => d,
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
		}),
	];
};
