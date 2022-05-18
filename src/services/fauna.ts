import { Client, query } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET,
});

export const q = query;
