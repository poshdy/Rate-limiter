import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey().notNull(),
  username: varchar("user_name").notNull(),
});

export const posts = pgTable("posts", {
  postId: serial("postId").primaryKey().notNull(),
  content: varchar("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
});
