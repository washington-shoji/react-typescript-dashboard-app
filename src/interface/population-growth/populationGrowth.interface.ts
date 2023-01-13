import { IGeo_point_2d, IGeo_point_3d } from '../global/globoal.interface';

export interface IPopulationGrowth {
	_id: string;
	lga: string;
	y_2011: number;
	y_2016: number;
	y_2021: number;
	y_2026: number;
	y_2031: number;
	geo_point_2d?: IGeo_point_2d;
	//geo_point_3d?: IGeo_point_3d;
}
