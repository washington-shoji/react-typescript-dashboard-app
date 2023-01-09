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

export const ColourPalate = [
	{
		palette_one: [
			[33, 62, 154],
			[60, 31, 167],
			[129, 28, 181],
			[195, 24, 176],
			[208, 19, 103],
			[222, 15, 14],
			[236, 112, 7],
			[249, 226, 0],
		],
	},
	{
		palette_two: [
			[0, 122, 153],
			[1, 152, 189],
			[73, 227, 206],
			[232, 254, 181],
			[254, 237, 177],
			[254, 173, 84],
			[213, 2, 85],
			[127, 25, 65],
		],
	},
	{
		palette_three: [
			[228, 26, 28],
			[55, 126, 184],
			[77, 175, 74],
			[152, 78, 163],
			[255, 127, 0],
			[255, 255, 51],
			[166, 86, 40],
			[247, 129, 191],
		],
	},
];
