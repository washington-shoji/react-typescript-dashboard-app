interface IPolygonGeoShape {
	_id: string;
	type: string;
	coordinates: [[[number]]];
}

interface IGeometry {
	_id: string;
	type: string;
	coordinates: number[];
}

interface IFields {
	_id: string;
	geo_shape: IPolygonGeoShape;
	postcode: string;
	shapeuuid: string;
	suburbname: string;
}

export interface IRiskZone {
	_id: string;
	polygonData: {
		fields: IFields;
		geometry: IGeometry;
	}[];
	riskRate: number;
	riskType: string;
	suburbName: string;
}
