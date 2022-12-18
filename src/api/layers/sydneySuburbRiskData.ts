import axios from 'axios';
import { IRiskZone } from '../../interface/poligon-data/poligonData.interface';

async function fetchBySuburbName(suburbName: string) {
	try {
		const response = await axios.get<IRiskZone>(
			'http://localhost:9090/api/v1/riskzone/suburb',
			{
				params: { suburb: suburbName },
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error: ', error);
	}
}

async function fetchAllRiskZones() {
	try {
		const response = await axios.get<IRiskZone[]>(
			'http://localhost:9090/api/v1/riskzone'
		);
		return response.data;
	} catch (error) {
		console.error('Error: ', error);
	}
}

export const SydneySuburbRiskDataApi = { fetchBySuburbName, fetchAllRiskZones };
