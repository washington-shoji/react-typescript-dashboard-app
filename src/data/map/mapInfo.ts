import { MAP_BOX_STYLE } from '../../enum/mapstyle';
import * as mapImages from '../../assets/index';

export type MapInfo = {
	id: number;
	name: string;
	mapImage: string;
	style: MAP_BOX_STYLE;
};

export const maps: MapInfo[] = [
	{
		id: 1,
		name: 'light',
		mapImage: mapImages.light,
		style: MAP_BOX_STYLE.MapBoxLight,
	},
	{
		id: 2,
		name: 'dark',
		mapImage: mapImages.dark,
		style: MAP_BOX_STYLE.MapBoxDark,
	},
	{
		id: 3,
		name: 'street',
		mapImage: mapImages.street,
		style: MAP_BOX_STYLE.MapBoxStreet,
	},
	{
		id: 4,
		name: 'outdoors',
		mapImage: mapImages.outdoors,
		style: MAP_BOX_STYLE.MapBoxOutdoors,
	},
];
