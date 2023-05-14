const {skip, combineResolvers} = require('graphql-resolvers');
const { ForbiddenError } = require('apollo-server');


const isAuthenticated = (parent, args, {me}) => {
  if(me){
      return skip;
  }
  return new ForbiddenError('user is not authenticated');
}

const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args , { me : {role}}) => {
        return role === 'admin' ? skip : new ForbiddenError('user is not authz for this operation');
    }
);

module.exports = { isAuthenticated, isAdmin }