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
  files: Array<ArticleFileGraphType>;
  filesByUsage: Array<ArticleFileGraphType>;
  id: Scalars['ID'];
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

export type GetArticlesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: { __typename?: 'ArticleGraphTypePaginationResult', cursor?: string | null, items: Array<{ __typename?: 'ArticleGraphType', id: string, title: string, teaser?: string | null, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', fileId: string }> }> } };

export type LoadArticleQueryVariables = Exact<{
  articleId: Scalars['Int'];
}>;


export type LoadArticleQuery = { __typename?: 'Query', article?: { __typename?: 'ArticleGraphType', title: string, teaser?: string | null, thumbnails: Array<{ __typename?: 'ArticleFileGraphType', url: string }> } | null };

export const GetArticlesDocument = gql`
    query GetArticles($cursor: String, $category: String) {
  articles(category: $category, cursor: $cursor) {
    items {
      id
      title
      teaser
      thumbnails: filesByUsage(usage: "thumbnail") {
        fileId
      }
    }
    cursor
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticlesGQL extends Apollo.Query<GetArticlesQuery, GetArticlesQueryVariables> {
    document = GetArticlesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoadArticleDocument = gql`
    query LoadArticle($articleId: Int!) {
  article: articleById(article: $articleId) {
    title
    teaser
    thumbnails: filesByUsage(usage: "thumbnail") {
      url
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoadArticleGQL extends Apollo.Query<LoadArticleQuery, LoadArticleQueryVariables> {
    document = LoadArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }