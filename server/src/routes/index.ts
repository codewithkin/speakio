import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

// Create a new Express router
const router = Router();

// Create a new Prisma client
const prisma = new PrismaClient();

// Define a route to get all recordings
router.get("/recording", async (req: Request, res: Response) => {
  // Find all recordings
  const recordings = await prisma.recording.findMany({
    include: {
      user: true,
    },
  });

  // Return the list of recordings as JSON
  res.json(recordings);
});

// Define a route to get a single recording by ID
router.get("/recording/:id", async (req: Request, res: Response) => {
  // Get the ID from the request parameters
  const id = req.params.id;

  // Find the recording with the given ID
  const recording = await prisma.recording.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  // If the recording is not found, return a 404 error
  if (!recording) {
    res.status(404).send({ error: "Recording not found" });
    return;
  }

  // Return the recording as JSON
  res.json(recording);
});

// Define a route to create a new recording
router.post("/recording", async (req: Request, res: Response) => {
  // Get the name, body, userId, and siteId from the request body
  const { name, body, userId, site } = req.body;

  // Create a new recording with the given data
  const recording = await prisma.recording.create({
    data: {
      name,
      body,
      userId,
      site,
    },
    include: {
      user: true,
    },
  });

  // Return the new recording as JSON
  res.json(recording);
});

// Define a route to update an existing recording
router.put("/recording/:id", async (req: Request, res: Response) => {
  // Get the ID from the request parameters
  const id = req.params.id;

  // Get the name, body, userId, and site from the request body
  const { name, body, userId, site } = req.body;

  // Update the recording with the given ID and data
  const recording = await prisma.recording.update({
    where: { id },
    data: {
      name,
      body,
      userId,
      site,
    },
    include: {
      user: true,
    },
  });

  // Return the updated recording as JSON
  res.json(recording);
});

// Define a route to delete a recording by ID
router.delete("/recording/:id", async (req: Request, res: Response) => {
  // Get the ID from the request parameters
  const id = req.params.id;

  // Delete the recording with the given ID
  await prisma.recording.delete({ where: { id } });

  // Return an empty 204 response
  res.status(204).send({});
});

// Export the router
export default router;

