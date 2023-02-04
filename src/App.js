import { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/auth/Auth';
import Cookies from 'universal-cookie'
import { Button } from 'antd';
import { Chat } from './components/chat/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './components/firebase/FirebaseConfig';

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(cookies.get(null));

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token');
    setIsAuth(false)
    setRoom(null)
  }


  if (!isAuth) {

    return (
      <>
        <div>
          <Auth setIsAuth={setIsAuth} />
        </div>
      </>
    );
  };
  return (
    <>
      {
        room ? (<div><Chat room={room} /></div>) : (<div> <label>
          Enter Room Name:
          <input ref={roomInputRef} />
          <Button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat Room</Button>
        </label></div>)
      }
      <div>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  )
}

export default App;
