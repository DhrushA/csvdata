// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EnterpriseSurvey } = initSchema(schema);

export {
  EnterpriseSurvey
};