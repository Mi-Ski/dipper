import React, {useState, useContext} from 'react'
import Search from "../Sidebar/Search";

import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";
import ThemeContext from '../../context/ThemeContext';

const MobileOverlayBottom = ({expanded}) => {
  const [searchVisible, setSearchVisible] = useState(false);
	const {toggleDarkContext} = useContext(ThemeContext)
  const user = useUser();
	const router = useRouter();

	return (
      <div className={`relative transition-[top] flex flex-col bg-contrast-posts pointer-events-auto w-screen p-7  ${expanded ? "top-0" : "top-full"}`}>
        {searchVisible ? (
          <div className="flex items-center">
            <Search />
            <button className="w-10 h-10 bg-border-dark rounded-xl" onClick={() => setSearchVisible(false)}>x</button>
          </div>
        ) : (
          <div className="flex justify-between">
						<button onClick={() => toggleDarkContext()}>☀️</button>
						<button onClick={() => router.push("/techstack")}>❓</button>
            <button onClick={() => setSearchVisible(true)}>🔍</button>
						<button onClick={() => router.push("/api/auth/logout")}>🔚</button>
          </div>
        )}
      </div>
	)
}

export default MobileOverlayBottom