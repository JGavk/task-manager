import Header from './header/Header.jsx';

const Layout = ({children}) => {
    return (
        <div className='layout'>
            <Header/>
                <main className='layout-content' >{children}</main>
        </div>
    );
};

export default Layout;