const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const { hashPassword, comparePassword } = require('../utils/authHelper');
const UserResource = require('../resources/user.resource');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed = await hashPassword(password);
        const user = await prisma.user.create({
            data: { name, email, password: hashed }
        })

        const userResponse = UserResource.make(user);

        res.status(201).json({ 
            message: "User created successfully", 
            user: userResponse 
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

exports.login = async (req, res) => {
    res.status(200).json({ message: "Login successful" });
}

exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logout successful" });
}