import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { schema as generatedSqlSchema } from './schema.sql';


// Add a global authorization rule
const sqlSchema = generatedSqlSchema
  .authorization(allow => allow.publicApiKey())
  .renameModels(() => [
    ['customer', 'Customer'],
    ['opportunity', 'Opportunity']
  ])
  .setRelationships((models) => [
    models.Customer.relationships({
      opportunities: a.hasMany("Opportunity", "customerid"),
    }),
    models.Opportunity.relationships({
      customer: a.belongsTo("Customer", "customerid")
    })
  ]);


// const sqlSchema = generatedSqlSchema.setAuthorization((models) => [
//   // Model-level authorization rules
//   models.event.authorization((allow) => [allow.publicApiKey()]),
//   // Field-level authorization rules
//   models.event.fields.id.authorization(allow => [allow.publicApiKey(), allow.guest()]),
//   models.event.fields.created_at.authorization(allow => [allow.publicApiKey(), allow.guest()])
// ]);

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

const combinedSchema = a.combine([schema, sqlSchema]);

// export type Schema = ClientSchema<typeof schema>;
export type Schema = ClientSchema<typeof combinedSchema>;

export const data = defineData({
  schema: combinedSchema,
  // schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
