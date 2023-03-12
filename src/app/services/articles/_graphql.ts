import {graphql} from "apollo-angular";

export const ArticleFragment = graphql`
  fragment ArticleFragment on ArticleGraphType {
    id
    title
    teaser

    author {
      username
    }

    contents {
      position
      contentType
      header
    }

    files {
      fileId
      url
    }
  }
`;

export const LoadArticleQuery = graphql`
  ${ArticleFragment}
  query LoadArticle($articleId : Int!){
    article:articleById(article: $articleId){
      ...ArticleFragment
    }
  }`
