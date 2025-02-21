import { useState } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import './App.css'

function App() {
	const [value, setValue] = useState('')
	const [error, setError] = useState('')
	const [data, setData] = useState({})
	const [selectedCities, setSelectedCities] = useState([])

	const items = [
		{ name: 'Alphabets', code: 'alphabets' },
		{ name: 'Numbers', code: 'numbers' },
		{ name: 'Highest Alphabet', code: 'highest_alphabet' },
	]

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

			setData(await res.json())
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
			<button style={{ marginBottom: '12px' }} onClick={() => setValue('')}>
				Clear
			</button>

			{selectedCities.map((x: any) => (
				<div style={{ marginTop: '12px', marginBottom: '12px' }}>
					{x.name}: {(data as any)[x.code]?.join(', ')}
				</div>
			))}

			<div style={{ marginTop: '16px' }}></div>

			<MultiSelect
				value={selectedCities}
				onChange={(e) => setSelectedCities(e.value)}
				options={items}
				optionLabel='name'
				placeholder='Select Items'
				maxSelectedLabels={3}
				className='w-full md:w-20rem'
			/>
		</div>
	)
}

export default App
