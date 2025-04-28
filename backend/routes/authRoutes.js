// routes/authRoutes.js
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "gizliJWTanahtarin";

// Kullanıcı Girişi
router.post("/login", async (req, res) => {
    try {
        const { tckn, password } = req.body;
        const user = await User.findOne({ tckn });

        if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Şifre yanlış" });

        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Giriş başarılı", token, role: user.role, name: user.name });
    } catch (error) {
        console.error("Giriş hatası:", error);
        res.status(500).json({ error: "Sunucu hatası" });
    }
});

// Kullanıcı Kaydı
router.post("/register", async (req, res) => {
    try {
        const { tckn, name, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            tckn,
            name,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
    } catch (error) {
        console.error("Kayıt hatası:", error);
        res.status(500).json({ error: "Kayıt yapılamadı" });
    }
});

export default router;
