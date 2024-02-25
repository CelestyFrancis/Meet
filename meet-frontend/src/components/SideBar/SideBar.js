import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './SideBar.css'

const SideBar = () => {
  const [activeButton, setActiveButton] = useState(1)

  const handleButtonClick = useCallback(
    buttonId => {
      setActiveButton(buttonId)
    },
    [setActiveButton]
  )

  useEffect(() => {}, [activeButton])

  return (
    <div>
      <div className='sidenav'>
        <ul>
          <li
            className={activeButton === 1 ? ' item active' : 'item'}
            onClick={() => handleButtonClick(1)}
          >
            <Link to='/dashboard'>Home</Link>
          </li>
          <li
            className={activeButton === 2 ? ' item active' : 'item'}
            onClick={() => handleButtonClick(2)}
          >
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
