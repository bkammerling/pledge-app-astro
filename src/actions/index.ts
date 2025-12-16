import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

// SWITCHED TO API/ACTIONS - see src/pages/api/postSignee.ts
export const server = {
  // action declarations
  postSignee: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    handler: async (input) => {
      // add signee to database
      // increment signee count in pledge
      // return success or error message
      return `Hello, ${input.name}, email: ${input.email}!`
    }
  })

}
