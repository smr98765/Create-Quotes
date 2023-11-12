import {
	useParams,
	Route,
	Link,
	Outlet,
	
} from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import { useEffect } from 'react'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const QuoteDetail = () => {
	const params = useParams()

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true)

	const { quotesId } = params

	useEffect(() => {
		sendRequest(quotesId)
	}, [sendRequest, quotesId])

	if (status === 'pending') {
		return (
			<div>
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <p className='centered focused'>{error}</p>
	}
	if (!loadedQuote.text) {
		return <p>No found quote</p>
	}
	return (
		<>
			<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
			<Outlet/>

		</>
	)
}

export default QuoteDetail
