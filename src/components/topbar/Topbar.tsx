import './Topbar.scss';
import { MdMenu } from 'react-icons/md';
import { TopSubmenu } from '../top-submenu/TopSubmenu';
import { ITopSubmenuData, topSubmenuData } from '../top-submenu/top-sub-data';

export function Topbar({
	toggleMenu,
	status,
	handleSetSelectedMenu,
}: {
	toggleMenu: () => void;
	status: 'idle' | 'loading' | 'error';
	handleSetSelectedMenu: (arg: string) => void;
}) {
	return (
		<div className='topbar-container'>
			<div
				className='topbar-menu'
				onClick={() => handleSetSelectedMenu('MainMenu')}
			>
				<MdMenu />
			</div>
			<div className='topbar-submenu'>
				{topSubmenuData.map((data: ITopSubmenuData) => {
					return (
						<TopSubmenu
							key={data.id}
							data={data}
							status={status}
							handleSetSelectedMenu={handleSetSelectedMenu}
						/>
					);
				})}
			</div>
		</div>
	);
}
