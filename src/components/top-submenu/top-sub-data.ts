import { IconType } from 'react-icons';
import { MdDashboard, MdExplore, MdAnalytics } from 'react-icons/md';
import { fetchSuburbGis } from '../../redux/api-service/suburb/suburb';

export interface ITopSubmenuData {
	id: number;
	Icon: IconType;
	name: string;
	initialApiCall?: Function;
}

export const topSubmenuData: ITopSubmenuData[] = [
	{
		id: 1,
		Icon: MdDashboard,
		name: 'Dashboard',
		initialApiCall: fetchSuburbGis,
	},
	{
		id: 2,
		Icon: MdExplore,
		name: 'Explore',
	},
	{
		id: 3,
		Icon: MdAnalytics,
		name: 'Analytics',
	},
];
