import { useState } from 'react';
import './Sidebar.scss';
import { NavLink } from 'react-router-dom';
import { ISidebarData, menuData } from './sidebar-data';
export default function Sidebar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	function toggleNavbar(): void {
		setIsOpen(!isOpen);
	}
	return (
		<div
			className={
				isOpen ? 'sidebar-container flex' : 'sidebar-container flex closed'
			}
		>
			<div className='logo-container flex' onClick={toggleNavbar}>
				<img
					src='https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'
					alt=''
				/>
				<h2>JSD</h2>
			</div>
			<div className='menu-container flex'>
				<ul className='menu-list grid'>
					{menuData.map((item: ISidebarData, index: number) => {
						const { Icon, name, link } = item;
						return (
							<NavLink
								key={index}
								to={link}
								className={({ isActive }) =>
									isActive ? `menu-list-item active` : `menu-list-item`
								}
							>
								<li className='menu-link flex' key={item.id}>
									<Icon className='icon' />
									<span className='menu-text'>{name}</span>
								</li>
							</NavLink>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
