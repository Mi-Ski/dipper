import React, {useContext} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ThemeContext from '../../context/ThemeContext'

const Layout = ({children}) => {
	const {darkContext} = useContext(ThemeContext)

	return (
    <div className={`h-screen ${darkContext ? "dark" : ""} `}>
      <div className="flex min-h-full relative  dark:text-textcol-main-dark">
        <div className={`w-full h-full fixed z-0`}></div>
        <style jsx>{`
          div {
            background: linear-gradient(
              45deg,
              rgba(7, 7, 10, 1) 0%,
              rgba(7, 7, 10, 1) 44%,
              rgba(6, 8, 15, 1) 61%,
              rgba(7, 7, 10, 1) 76%,
              rgba(7, 7, 10, 1) 100%
            );
          }
        `}</style>
        <Sidebar />
        <div className="hidden md:block md:w-1/5"></div>
				{children}
      </div>
    </div>
	)
}

export default Layout