import { IconType } from 'react-icons';
import {
	MdDashboard,
	MdExplore,
	MdAnalytics,
	MdSettingsApplications,
	MdLogout,
} from 'react-icons/md';

export interface ISidebarData {
	id: number;
	Icon: IconType;
	name: string;
	link: string;
}

export const menuData: ISidebarData[] = [
	{
		id: 1,
		Icon: MdDashboard,
		name: 'Dashboard',
		link: '/dashboard',
	},
	{
		id: 2,
		Icon: MdExplore,
		name: 'Explore',
		link: '/explore',
	},
	{
		id: 3,
		Icon: MdAnalytics,
		name: 'Analytics',
		link: '/analytic',
	},
	{
		id: 4,
		Icon: MdSettingsApplications,
		name: 'Settings',
		link: '/setting',
	},
];
