import { ScatterplotLayer } from '@deck.gl/layers';

export function schoolScatterplotLayer(schoolData: any) {
	return new ScatterplotLayer({
		id: 'points-layer',
		data: schoolData,
		getPosition: (d: any) => {
			return d?.Geometry?.coordinates;
		}, // [longitude, latitude] tuple
		getFillColor: [60, 220, 255],
		getRadius: 20,
	});
}
