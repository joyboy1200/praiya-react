import { useState } from 'react'
import './App.css'

function App() {
	const [value, setValue] = useState('')
	const [error, setError] = useState('')

	const onSubmit = async () => {
		try {
			setError('')
			const parsedValue = JSON.parse(value)
			const res = await fetch('https://praiya-node.onrender.com/bfhl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(parsedValue),
			})

			console.log(await res.json())
		} catch (error) {
			setError('Invalid JSON')
		}
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<input
				type='text'
				value={value}
				style={{ padding: '8px 12px', borderRadius: '8px' }}
				onChange={(e) => setValue(e.target.value)}
			></input>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<button
				style={{ marginTop: '12px', marginBottom: '12px' }}
				onClick={onSubmit}
			>
				Submit
			</button>
			<button onClick={() => setValue('')}>Clear</button>
		</div>
	)
}

export default App
