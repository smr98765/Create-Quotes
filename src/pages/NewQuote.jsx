import { useNavigate } from 'react-router-dom'
import QuoteForm from '../components/quotes/QuoteForm'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'
import { useEffect } from 'react'

const NewQuote = () => {
	const { sendRequest, status } = useHttp(addQuote)

	const navigate = useNavigate()

	useEffect(() => {
		if (status === 'completed') {
			navigate('/')
		}
	}, [status, navigate])
	function addQuoteHandler(quoteData) {
		sendRequest(quoteData)
	}
	return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
}

export default NewQuote
