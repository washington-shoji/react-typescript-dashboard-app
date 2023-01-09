interface IPolygonGeoShape {
	_id?: string;
	type: string;
	coordinates: [[[number]]];
}

export interface IGeometry {
	_id?: string;
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

export interface IGeoSuburb {
	_id?: string;
	geo_point_2d?: IGeometry;
	geo_point_3d?: IPolygonGeoShape;
	post_code?: string;
	suburb_name?: string;
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
