import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { shema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;


  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const {query, variables} = req.body;
  const rez = await graphql({
          schema: shema,
          source: query,
          variableValues: variables,
          contextValue: {
            prisma: prisma,
            fastify: fastify,
          }
        });

        return rez;
      
    },
  });
};

export default plugin;
