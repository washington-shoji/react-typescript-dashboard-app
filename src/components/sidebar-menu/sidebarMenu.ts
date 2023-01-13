import { MainMenu } from '../sidebar-menu/main-menu/MainMenu';
import { DashboardMenu } from '../sidebar-menu/dashboard-menu/DashboardMenu';
import { ExploreMenu } from '../sidebar-menu/explore-menu/ExploreMenu';

export interface ISidebarMenu {
	id: number;
	name: string;
	component: () => JSX.Element;
}

export const sidebarMenuData: ISidebarMenu[] = [
	{
		id: 1,
		name: 'MainMenu',
		component: MainMenu,
	},
	{
		id: 2,
		name: 'Dashboard',
		component: DashboardMenu,
	},
	{
		id: 3,
		name: 'Explore',
		component: ExploreMenu,
	},
];
