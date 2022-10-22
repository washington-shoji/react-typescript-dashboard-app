import './App.scss';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';

function App() {
	return (
		<div className='app-container'>
			<Sidebar />
			<Main />
		</div>
	);
}

export default App;
