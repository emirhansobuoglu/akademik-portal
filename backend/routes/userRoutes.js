import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Kullanıcı kaydet
router.post("/users", async (req, res) => {
    try {
        const { tckn, name, password, role } = req.body;

        if (!tckn || !name || !password) {
            return res.status(400).json({ error: "Eksik bilgi gönderildi." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const yeniKullanici = new User({
            tckn,
            name,
            password: hashedPassword,
            role,
        });

        await yeniKullanici.save();
        res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
    } catch (error) {
        console.error("Kullanıcı oluşturulamadı:", error);
        res.status(500).json({ error: "Kullanıcı kaydı sırasında hata oluştu." });
    }
});

export default router;
