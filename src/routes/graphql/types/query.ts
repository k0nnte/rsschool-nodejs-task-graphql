import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import {MemberType, MemberTypeId} from './MemberType.js'
import GraphQLContext from "./interfase.js";




export const rootQuety = new GraphQLObjectType({
    name: 'rootQuety',
    fields: {
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
            resolve: async(parent,args,context: GraphQLContext) => {
           try {
          const memberTypes = await context.prisma.memberType.findMany();
            return memberTypes;
        } catch (error) {
          console.error('Error in memberTypes resolver:', error);
          throw error;
        }
            }
        },
        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeId)}
            },
            resolve: async(parent, args: {id: "BASIC" | "BUSINESS"}, context: GraphQLContext ) => {
                
               return context.prisma.memberType.findUnique({where: {id: args.id}})
            }
        },
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User)))
        }
       
            
        
    }
})