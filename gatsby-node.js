const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	// The “graphql” function allows us to run arbitrary
	// queries against the local Gatsby GraphQL schema. Think of
	// it like the site has a built-in database constructed
	// from the fetched data that you can run queries against.
	const result = await graphql(`
		{
			wordpressPage(title: { eq: "Home" }){
				slug
			}
			allWordpressPage(filter: { title: { ne: "Home" } }){
				edges{
					node{
						slug
						template
					}
				}
			}
			allWordpressWpPortfolio{
				edges{
					node{
						slug
					}
				}
			}
			allWordpressPost {
				edges {
					node {
						slug
					}
				}
			}
		}
	`)

	// Check for any errors
	if (result.errors) {
		throw new Error(result.errors)
	}

	// Access query results via object destructuring
	const { wordpressPage, allWordpressPage, allWordpressPost, allWordpressWpPortfolio } = result.data

	// Create Page pages.
	const pageTemplate = path.resolve(`./src/templates/page.js`)
	const portfolioUnderContentTemplate = path.resolve(`./src/templates/portfolioUnderContent.js`)
	// We want to create a detailed page for each page node.
	// The path field contains the relative original WordPress link
	// and we use it for the slug to preserve url structure.
	// The Page ID is prefixed with 'PAGE_'
	createPage({
    path: `/`,
    component: slash(pageTemplate),
    context: {
    	slug: wordpressPage.slug
    }
  })
	allWordpressPage.edges.forEach(edge => {
		createPage({
			path: `/${edge.node.slug}/`,
			component: slash(edge.node.template === 'templates/portfolio-under-content.php' ? portfolioUnderContentTemplate : pageTemplate),
			context: {
				slug: edge.node.slug,
			}
		})
	})

	const postTemplate = path.resolve(`./src/templates/post.js`)
	const blogArchiveTemplate = path.resolve(`./src/templates/blogArchive.js`)
	const posts = allWordpressPost.edges;
	let slugs = [];
	posts.forEach( (post) => {
		slugs.push(post.node.slug);
	});
	const postsPerPage = 2;
	const numberOfPages = Math.ceil( posts.length/postsPerPage );

	Array.from({length: numberOfPages}).forEach((page, index) => {
		createPage({
			path: index === 0 ? '/blog/' : `/blog/${index + 1}`,
			component: slash(blogArchiveTemplate),
			context: {
				posts: slugs.slice(index * postsPerPage, index * postsPerPage + postsPerPage),
				numberOfPages,
				currentPage: index + 1
			}
		})
	})
	// We want to create a detailed page for each post node.
	// The path field stems from the original WordPress link
	// and we use it for the slug to preserve url structure.
	// The Post ID is prefixed with 'POST_'
	allWordpressPost.edges.forEach(edge => {
		createPage({
			path: `/blog/${edge.node.slug}/`,
			component: slash(postTemplate),
			context: {
				slug: edge.node.slug,
			}
		})
	})

	const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)
	allWordpressWpPortfolio.edges.forEach(edge => {
		createPage({
			path: `/portfolio/${edge.node.slug}/`,
			component: slash(portfolioTemplate),
			context: {
				slug: edge.node.slug,
			}
		})
	})
}
