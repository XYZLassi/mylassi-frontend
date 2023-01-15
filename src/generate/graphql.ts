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

export type AuthorGraphType = {
  __typename?: 'AuthorGraphType';
  id: Scalars['ID'];
  posts: Array<PostGraphType>;
  username: Scalars['String'];
};

export type PostGraphType = {
  __typename?: 'PostGraphType';
  author: AuthorGraphType;
  id: Scalars['ID'];
  teaser?: Maybe<Scalars['String']>;
  timeCreated: Scalars['DateTime'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authors: Array<AuthorGraphType>;
  posts: Array<PostGraphType>;
};

export type DashboardPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardPostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'PostGraphType', id: string, title: string, teaser?: string | null }> };

export const DashboardPostsDocument = gql`
    query DashboardPosts {
  posts {
    id
    title
    teaser
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