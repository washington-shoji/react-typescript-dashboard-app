import { PolygonLayer } from '@deck.gl/layers';
import { RGBAColor } from 'deck.gl';
import { LAYER_CONFIG } from '../layer-config/layerConfig';

export function polygonLayerPopulation(populationGrowthLayerData: any) {
	return new PolygonLayer({
		id: 'polygon-layer-population',
		data: populationGrowthLayerData,
		/* props from PolygonLayer class */
		elevationScale: 0.01,
		extruded: false,
		filled: true,
		// getElevation: (d: any) => d.population / d.area / 10,
		//getFillColor: layerColour,
		getFillColor: (f: any) => {
			return LAYER_CONFIG.COLOR_SCALE(
				Math.sqrt(f.y_2031) / 10
			) as unknown as RGBAColor;
		},
		getElevation: (f: any) => Math.sqrt(f.y_2031) * 10,
		getLineColor: [80, 80, 80],
		getLineWidth: (d: any) => 1,
		getPolygon: (d: any) => {
			if (d?.geo_point_3d?.coordinates !== (undefined && null)) {
				const poly = d?.geo_point_3d?.coordinates;
				return poly;
			}
		},
		lineJointRounded: false,
		lineMiterLimit: 4,
		lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
		lineWidthMinPixels: 1,
		lineWidthScale: 1,
		// lineWidthUnits: 'meters',
		material: true,
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
		lightingEffect: LAYER_CONFIG.lightingEffect,
	});
}
