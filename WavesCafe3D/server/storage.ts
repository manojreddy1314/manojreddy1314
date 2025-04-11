import { 
  users, type User, type InsertUser,
  menuItems, type MenuItem, type InsertMenuItem,
  locations, type Location, type InsertLocation,
  reservations, type Reservation, type InsertReservation,
  reviews, type Review, type InsertReview,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  franchiseInquiries, type FranchiseInquiry, type InsertFranchiseInquiry
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Modify the interface with all CRUD methods needed for our café website
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu Item methods
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem>;
  
  // Location methods
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Reservation methods
  getReservations(userId?: number): Promise<Reservation[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string): Promise<Reservation>;
  
  // Review methods
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Contact form methods
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Franchise inquiry methods
  createFranchiseInquiry(inquiry: InsertFranchiseInquiry): Promise<FranchiseInquiry>;
  getFranchiseInquiries(): Promise<FranchiseInquiry[]>;
  updateFranchiseInquiryStatus(id: number, status: string): Promise<FranchiseInquiry>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Menu Item methods
  async getMenuItems(): Promise<MenuItem[]> {
    return db.select().from(menuItems);
  }
  
  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    // We need to cast the category to the proper enum type
    return db.select().from(menuItems).where(
      eq(menuItems.category, category as any)
    );
  }
  
  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }
  
  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [menuItem] = await db
      .insert(menuItems)
      .values(item)
      .returning();
    return menuItem;
  }
  
  async updateMenuItem(id: number, item: Partial<InsertMenuItem>): Promise<MenuItem> {
    const [updatedItem] = await db
      .update(menuItems)
      .set(item)
      .where(eq(menuItems.id, id))
      .returning();
    return updatedItem;
  }
  
  // Location methods
  async getLocations(): Promise<Location[]> {
    return db.select().from(locations);
  }
  
  async getLocation(id: number): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location;
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const [newLocation] = await db
      .insert(locations)
      .values(location)
      .returning();
    return newLocation;
  }
  
  // Reservation methods
  async getReservations(userId?: number): Promise<Reservation[]> {
    if (userId) {
      return db.select().from(reservations).where(eq(reservations.userId, userId));
    }
    return db.select().from(reservations);
  }
  
  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }
  
  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [newReservation] = await db
      .insert(reservations)
      .values(reservation)
      .returning();
    return newReservation;
  }
  
  async updateReservationStatus(id: number, status: string): Promise<Reservation> {
    const [updatedReservation] = await db
      .update(reservations)
      .set({ status })
      .where(eq(reservations.id, id))
      .returning();
    return updatedReservation;
  }
  
  // Review methods
  async getReviews(): Promise<Review[]> {
    return db.select().from(reviews);
  }
  
  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values(review)
      .returning();
    return newReview;
  }
  
  // Contact form methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }
  
  // Franchise inquiry methods
  async createFranchiseInquiry(inquiry: InsertFranchiseInquiry): Promise<FranchiseInquiry> {
    const [newInquiry] = await db
      .insert(franchiseInquiries)
      .values(inquiry)
      .returning();
    return newInquiry;
  }
  
  async getFranchiseInquiries(): Promise<FranchiseInquiry[]> {
    return db.select().from(franchiseInquiries);
  }
  
  async updateFranchiseInquiryStatus(id: number, status: string): Promise<FranchiseInquiry> {
    const [updatedInquiry] = await db
      .update(franchiseInquiries)
      .set({ status })
      .where(eq(franchiseInquiries.id, id))
      .returning();
    return updatedInquiry;
  }
}

export const storage = new DatabaseStorage();
