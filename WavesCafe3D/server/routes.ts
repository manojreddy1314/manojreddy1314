import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a test account for nodemailer
  let testAccount = await nodemailer.createTestAccount();

  // Create reusable transporter
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER || testAccount.user,
      pass: process.env.EMAIL_PASS || testAccount.pass,
    },
  } as nodemailer.TransportOptions);

  // API route for franchise inquiries
  app.post("/api/franchise-inquiry", async (req, res) => {
    try {
      const { name, email, phone, location, message } = req.body;
      
      // Send email
      let info = await transporter.sendMail({
        from: '"Waes Café Website" <website@waescafe.com>',
        to: "manojreddy5057@gmail.com",
        subject: "New Franchise Inquiry",
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Location: ${location}
          
          Message:
          ${message}
        `,
        html: `
          <h2>New Franchise Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      
      console.log("Franchise inquiry email sent: %s", info.messageId);
      
      // In development, show test URL
      if (testAccount.user === (transporter as any).options?.auth?.user) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      res.status(200).json({ success: true, message: "Inquiry submitted successfully" });
    } catch (error) {
      console.error("Error sending franchise inquiry:", error);
      res.status(500).json({ success: false, message: "Failed to submit inquiry" });
    }
  });
  
  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Send email
      let info = await transporter.sendMail({
        from: '"Waes Café Website" <website@waescafe.com>',
        to: "manojreddy5057@gmail.com",
        subject: `Contact Form: ${subject}`,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      
      console.log("Contact form email sent: %s", info.messageId);
      
      // In development, show test URL
      if (testAccount.user === (transporter as any).options?.auth?.user) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending contact form:", error);
      res.status(500).json({ success: false, message: "Failed to send message" });
    }
  });

  // Initialize data (for demo purposes - would normally be in a migration or seed script)
  const initializeData = async () => {
    try {
      // Check if menu items exist
      const existingMenuItems = await storage.getMenuItems();
      
      if (existingMenuItems.length === 0) {
        // Import menu items from data.ts
        const { menuItems } = await import('../client/src/lib/data.js');
        
        // Add menu items to database
        for (const item of menuItems) {
          await storage.createMenuItem(item);
        }
        console.log('Menu items initialized');
      }
      
      // Check if locations exist
      const existingLocations = await storage.getLocations();
      
      if (existingLocations.length === 0) {
        // Add café locations
        const cafeLocations = [
          {
            name: "Waes Café Whitefield",
            address: "100, Whitefield Main Road, Whitefield, Bangalore, Karnataka 560066",
            hours: "7:00 AM - 10:00 PM Daily",
            phone: "+91 80 4123 7890",
            imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            location: { lat: 12.9698, lng: 77.7500 }
          },
          {
            name: "Waes Café Yelahanka",
            address: "42, New Town, Yelahanka, Bangalore, Karnataka 560064",
            hours: "8:00 AM - 11:00 PM Daily",
            phone: "+91 80 4123 8901",
            imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FmZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            location: { lat: 13.1009, lng: 77.5912 }
          }
        ];
        
        for (const location of cafeLocations) {
          await storage.createLocation(location);
        }
        console.log('Locations initialized');
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };
  
  // Run initialization
  initializeData();

  // API routes for menu items
  app.get("/api/menu-items", async (req, res) => {
    try {
      const menuItems = await storage.getMenuItems();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ success: false, message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const menuItems = await storage.getMenuItemsByCategory(category);
      res.status(200).json(menuItems);
    } catch (error) {
      console.error(`Error fetching menu items for category ${req.params.category}:`, error);
      res.status(500).json({ success: false, message: "Failed to fetch menu items by category" });
    }
  });

  app.get("/api/menu-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const menuItem = await storage.getMenuItem(id);
      
      if (!menuItem) {
        return res.status(404).json({ success: false, message: "Menu item not found" });
      }
      
      res.status(200).json(menuItem);
    } catch (error) {
      console.error(`Error fetching menu item with id ${req.params.id}:`, error);
      res.status(500).json({ success: false, message: "Failed to fetch menu item" });
    }
  });

  // API routes for locations
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getLocations();
      res.status(200).json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch locations" });
    }
  });

  app.get("/api/locations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const location = await storage.getLocation(id);
      
      if (!location) {
        return res.status(404).json({ success: false, message: "Location not found" });
      }
      
      res.status(200).json(location);
    } catch (error) {
      console.error(`Error fetching location with id ${req.params.id}:`, error);
      res.status(500).json({ success: false, message: "Failed to fetch location" });
    }
  });

  // API routes for reservations
  app.post("/api/reservations", async (req, res) => {
    try {
      const reservation = await storage.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      res.status(500).json({ success: false, message: "Failed to create reservation" });
    }
  });

  app.get("/api/reservations", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const reservations = await storage.getReservations(userId);
      res.status(200).json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch reservations" });
    }
  });

  // API routes for reviews
  app.post("/api/reviews", async (req, res) => {
    try {
      const review = await storage.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ success: false, message: "Failed to submit review" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
