import React from 'react'
import Layout from '../components/layout'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {graphql} from 'gatsby'

const Pagination = styled.div`
	display: flex;
	justify-content: flex-end;
`
const PageNumberWrapper = styled.div`
	border: 1px solid #eee;
	background: ${props => props.isCurrentPage ? '#eee' : 'white' }
`
const PageNumber = styled(Link)`
	display: block;
	padding: 8px 16px;
`

// wordpress_id
// title
// content
// excerpt
// date(formatString: "Do MMM YYYY HH:mm")
// slug
// status
// format

export const query = graphql`
	query($posts: [String]){
		allWordpressPost(filter: {slug: {in: $posts }}){
			edges{
				node{
					wordpress_id
					title
				  content
				  excerpt
				  date(formatString: "Do MMM YYYY HH:mm")
				  slug
				  status
				  format
				}
			}
		}
	}
`

export default ({ data, pageContext }) => {
	return (
		<Layout>
			{data.allWordpressPost.edges.map((post) => (
				<div key={post.node.wordpress_id}>
					<Link to={`/blog/${post.node.slug}/`}><h3 dangerouslySetInnerHTML={{__html: post.node.title}} /></Link>
					<small>
						{post.node.date}
					</small>
					<p dangerouslySetInnerHTML={{__html: post.node.excerpt}} />
				</div>
			))}
			<Pagination>
				{Array.from({length: pageContext.numberOfPages}).map((page, index) => (
					<PageNumberWrapper key={index} isCurrentPage={index + 1 === pageContext.currentPage}>
						<PageNumber to={index === 0 ? '/blog/' : `/blog/${index + 1}`}>{index + 1}</PageNumber>
					</PageNumberWrapper>
				))}
			</Pagination>
		</Layout>
	)
}
