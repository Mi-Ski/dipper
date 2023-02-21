import React, {useState} from 'react'


const AddComment = ({user, addCommentHandler}) => {
	const [inputValue, setInputValue] = useState('')
	return (
		<div className='mt-6'>
			<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Twój komentarz'></input>
			<button onClick={() => addCommentHandler(inputValue)}>Dodaj komentarz</button>
		</div>
	)
}

export default AddComment