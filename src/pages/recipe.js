import { graphql } from 'gatsby'
import React from 'react'

const pageTemplate = props => {

 const data = {
	  nodeFood:  props.pageContext.data
  }

  console.log(data);


  return (
      <h2>{data.nodeFood.title}</h2>
    )}


export default pageTemplate 
/*
export const query = graphql`
query MyQuery($nid: string) {
  Drupal {
       nodeRecipe(id: { eq: $nid } ) {
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




`


*/
