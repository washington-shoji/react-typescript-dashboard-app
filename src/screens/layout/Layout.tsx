import './Layout.scss';
import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Topbar } from '../../components/topbar/Topbar';
import Dashboard from '../dashboard/Dashboard';
import {
	useAppSelector,
	useAppDispatch,
} from '../../redux/custom-hooks/reduxHooks';
import { setMenuState } from '../../redux/slices/nav-menu/sideNavBarMenuSlice';

export function Layout() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedMenu, setSelectedMenu] = useState<string>('');

	const navMenuState = useAppSelector((state) => state.navMenuState.menuState);
	const dispatch = useAppDispatch();

	function toggleNavbar(): void {
		dispatch(setMenuState(!navMenuState));
		//setIsOpen(!isOpen);
	}

	function handleSetSelectedMenu(selectedMenu: string): void {
		setSelectedMenu(selectedMenu);
		dispatch(setMenuState(!navMenuState));
		//setIsOpen(!isOpen);
	}

	return (
		<div className='layout-container'>
			<Topbar
				toggleMenu={toggleNavbar}
				handleSetSelectedMenu={handleSetSelectedMenu}
			/>
			<Sidebar
				isOpen={navMenuState}
				toggleNavbar={toggleNavbar}
				selectedMenu={selectedMenu}
			/>
			<Dashboard />
		</div>
	);
}
