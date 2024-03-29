import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div><input placeholder='Your Name' className="joinInput" type='text' onChange={(e)=>setName(e.target.value)}/></div>
                <div><input placeholder='Room' className="joinInput mt-20" type='text' onChange={(e)=> setRoom(e.target.value)}/></div>
                <Link onClick={(e)=> (!name || !room) ? e.preventDefault() : null}  to={`/chat`} state={{ name: name, room: room }}>
                    <button className='button mt-20' type='submit'>
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Join;