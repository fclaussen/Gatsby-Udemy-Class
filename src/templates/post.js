import React from "react"
import Layout from '../components/layout'
import {graphql} from 'gatsby'

export const query = graphql`
  query($slug: String!){
    wordpressPost(slug: {eq: $slug}){
      title
      content
    }
  }
`

export default ({data}) => {
  const post = data.wordpressPost;
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{__html: post.title}} />
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </Layout>
  )
}
