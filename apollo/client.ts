import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

let myApolloClient;

const createIsomorphicLink = () => {
    if (typeof window === 'undefined') {
        const { SchemaLink } = require('apollo-link-schema');
        const { schema } = require('./schema');
        return new SchemaLink({ schema });
    } else {
        const { HttpLink } = require('apollo-link-http');
        return new HttpLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        });
    }
}

const graphQLErrorHandler = ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        console.log(graphQLErrors);
    }
    if (networkError) {
        console.log(networkError);
    }
}

const createApolloClient = () => {
    return new ApolloClient({
        link: createIsomorphicLink(),
        cache: new InMemoryCache(),
    });
}

export const initializeApollo = (initialState = null) => {
    const _apolloClient = myApolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === 'undefined') return _apolloClient;

    if (!myApolloClient) myApolloClient = _apolloClient;

    return _apolloClient;
}

export const useApollo = (initalState) => {
    const store = useMemo(() => initializeApollo(initalState), [initalState]);

    return store;
}