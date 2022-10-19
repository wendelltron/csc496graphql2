const path = require('path');

// exports.modifyWebpackConfig = ({ config, stage }) => {
//   config.devServer = {
//       hot: false, 
//       inline: false,
//   }
//   return config;
// };  



// Create a slug for each recipe and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  
  const { createNodeField } = actions
  const slug = (node.path && node.path.alias) ? node.path.alias : '/node/' + node.drupal_id; 
  createNodeField({
    node,
    name: `slug`,
    value: slug,
  })
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // const articleTemplate = path.resolve(`src/templates/node/article/index.js`)
    const pageTemplate = path.resolve(`src/pages/recipe.js`)
    //const horseTemplate = path.resolve(`src/pages/catalogpage.js`)
    // const categoryTemplate = path.resolve(`src/templates/taxonomy/tag/index.js`)

    // const paragraphVimeo = path.resolve(`src/templates/paragraph/paragraph__vimeo_video/index.js`)
    // page building queries
    // field_ragozin_sheet throws graphql errors
    resolve(
      graphql(
        `{
          query MyQuery {
            nodeRecipes(first: 100) {
              edges {
                node {
                  changed
                  id
                  cookingTime
                  created
                  path
                  status
                  title
                }
              }
            }
          }
`
      ).then(result => {
        // shows during build/dev
        //console.log("RESULT");
        //console.log(result);
        if (result.errors) {
          reject(result.errors)
        }
       
        const pages = result.data.nodeRecipes.edges; 

        
        //result.data.allNodeHorse.edges.forEach(({ node }, index) => {
        pages.forEach(({ node }, index) => {
          //console.log(node);
          const page_path = (node.path && node.path.alias) ? node.path.alias : '/node/' + node.drupal_id; 
         

          createPage({
            path: `${page_path}`,
          
            component: pageTemplate,
            context: {
              nid: node.id,  
              prev: prev,
              next: next,
              data: node, 
            },
          })
        })
      })
    )
  });
}
