import { Router } from "express";
import passport from "passport";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { initClient } from "../db/mongo.js";
import { createUserData, hash } from "../middleware/auth/hash.js";
import { ExtractJwt } from "passport-jwt";

//Initialize MongoDB client and database:
const client = await initClient();
const db = client.db();

const registerRegularRoutes = (app) => {
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!user) {
        return res.status(401).json({ error: "Geen gebruiker gevonden" });
      }
      if (user) {
        const givenPassword = hash(user, req.body.password);
        if (givenPassword !== user.password) {
          return res
            .status(401)
            .json({ error: "Ongeldige gebruiker of wachtwoord" });
        }
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60,
      });

      delete user.password;
      delete user.salt;
      delete user.saltParam;
      return res.json({ token, ...user });
    })(req, res, next);
  });

  app.post("/register", async (req, res) => {
    const { username, password, voornaam, familienaam, email, gsm } = req.body;
    try {
      // Check if the username already exists
      const existingUser = await db.collection("users").findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Gebruikersnaam bestaat al." });
      }

      // Create a new user
      const newUser = createUserData({
        username,
        password,
        voornaam,
        familienaam,
        email,
        gsm,
      });

      // Insert the user into the database
      await db.collection("users").insertOne(newUser);

      // Generate a new token for the registered user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60,
      });

      delete newUser.password;
      delete newUser.salt;
      delete newUser.saltParam;
      res.json({ token, ...newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

const registerAdminRoutes = (app) => {
  const adminRouter = Router();

  adminRouter.use(
    passport.authenticate("jwt", { session: false, failWithError: true })
  );

  adminRouter.get("/houses", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    console.log(userId);

    const houses = await db
      .collection("houses")
      .find({ creator: userId })
      .toArray();
    res.json(houses);
  });

  adminRouter.post("/houses", async (req, res) => {
    const house = {
      ...req.body,
    };
    await db.collection("houses").insertOne(house);

    res.json(house);
  });

  adminRouter.patch("/houses/:id", async (req, res) => {
    const id = req.params.id;
    const house = await db.collection("houses").findOne({
      _id: ObjectId(id),
    });

    if (house) {
      const { _id, ...data } = req.body;
      const newData = { ...house, ...data };
      await db.collection("houses").replaceOne({ _id: ObjectId(id) }, newData);

      res.json(newData);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
  adminRouter.patch("/offices/:id", async (req, res) => {
    const id = req.params.id;
    const office = await db.collection("offices").findOne({
      _id: ObjectId(id),
    });

    if (office) {
      const { _id, ...data } = req.body;
      const newData = { ...office, ...data };
      await db.collection("offices").replaceOne({ _id: ObjectId(id) }, newData);

      res.json(newData);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  adminRouter.get("/houses/:id", async (req, res) => {
    const id = req.params.id;
    const house = await db.collection("houses").findOne({
      _id: ObjectId(id),
    });

    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  adminRouter.delete("/houses/:id", async (req, res) => {
    const id = req.params.id;

    await db.collection("houses").deleteOne({
      _id: ObjectId(id),
    });

    res.json({});
  });

  app.use(adminRouter);
};

const registerRoutes = async (app) => {
  registerRegularRoutes(app);

  registerAdminRoutes(app);

  //// Custom error handler middleware to handle JWT authentication errors
  app.use((err, req, res, next) => {
    if (err.name === "AuthenticationError") {
      res.status(401).json({ error: "Token expired" });
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

export { registerRoutes };
