import { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const AllQuote = () => {
	const {
		sendRequest,
		status,
		data: loadetQuote,
		error,
	} = useHttp(getAllQuotes, true)

	useEffect(() => {
		sendRequest()
	}, [sendRequest])

	if (status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <p className='centered focused'>{error}</p>
	}

	if(status === 'completed' && (!loadetQuote || loadetQuote.length === 0)){
		return <NoQuotesFound />
	}

	return <QuoteList quotes={loadetQuote} />
}

export default AllQuote
