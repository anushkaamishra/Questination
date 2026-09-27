import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRating(req, res) {
    try {
        console.log("CREATE RATING BODY:", req.body);
        console.log("CREATE RATING USER:", req.user);  
        const userId = req.user.id;

        const {
            questId,
            sellerId,
            rating,
            reviewText
        } = req.body;

        // 1. Rating required hai
        if (!rating) {
            return res.status(400).json({
                message: "rating is required"
            });
        }

        // 2. Rating 1-5 ke beech honi chahiye
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "rating must be between 1 and 5"
            });
        }

        // 3. Exactly ONE target hona chahiye
        if ((questId && sellerId) || (!questId && !sellerId)) {
            return res.status(400).json({
                message: "provide either questId or sellerId"
            });
        }

        // 4. Quest rating
        if (questId) {
            const quest = await prisma.quests.findUnique({
                where: {
                    id: questId
                }
            });

            if (!quest) {
                return res.status(404).json({
                    message: "quest not found"
                });
            }
        }

        // 5. Seller rating
        if (sellerId) {
            const seller = await prisma.sellers.findUnique({
                where: {
                    id: sellerId
                }
            });

            if (!seller) {
                return res.status(404).json({
                    message: "seller not found"
                });
            }
        }

        // 6. Create rating
        const newRating = await prisma.ratings.create({
            data: {
                user_id: userId,
                quest_id: questId || null,
                seller_id: sellerId || null,
                rating: Number(rating),
                review_text: reviewText || null
            }
        });

        return res.status(201).json({
            message: "rating submitted successfully",
            rating: newRating
        });

    } catch (error) {
        console.error("Create rating error:", error);

        return res.status(500).json({
            message: "internal server error"
        });
    }
}
