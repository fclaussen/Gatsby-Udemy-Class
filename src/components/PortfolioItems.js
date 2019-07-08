import React from 'react'
import {graphql, useStaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const PortfolioItemsWrapper = styled.div`
	display: flex;
	justify-content: center;
`

const PortfolioItem = styled.div`
	width: 300px;
	border: 1px solid #efefef;
	padding: 16px;
	margin: 16px;
`

const PortfolioImage = styled(Img)`
	max-width: 100%;
`

const PortfolioItems = () => {
	const data = useStaticQuery(graphql`
		{
			allWordpressWpPortfolio{
		    edges{
		      node{
		      	id
						title
						content
						excerpt
						slug
						status
		        featured_media{
      	      localFile{
      	        childImageSharp{
      	          fixed(width:300, height:200){
      	          	...GatsbyImageSharpFixed_withWebp
      	          }
      	        }
      	      }
      	    }
		      }
		    }
		  }
		}
	`)
	return (
		<PortfolioItemsWrapper>
			{data.allWordpressWpPortfolio.edges.map(portfolioItem => (
				<PortfolioItem key={portfolioItem.node.id}>
					<h2>{portfolioItem.node.title}</h2>
					<PortfolioImage fixed={portfolioItem.node.featured_media.localFile.childImageSharp.fixed} alt="Thumbnail" />
					<div dangerouslySetInnerHTML={{__html: portfolioItem.node.excerpt}} />
					<Link to={`/portfolio/${portfolioItem.node.slug}`}>
						Read More
					</Link>
				</PortfolioItem>
			))}
		</PortfolioItemsWrapper>
	)
}

export default PortfolioItems
