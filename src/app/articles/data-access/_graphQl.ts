import {graphql} from "apollo-angular";

const ArticleTeaserFragment = graphql`
  fragment ArticleInfoFragment on ArticleGraphType{
    id
    title
    teaser

    thumbnails:filesByUsage(usage: "thumbnail"){
      fileId
    }
  }
`;

const ArticleFragment = graphql`
  ${ArticleTeaserFragment}

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

const LoadArticleQuery = graphql`
  ${ArticleFragment}
  query LoadArticle($articleId : Int!){
    article:articleById(article: $articleId){
      ...ArticleFragment
    }
  }`

export const LoadArticlesQuery = graphql`
  query LoadArticles($cursor:String, $category:String){
    ${ArticleTeaserFragment}

    articles(category: $category,cursor: $cursor){
      items {
        ...ArticleInfoFragment,
      }
      cursor
      length
    }
  }`;
