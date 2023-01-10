import './Sidebar.scss';
import { FaWindowClose } from 'react-icons/fa';
import { sidebarMenuData } from '../sidebar-menu/sidebarMenu';

export default function Sidebar({
	isOpen,
	toggleNavbar,
	selectedMenu,
}: {
	isOpen: boolean;
	toggleNavbar: () => void;
	selectedMenu: string;
}) {
	return (
		<div
			className={isOpen ? 'sidebar-container' : 'sidebar-container close'}
			onClick={toggleNavbar}
		>
			<div
				className='sidebar-container-content'
				onClick={(event) => {
					// do not close modal if anything inside modal content is clicked
					event.stopPropagation();
				}}
			>
				<div className='sidebar-header'>
					<span>XPL Map</span>
					<FaWindowClose
						className='sidebar-close-icon'
						onClick={toggleNavbar}
					/>
				</div>
				<div className='sidebar-body'>
					{sidebarMenuData.map((component) => {
						if (component.name === selectedMenu) {
							const Component = component.component;
							return <Component key={component.id} />;
						}
						return <div key={component.id}></div>;
					})}
				</div>
			</div>
		</div>
	);
}
