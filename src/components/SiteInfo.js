import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const SiteInfoWrapper = styled.div`
	flex-grow: 1;
	color: white;
	margin: auto 0;
`

const SiteInfo = () => (
	<StaticQuery query={graphql`
		{
		  allWordpressWpLogo{
	      edges{
	        node{
	          url{
	            localFile{
	              childImageSharp{
	                fixed(width:100, height:28){
	                	...GatsbyImageSharpFixed_withWebp
	                }
	              }
	            }
	          }
	        }
	      }
	    }
		}
	`} render={props => (
		<SiteInfoWrapper>
			{props.allWordpressWpLogo.edges.map(siteLogos => (
        <Link to="/" key={siteLogos.node}>
          <Img
            fixed={siteLogos.node.url.localFile.childImageSharp.fixed}
            width="100"
            height="auto"
            fadeIn={false}
            objectFit="cover"
            alt="Logo"
          />
        </Link>
      ))}
		</SiteInfoWrapper>
	)} />
)

export default SiteInfo
