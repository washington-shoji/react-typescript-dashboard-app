import './MapInformation.scss';
import { FaWindowClose } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import {
	useAppSelector,
	useAppDispatch,
} from '../../redux/custom-hooks/reduxHooks';
import { setMainMenuControlIsOpen } from '../../redux/slices/main-menu-control/MainMenuControl.slice';
import { sidebarMenuData } from '../sidebar-menu/sidebarMenu';

export function MapInformation({ information }: { information: any }) {
	const [informationMenu, setInformationMenu] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { isOpen, menuName } = useAppSelector((state) => state.mainMenuState);

	const { idle, loading, error } = useAppSelector(
		(state) => state.apiStateStatus
	);

	return (
		<div className='map-information-container'>
			<div className='map-information-header'>
				<span>Map Information</span>
				<FaWindowClose
					className='map-information-header-icon'
					onClick={() => dispatch(setMainMenuControlIsOpen(!isOpen))}
				/>
			</div>
			<div className='map-information-switch'>
				View Menu
				<label className='switch'>
					<input
						type='checkbox'
						onClick={() => setInformationMenu(!informationMenu)}
					/>
					<span className='slider'></span>
				</label>
			</div>
			{loading && <p>Loading</p>}
			{informationMenu && (
				<div className='map-information-menu'>
					{sidebarMenuData
						.filter((menu) => {
							return menu.name === menuName;
						})
						.map((menu) => {
							const Component = menu.component;
							return <Component key={menu.id} />;
						})}
				</div>
			)}
			{!loading && !informationMenu && (
				<div className='map-information-content'>
					{information?.suburb_name && (
						<span>Suburb: {information?.suburb_name}</span>
					)}
				</div>
			)}
		</div>
	);
}
