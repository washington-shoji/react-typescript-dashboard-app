import { ISchool } from './../../../interface/school-data/schoolData.interface';
import { IGeoSuburb } from '../../../interface/poligon-data/poligonData.interface';
import { IPopulationGrowth } from './../../../interface/population-growth/populationGrowth.interface';
import { polygonLayerPopulation } from '../lga/lgaPopulationGrowthLayers';
import { polygonLayer } from '../suburb/suburbPolygonLayer';
import { suburbScatterplotLayer as suburbScatterplotsLayer } from '../suburb/suburbScatterplotLayer';

export function getHexagonToolTip({ object }: any) {
	if (object) {
		const objData = Object.entries(object);
		const toolTipData = objData
			.filter(([key, value]) => typeof value === ('string' || 'number'))
			.map(([key, value]) => {
				return `${key.toUpperCase()}: ${value}`;
			})
			.join('\n');
		return `${toolTipData}`;
	}
	return null;
}

export const Layers = ({
	suburbData,
	schoolData,
	populationGrowthLayerData,
	suburbPolygonData,
}: {
	suburbData: IGeoSuburb;
	schoolData: ISchool;
	populationGrowthLayerData: IPopulationGrowth;
	suburbPolygonData: IGeoSuburb;
}) => {
	return [
		//geojsonLayer(populationGrowthLayerData, layerColour),
		// populationGrowthHexagon(populationGrowthLayerData, colorRange),
		// geojsonLayer(lgaGisData, layerColour),
		//polygonLayerPopulation(lgaGisData),
		polygonLayer(suburbPolygonData),
		suburbScatterplotsLayer(suburbData),
	];
};
