import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ColorRange } from '@deck.gl/core/utils/color';
import { LAYER_CONFIG } from '../layer-config/layerConfig';
import { IPopulationGrowth } from '../../../interface/population-growth/populationGrowth.interface';
import { TransitionTiming } from '@deck.gl/core/lib/layer';

export function populationGrowthHexagon(
	populationGrowthLayerData: IPopulationGrowth,
	colorRange: ColorRange
) {
	return new HexagonLayer({
		id: 'heatmap',
		colorRange: colorRange,
		opacity: 0.5,
		coverage: 2,
		data: populationGrowthLayerData,
		elevationRange: [0, 200],
		elevationScale: 100,
		extruded: true,
		getPosition: (d: any) => {
			if (d?.geo_point_2d?.coordinates) {
				return d?.geo_point_2d?.coordinates;
			}
		},
		getElevationValue: (d) => {
			return d.map((p) => p.y_2031);
		},
		getColorValue: (points) => {
			return (
				points.reduce((sum, point) => {
					return sum + point.y_2031;
				}, 0) / points.length
			);
		},
		pickable: true,
		radius: 500,
		upperPercentile: 100,
		material: LAYER_CONFIG.material,
		transitions: {
			elevationScale: 3000 as unknown as TransitionTiming,
		},
		onClick: (info, event) => console.log('Clicked:', info, event),
	});
}
