import React, { useMemo } from 'react';
import { useBotMateApp } from '@botmate/helper-plugin';
import { Route, Routes } from 'react-router-dom';

function App() {
	const { menu } = useBotMateApp();

	const routes = useMemo(() => {
		return menu.map(({ to, Component }) => {
			return <Route key={to} path={to} element={<Component />} />;
		});
	}, [menu]);

	return (
		<Routes>
			<Route path='/' element={<div>TSX</div>} />
			{routes}
			<Route path='*' element={<div>404</div>} />
		</Routes>
	);
}

export default App;