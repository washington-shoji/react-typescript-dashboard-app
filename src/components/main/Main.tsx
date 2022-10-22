import './Main.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../screens/dashboard/Dashboard';
import Explore from '../../screens/explore/Explore';
import Analytic from '../../screens/analytic/Analytic';
export default function Main() {
	return (
		<div className='main-container'>
			<Routes>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/explore' element={<Explore />} />
				<Route path='/analytic' element={<Analytic />} />
				<Route path='/' element={<Navigate to='/dashboard' replace />} />
			</Routes>
		</div>
	);
}
