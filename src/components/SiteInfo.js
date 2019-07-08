import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'

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
              source_url
            }
          }
        }
      }
		}
	`} render={props => (
		<SiteInfoWrapper>
			{props.allWordpressWpLogo.edges.map(siteLogos => (
        <Link to="/" key={siteLogos.node.url.source_url}>
          <img
            src={siteLogos.node.url.source_url}
            width="100"
            height="auto"
            object-fit="cover"
            alt="Thumbnail"
          />
        </Link>
      ))}
		</SiteInfoWrapper>
	)} />
)

export default SiteInfo
