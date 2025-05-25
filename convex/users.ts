import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
    args:{
        userId: v.string(),
        email: v.string(),
        name: v.string(),


    },
    handler: async (ctx, args) => {
        const existingUser  = await ctx.db.query("users").filter(
            q=> q.eq(q.field("userId"), args.userId)
        ).first();
        if(!existingUser)
        {
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.name,
                isPro: false,
            });
        }
    }

})

export const getUser = query({
    args:{
        userId: v.string(),
    },
    handler: async(ctx, args) => {
        if(!args.userId) {
            throw new Error("User ID is required");
        }
        const user  = await ctx.db.query("users").withIndex("byUserId").filter(
            (q) => q.eq(q.field("userId"), args.userId)
        ).first();
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }
})