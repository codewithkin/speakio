import { Router, type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Create a new Express router
const router = Router();

// Create a new Prisma client
const prisma = new PrismaClient();

// Define a route to sign up a new user
router.post("/signup", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });
    res.json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
});

// Define a route to log in a user
router.post("/login", async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ message: "Login successful", userId: user.id });
});

// Define a route to get all recordings
router.get("/recording", async (req: Request, res: Response) => {
  const recordings = await prisma.recording.findMany({
    include: {
      user: true,
    },
  });
  res.json(recordings);
});

// Define a route to get a single recording by ID
router.get("/recording/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const recording = await prisma.recording.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });

  if (!recording) {
    res.status(404).send({ error: "Recording not found" });
    return;
  }

  res.json(recording);
});

// Define a route to create a new recording
router.post("/recording", async (req: Request, res: Response) => {
  const { body, userId, site } = req.body;

  const recording = await prisma.recording.create({
    data: {
      body,
      userId,
      site,
    },
    include: {
      user: true,
    },
  });

  res.json(recording);
});

// Define a route to update an existing recording
router.put("/recording/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, body, userId, site } = req.body;

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

  res.json(recording);
});

// Define a route to delete a recording by ID
router.delete("/recording/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  await prisma.recording.delete({ where: { id } });

  res.status(204).send({});
});

// Export the router
export default router;

