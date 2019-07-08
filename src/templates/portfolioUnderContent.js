import React from "react"
import Layout from '../components/layout'
import PortfolioItems from '../components/PortfolioItems'
import {graphql} from 'gatsby'

export const query = graphql`
	query($slug: String!){
		wordpressPage(slug: {eq: $slug}){
	    title
	    content
	  }
	}
`

export default ({ data }) => {
	const page = data.wordpressPage
	return (
	  <Layout>
	    <h1 dangerouslySetInnerHTML={{__html: page.title}} />
	    <div dangerouslySetInnerHTML={{__html: page.content}} />
	    <PortfolioItems />
	  </Layout>
	)
}
