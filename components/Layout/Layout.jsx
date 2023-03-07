import React, {useContext} from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ThemeContext from '../../context/ThemeContext'

const Layout = ({children, routed}) => {
	const {darkContext} = useContext(ThemeContext)
	const gradientColLight = darkContext ? "rgba(7, 7, 10, 1)" : "rgba(255, 255, 255, 1)"
	const gradientColDark = darkContext ? "rgba(6, 8, 15, 1)" : "rgba(255, 255, 255, 1)"

	return (
    <div className={`h-screen ${darkContext ? "dark" : ""} `}>
      <div className="flex min-h-full relative  dark:text-textcol-main-dark">
        <div className={`w-full h-full fixed z-0`}></div>
        <style jsx>{`
          div {
            background: linear-gradient(
              45deg,
              ${gradientColLight} 0%,
              ${gradientColLight} 44%,
              ${gradientColDark} 61%,
              ${gradientColLight} 76%,
              ${gradientColLight} 100%
            );
          }
        `}</style>
        <Sidebar routed={routed} />
        <div className={`hidden md:block ${routed ? "md:w-2/5" : "md:w-1/5"}`} ></div>
				{children}
      </div>
    </div>
	)
}

export default Layout