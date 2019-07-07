import React from "react"
import Layout from '../components/layout'
import styled from 'styled-components'

const FeaturedImage = styled.img`
	max-width: 300px;
	margin: 16px 0;
`

export default ({pageContext}) => {
	return (
	  <Layout>
	    <h1>
	      {pageContext.title}
	    </h1>
	    <div>
		    <strong>Website URL: </strong>
		    <a href={pageContext.acf.live_url} target="_blank" rel="noopener noreferrer">{pageContext.acf.live_url}</a>
	    </div>
	    <FeaturedImage src={pageContext.featured_media.media_details.sizes.medium.source_url} />
	    <div dangerouslySetInnerHTML={{__html: pageContext.content}} />
	  </Layout>
	)
}
