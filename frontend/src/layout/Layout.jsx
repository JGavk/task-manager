import Header from './header/Header.jsx';
import { Outlet } from 'react-router-dom';

const Layout = ({children}) => {
    return (
        <div className='layout'>
            <Header/>
            <Outlet /> 
                <main className='layout-content' >{children}</main>
        </div>
    );
};

export default Layout;