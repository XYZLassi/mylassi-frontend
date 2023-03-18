import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date with time (isoformat) */
  DateTime: any;
};

export type ArticleContentGraphType = {
  __typename?: 'ArticleContentGraphType';
  contentType: Scalars['String'];
  header: Scalars['String'];
  id: Scalars['Int'];
  position: Scalars['Int'];
};

export type ArticleFileGraphType = {
  __typename?: 'ArticleFileGraphType';
  articleFileId: Scalars['Int'];
  fileId: Scalars['String'];
  fileUsage?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  imageHeight?: Maybe<Scalars['Int']>;
  imageWidth?: Maybe<Scalars['Int']>;
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type ArticleGraphType = {
  __typename?: 'ArticleGraphType';
  author: AuthorGraphType;
  categories: Array<CategoryGraphType>;
  contents: Array<ArticleContentGraphType>;
  files: Array<ArticleFileGraphType>;
  filesByUsage: Array<ArticleFileGraphType>;
  id: Scalars['Int'];
  teaser?: Maybe<Scalars['String']>;
  timeCreated: Scalars['DateTime'];
  title: Scalars['String'];
};


export type ArticleGraphTypeFilesByUsageArgs = {
  usage: Scalars['String'];
};

export type ArticleGraphTypePaginationResult = {
  __typename?: 'ArticleGraphTypePaginationResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<ArticleGraphType>;
  length: Scalars['Int'];
  pageSize: Scalars['Int'];
};

export type AuthorGraphType = {
  __typename?: 'AuthorGraphType';
  articles: Array<ArticleGraphType>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type CategoryGraphType = {
  __typename?: 'CategoryGraphType';
  /** @deprecated It will be remove or changed in future update */
  articles: Array<ArticleGraphType>;
  category: Scalars['String'];
  id: Scalars['ID'];
  uniqueName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  articleById?: Maybe<ArticleGraphType>;
  articles: ArticleGraphTypePaginationResult;
  authors: Array<AuthorGraphType>;
  categories: Array<CategoryGraphType>;
  categoryById?: Maybe<CategoryGraphType>;
  categoryByUniqueName?: Maybe<CategoryGraphType>;
};


export type QueryArticleByIdArgs = {
  article: Scalars['Int'];
};


export type QueryArticlesArgs = {
  category?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  size?: Scalars['Int'];
};


export type QueryCategoryByIdArgs = {
  category: Scalars['Int'];
};


export type QueryCategoryByUniqueNameArgs = {
  category: Scalars['String'];
};

export type ArticleInfoFragmentFragment = { __typename?: 'ArticleGraphType', id: number, title: string, teaser?: string | null, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', fileId: string }> };

export type ArticleFragmentFragment = { __typename?: 'ArticleGraphType', id: number, title: string, teaser?: string | null, author: { __typename?: 'AuthorGraphType', username: string }, contents: Array<{ __typename?: 'ArticleContentGraphType', position: number, contentType: string, header: string }>, files: Array<{ __typename?: 'ArticleFileGraphType', fileId: string, url: string }>, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', fileId: string }> };

export type LoadArticleQueryVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type LoadArticleQuery = { __typename?: 'Query', article?: { __typename?: 'ArticleGraphType', id: number, title: string, teaser?: string | null, author: { __typename?: 'AuthorGraphType', username: string }, contents: Array<{ __typename?: 'ArticleContentGraphType', position: number, contentType: string, header: string }>, files: Array<{ __typename?: 'ArticleFileGraphType', fileId: string, url: string }>, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', fileId: string }> } | null };

export type GetArticlesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleGraphTypePaginationResult', cursor?: string | null, length: number, items: Array<{ __typename?: 'ArticleGraphType', id: number, title: string, teaser?: string | null, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', fileId: string }> }> } };

export const ArticleInfoFragmentFragmentDoc = gql`
    fragment ArticleInfoFragment on ArticleGraphType {
  id
  title
  teaser
  thumbnails: filesByUsage(usage: "thumbnail") {
    fileId
  }
}
    `;
export const ArticleFragmentFragmentDoc = gql`
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
    ${ArticleInfoFragmentFragmentDoc}`;
export const LoadArticleDocument = gql`
    query LoadArticle($articleId: Int!) {
  article: articleById(article: $articleId) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LoadArticleGQL extends Apollo.Query<LoadArticleQuery, LoadArticleQueryVariables> {
    document = LoadArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetArticlesDocument = gql`
    query GetArticles($cursor: String, $category: String) {
  articles(category: $category, cursor: $cursor) {
    items {
      ...ArticleInfoFragment
    }
    cursor
    length
  }
}
    ${ArticleInfoFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticlesGQL extends Apollo.Query<GetArticlesQuery, GetArticlesQueryVariables> {
    document = GetArticlesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }