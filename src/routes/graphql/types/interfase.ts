import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default interface GraphQLContext {
  prisma: PrismaClient;
  fastify: FastifyInstance;
}