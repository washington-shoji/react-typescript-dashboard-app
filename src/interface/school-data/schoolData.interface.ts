import { IGeometry } from '../poligon-data/poligonData.interface';

export interface ISchool {
	_id?: string;
	School_code?: number;
	School_name?: string;
	Town_suburb?: string;
	Postcode?: number;
	Level_of_schooling?: string;
	Selective_school?: string;
	LGA?: string;
	Latitude?: number;
	Longitude?: number;
	Geometry?: IGeometry;
}
