import { RGBAColor } from 'deck.gl';

export interface IColours {
	id?: number;
	key?: string;
	rgbaValues?: RGBAColor;
	hex?: string;
}

export const rgbaColours: IColours[] = [
	{
		id: 1,
		key: 'Light Purple',
		rgbaValues: [175, 105, 238],
	},
	{
		id: 2,
		key: 'Light Green',
		rgbaValues: [100, 231, 100],
	},
	{
		id: 3,
		key: 'Light Blue',
		rgbaValues: [173, 216, 230],
	},
];
