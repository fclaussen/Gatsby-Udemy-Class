import React from "react"
import Layout from '../components/layout'
import styled from 'styled-components'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'

const FeaturedImage = styled(Img)`
	max-width: 300px;
	margin: 16px 0;
`

export const query = graphql`
	query($slug: String!){
		wordpressWpPortfolio(slug: {eq: $slug}){
	    title
	    content
	    acf{
	      live_url
	    }
	    featured_media{
	      localFile{
	        childImageSharp{
	          fixed(width:300, height:300){
	          	...GatsbyImageSharpFixed_withWebp
	          }
	        }
	      }
	    }
	  }
	}
`

export default ({ data }) => {
	const portfolio = data.wordpressWpPortfolio;
	return (
	  <Layout>
	    <h1>
	      {portfolio.title}
	    </h1>
	    <div>
		    <strong>Website URL: </strong>
		    <a href={portfolio.acf.live_url} target="_blank" rel="noopener noreferrer">{portfolio.acf.live_url}</a>
	    </div>
	    <FeaturedImage fixed={portfolio.featured_media.localFile.childImageSharp.fixed} />
	    <div dangerouslySetInnerHTML={{__html: portfolio.content}} />
	  </Layout>
	)
}
