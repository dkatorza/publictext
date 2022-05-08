import { Route, Routes } from 'react-router-dom';
import { Header } from './cmp/Header';
// import { Header } from './cmps/Header';
import { routes } from './routes';

function App() {
  return (
    <div className='app-general'>
      <header className='App-header'>
        <Header />
      </header>
      <main className='main-wrapper'>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
