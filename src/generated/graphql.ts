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
  fileUsage?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  id: Scalars['ID'];
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

export type AuthorGraphType = {
  __typename?: 'AuthorGraphType';
  articles: Array<ArticleGraphType>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type CategoryGraphType = {
  __typename?: 'CategoryGraphType';
  articles: Array<ArticleGraphType>;
  category: Scalars['String'];
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<ArticleGraphType>;
  authors: Array<AuthorGraphType>;
  categories: Array<CategoryGraphType>;
};

export type DashboardPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardPostsQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'ArticleGraphType', id: string, title: string, teaser?: string | null, filesByUsage: Array<{ __typename?: 'ArticleFileGraphType', url: string }> }> };

export const DashboardPostsDocument = gql`
    query DashboardPosts {
  articles {
    id
    title
    teaser
    filesByUsage(usage: "thumbnail") {
      url
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DashboardPostsGQL extends Apollo.Query<DashboardPostsQuery, DashboardPostsQueryVariables> {
    document = DashboardPostsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }