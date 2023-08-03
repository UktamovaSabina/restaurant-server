import { makeExecutableSchema } from '@graphql-tools/schema';
import Admin from './admin/index';
import Restaurant from './restaurant/index';
import Food from './food/index';
import Order from './order/index';

export default makeExecutableSchema({
    typeDefs: [Admin.typeDefs, Restaurant.typeDefs, Food.typeDefs, Order.typeDefs],
    resolvers: [Admin.resolvers, Restaurant.resolvers, Food.resolvers, Order.resolvers]
})