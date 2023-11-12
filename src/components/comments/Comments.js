import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import classes from './Comments.module.css'
import NewCommentForm from './NewCommentForm'
import CommentsList from './CommentsList'

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false)
	const params = useParams()
	const { quotesId } = params

	const {
		sendRequest,
		status,
		data: loadedComments,
	} = useHttp(getAllComments, true)

	// const loadedComments = []

	useEffect(() => {
		sendRequest(quotesId)
	}, [sendRequest, quotesId])

	const startAddCommentHandler = () => {
		setIsAddingComment(true)
	}

	const addedCommentsHandler = useCallback(() => {
		sendRequest(quotesId)
	}, [sendRequest, quotesId])

	let comments

	if (status === 'pending') {
		comments = (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		)
	}
	if (status === 'completed' && loadedComments && loadedComments.length > 0) {
		comments = <CommentsList comments={loadedComments} />
	}

	if (
		status === 'completed' &&
		(!loadedComments || loadedComments.length === 0)
	) {
		comments = <p className='centered'>No comments were added yet!</p>
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className='btn' onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && (
				<NewCommentForm
					quotedId={quotesId}
					onAddedComment={addedCommentsHandler}
				/>
			)}
			{comments}
		</section>
	)
}

export default Comments
