import React from 'react'
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";

const MobileOverlay = () => {
	const user = useUser();

	return (
		<div className='block pointer-events-none md:hidden fixed flex flex-col h-full justify-between z-[10]'>
			<div className='w-screen pointer-events-auto p-7'>
				Picture
			</div>
			<div className='bg-contrast-posts pointer-events-auto w-screen p-7 flex justify-between'>
				<div>logout</div>
				<div>page 2</div>
				<div>search</div>
				<div>motyw</div>
			</div>
		</div>
	)
}

export default MobileOverlay 