import './TopSubmenu.scss';
import { ITopSubmenuData } from './top-sub-data';
import { useAppDispatch } from '../../redux/custom-hooks/reduxHooks';
import {
	MainMenuControl,
	setMainMenuControlIsOpen,
	setMainMenuControlState,
} from '../../redux/slices/main-menu-control/MainMenuControl.slice';

export function TopSubmenu({
	data,
	handleSetSelectedMenu,
	status,
}: {
	data: ITopSubmenuData;
	handleSetSelectedMenu: (arg: string) => void;
	status: 'idle' | 'loading' | 'error';
}) {
	const { Icon, name } = data;

	const dispatch = useAppDispatch();

	function handleMenu(data: ITopSubmenuData) {
		const mainMenuControlData: MainMenuControl = {
			id: data.id,
			menuStatus: status,
			menuName: data.name,
		};
		dispatch(setMainMenuControlState(mainMenuControlData));
		dispatch(setMainMenuControlIsOpen(true));
		if (data.initialApiCall !== undefined) {
			dispatch(data.initialApiCall());
		}
	}

	return (
		<div className='top-submenu-container' onClick={() => handleMenu(data)}>
			<Icon />
			<span>{name}</span>
		</div>
	);
}
