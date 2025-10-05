import { defineDb, defineTable, column } from 'astro:db';

const Pledge = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    body: column.text(),
    imageSrc: column.text(),
    formintro: column.text(),
    signees: column.number(),
    target: column.number(),
  }
})

const Signee = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    pledgeId: column.number({ references: () => Pledge.columns.id }),
    dateSigned: column.date(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Pledge, Signee }
});
