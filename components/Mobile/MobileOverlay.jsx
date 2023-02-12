import React from 'react'
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/router";

const MobileOverlay = () => {
	const user = useUser();

	return (
		<div className='block md:hidden fixed flex flex-col h-full justify-between z-[10]'>
			<div className='w-screen p-7'>
				Picture
			</div>
			<div className='bg-contrast-posts w-screen p-7 flex justify-between'>
				<div>logout</div>
				<div>page 2</div>
				<div>search</div>
				<div>motyw</div>
			</div>
		</div>
	)
}

export default MobileOverlay 