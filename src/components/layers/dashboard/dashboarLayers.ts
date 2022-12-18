import { PolygonLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { RGBAColor } from 'deck.gl';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { ColorRange } from '@deck.gl/core/utils/color';
import { TransitionTiming } from '@deck.gl/core/lib/layer';
import { ScatterplotLayer } from '@deck.gl/layers';

const ambientLight = new AmbientLight({
	color: [255, 255, 255],
	intensity: 1.0,
});

const pointLight1 = new PointLight({
	color: [255, 255, 255],
	intensity: 0.8,
	position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
	color: [255, 255, 255],
	intensity: 0.8,
	position: [-3.807751, 54.104682, 8000],
});

export const lightingEffect = new LightingEffect({
	ambientLight,
	pointLight1,
	pointLight2,
});

export const colorRange: ColorRange = [
	[1, 152, 189],
	[73, 227, 206],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78],
];

const coverage = 0.2;
const radius = 100;
const upperPercentile = 1000;
const material = {
	ambient: 0.64,
	diffuse: 0.6,
	shininess: 32,
	specularColor: [51, 51, 51],
};

export const Layers = (
	polygonData: [[[number]]],
	data: any,
	layerColour: RGBAColor
) => {
	return [
		new ScatterplotLayer({
			id: 'points-layer',
			data,
			getPosition: (d: any) => {
				return d.coordinates;
			}, // [longitude, latitude] tuple
			getFillColor: [60, 220, 255],
			getRadius: 20,
		}),
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
		new HexagonLayer({
			id: 'heatmap',
			colorRange,
			coverage,
			data,
			elevationRange: [0, 100],
			elevationScale: data && data.length ? 20 : 0,
			extruded: true,
			getPosition: (d) => {
				return d.coordinates;
			},
			pickable: true,
			radius,
			upperPercentile,
			material,
			transitions: {
				elevationScale: 300 as unknown as TransitionTiming,
			},
		}),
	];
};
