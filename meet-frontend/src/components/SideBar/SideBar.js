import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './SideBar.css'

const SideBar = () => {
  const [activeButton, setActiveButton] = useState(1)
  const { receivedRequests } = useSelector(state => state.friend)

  const handleButtonClick = useCallback(id => setActiveButton(id), [])

  return (
    <div className='sidenav'>
      <ul>
        <li className={activeButton === 1 ? 'item active' : 'item'} onClick={() => handleButtonClick(1)}>
          <Link to='/dashboard'>Home</Link>
        </li>
        <li className={activeButton === 2 ? 'item active' : 'item'} onClick={() => handleButtonClick(2)}>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className={activeButton === 3 ? 'item active' : 'item'} onClick={() => handleButtonClick(3)}>
          <Link to='/friends'>
            Friends
            {receivedRequests.length > 0 && (
              <span className='badge'>{receivedRequests.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
