import React from 'react'
import Image from 'next/image'

const Post = (props) => {
	return (
		<div className='p-10 dark:bg-slate-800 max-w-max my-10 mx-auto rounded'>
			<h1>{props.name} | {props.nickname}</h1>
			<p>{props.body}</p>
			<p>Posted at: {new Date(props.postedAt).toLocaleString()}</p>
			<Image src={props.img} alt="postimg" width="300" height="300" />
			<div>Likes: {props.likes.length}</div>
		</div>
	)
}

export default Post