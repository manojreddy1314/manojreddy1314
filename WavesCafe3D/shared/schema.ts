import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, json, varchar, primaryKey, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("customer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Menu Category enum
export const menuCategoryEnum = pgEnum("menu_category", [
  "tea", 
  "sandwiches", 
  "burgers", 
  "drinks", 
  "softdrinks"
]);

// Menu Item model
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  image: text("image").notNull(),
  category: menuCategoryEnum("category").notNull(),
  available: boolean("available").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Location model
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  hours: text("hours").notNull(),
  phone: text("phone").notNull(),
  imageUrl: text("image_url").notNull(),
  location: json("location").notNull(), // Stores lat and lng as a JSON object
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reservation model
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  locationId: integer("location_id").references(() => locations.id),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  partySize: integer("party_size").notNull(),
  status: text("status").default("pending").notNull(),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [reservations.locationId],
    references: [locations.id],
  }),
}));

// Review model
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

// Add user relations after both reservations and reviews have been defined
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  reviews: many(reviews),
}));

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Franchise inquiries
export const franchiseInquiries = pgTable("franchise_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).pick({
  name: true,
  description: true,
  price: true,
  image: true,
  category: true,
  available: true,
  featured: true,
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
  address: true,
  hours: true,
  phone: true,
  imageUrl: true,
  location: true,
});

export const insertReservationSchema = createInsertSchema(reservations).pick({
  userId: true,
  locationId: true,
  date: true,
  time: true,
  partySize: true,
  specialRequests: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  rating: true,
  comment: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertFranchiseInquirySchema = createInsertSchema(franchiseInquiries).pick({
  name: true,
  email: true,
  phone: true,
  location: true,
  message: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertFranchiseInquiry = z.infer<typeof insertFranchiseInquirySchema>;
export type FranchiseInquiry = typeof franchiseInquiries.$inferSelect;
