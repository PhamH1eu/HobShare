const functions = require("firebase-functions");
const neo4j = require("neo4j-driver");

const neo4jConfig = functions.config().neo4j;

const neo4jDriver = neo4j.driver(
  neo4jConfig.uri, // e.g., bolt://<NEO4J_HOST>:<PORT>
  neo4j.auth.basic(
    neo4jConfig.username, // Neo4j username
    neo4jConfig.password // Neo4j password
  )
);

module.exports = neo4jDriver;
