import { ApolloCache, ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4ormvc80w3501xs54qdgmxm/master',
    cache: new InMemoryCache()
})