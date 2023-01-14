import { TransitionTiming } from '@deck.gl/core/lib/layer';
import { ScatterplotLayer } from '@deck.gl/layers';

export function suburbScatterplotLayer(suburbData: any) {
	return new ScatterplotLayer({
		id: 'points-layer',
		data: suburbData,
		getPosition: (d: any) => {
			return d?.geo_point_2d?.coordinates;
		}, // [longitude, latitude] tuple
		getFillColor: [249, 226, 0],
		getRadius: 50,
		pickable: true,
		transitions: {
			getFillColor: 3000 as unknown as TransitionTiming,
		},
		autoHighlight: true,
		highlightColor: [60, 31, 167],
		visible: true,
	});
}
