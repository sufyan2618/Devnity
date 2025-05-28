import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecution = mutation({
    args: {
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),

    },
    handler: async(ctx, args)=> {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db.query("users")
        .withIndex("byUserId")
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();

        if(!user?.isPro && args.language === "javascript") {
            throw new Error("Free users can only execute JavaScript and python code.");
        }
        await ctx.db.insert("codeExecutions", {
            ...args,
            userId: identity.subject,
        });
    },
})