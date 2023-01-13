import './MapOption.scss';
import { useState } from 'react';
import { MapInfo } from '../../data/map/mapInfo';
import { maps } from '../../data/map/mapInfo';
import {
	useAppDispatch,
	useAppSelector,
} from '../../redux/custom-hooks/reduxHooks';
import { setMapOptionState } from '../../redux/slices/map-option/mapOptionSlice';

export function MapOption() {
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const mapOptionState = useAppSelector(
		(state) => state.mapOptionState.mapOption
	);
	const dispatch = useAppDispatch();

	function handleMapImage(mapInfo: MapInfo) {
		dispatch(setMapOptionState(mapInfo));
	}

	function handleMouseOver() {
		setIsHovering(true);
	}

	function handleMouseOut() {
		setIsHovering(false);
	}
	return (
		<div
			className='map-option-container'
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			<div className='map-image'>
				<img
					className='map-option-image'
					src={mapOptionState.mapImage}
					alt=''
				/>
			</div>
			{isHovering &&
				maps
					.filter((map) => map.id !== mapOptionState.id)
					.map((map, index) => {
						return (
							<button
								className='map-option-button'
								key={index}
								onClick={() => handleMapImage(map)}
							>
								<img className='map-option-image' src={map.mapImage} alt='' />
							</button>
						);
					})}
		</div>
	);
}
