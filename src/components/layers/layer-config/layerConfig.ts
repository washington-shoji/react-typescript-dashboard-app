import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { ColorRange } from '@deck.gl/core/utils/color';
import { scaleThreshold } from 'd3-scale';

const ambientLight = new AmbientLight({
	color: [0, 0, 0],
	intensity: 2.0,
});

const pointLight1 = new PointLight({
	color: [255, 255, 255],
	intensity: 0.8,
	position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
	color: [255, 255, 255],
	intensity: 0.8,
	position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
	ambientLight,
	pointLight1,
	pointLight2,
});

const colorRange: ColorRange = [
	[1, 152, 189],
	[73, 227, 206],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78],
];

const COLOR_SCALE = scaleThreshold()
	.domain([
		// -0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2,
		0.0, 5.0, 15.0, 20.0, 25.0, 30.0, 35.0, 40.0, 45.0, 50.0, 55.0, 60.0, 65.0,
	])
	.range([
		[65, 182, 196],
		[127, 205, 187],
		[199, 233, 180],
		[237, 248, 177],
		// zero
		[255, 255, 204],
		[255, 237, 160],
		[254, 217, 118],
		[254, 178, 76],
		[253, 141, 60],
		[252, 78, 42],
		[227, 26, 28],
		[189, 0, 38],
		[128, 0, 38],
	] as Iterable<number>);

const material = {
	ambient: 0.64,
	diffuse: 0.6,
	shininess: 32,
	specularColor: [51, 51, 51],
};

export const LAYER_CONFIG = {
	ambientLight,
	pointLight1,
	pointLight2,
	lightingEffect,
	colorRange,
	COLOR_SCALE,
	material,
};
