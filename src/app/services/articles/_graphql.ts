import {graphql} from "apollo-angular";

export const ArticleInfoFragment = graphql`
  fragment ArticleInfoFragment on ArticleGraphType{
    id
    title
    teaser

    thumbnails:filesByUsage(usage: "thumbnail"){
      fileId
    }
  }
`;

export const ArticleFragment = graphql`
  ${ArticleInfoFragment}

  fragment ArticleFragment on ArticleGraphType {
    ...ArticleInfoFragment

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

export const GetArticlesQuery = graphql`
    query GetArticles($cursor:String, $category:String){
        ${ArticleInfoFragment}

        articles(category: $category,cursor: $cursor){
            items {
                ...ArticleInfoFragment,
            }
            cursor
            length
        }
    }`;
