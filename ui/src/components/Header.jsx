import {Link} from 'react-router-dom'

function Header () {
    return (
        <header className="p-2" style={{ backgroundColor: '#fffaf0' }}>
            <div className="d-flex">
            <div className="d-flex flex-row justify-content-around">
                <Link to="/patrimoine" className="btn"  style={{ fontSize: '1.5rem', color: 'black'}}>
                Patrimoine
                </Link>
                <Link to="/possession" className="btn"  style={{ fontSize: '1.5rem', color: 'black' }}>
                Possession
                </Link>
            </div>
            </div>
        </header>
    )
}

export default Header;