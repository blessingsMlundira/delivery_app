const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- In-memory "database" ----------------------------------------------
// This is only here so the prototype runs with zero setup.
// Replace with a real table/collection (Postgres, MongoDB, etc.) before
// you go further — nothing here persists across server restarts, and
// two users could theoretically race the same email in this naive check.
const users = [];
let nextId = 1;

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function toPublicUser(user) {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function signup(req, res) {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existing = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phone
  );
  if (existing) {
    return res
      .status(409)
      .json({ message: "An account with that email or phone already exists." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: nextId++,
    fullName,
    email,
    phone,
    passwordHash,
    role: "customer", // shops/riders would get their own roles later
    createdAt: new Date().toISOString(),
  };
  users.push(user);

  const token = signToken(user);
  return res.status(201).json({ token, user: toPublicUser(user) });
}

async function login(req, res) {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Email/phone and password are required." });
  }

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === identifier.toLowerCase() ||
      u.phone === identifier
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = signToken(user);
  return res.status(200).json({ token, user: toPublicUser(user) });
}

module.exports = { signup, login };
