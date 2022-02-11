import logo from './images/llogo.png';
import './App.css';
import background from './images/background.jpg'

function App() {
  return (
    <div className="app">
      <div className='app__wrapper'>
        <header className="header">
         <h2>Hallo</h2>
        </header>
        <nav className='nav'>
          <ul className='nav__list'>
            <li className='nav__item'>
              <a className='nav__link' href="#">Profile</a>
            </li>
            <li className='nav__item'>
              <a className='nav__link' href="#">News</a>
            </li>
            <li className='nav__item'>
              <a className='nav__link' href="#">Messages</a>
            </li>
            <li className='nav__item'>
              <a className='nav__link' href="#">Friends</a>
            </li>
            <li className='nav__item'>
              <a className='nav__link' href="#">Settings</a>
            </li>
          </ul>
        </nav>
        <div className='content'>
          <div className='content__back-img-wrapper'>
            <img className='content__back-img' src={background} alt="" />
          </div>
          <div className='content__bio'>
            avatar + bio
          </div>
          <div className='content__wall-posts'>
            <div className='new-post'>
              Create post
            </div>
            <div className='posts-wrapper'>
              <div className="post">
                Post1
              </div>
              <div className="post">
                Post2
              </div>
              <div className="post">
                Post3
              </div>
              <div className="post">
                Post4
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
