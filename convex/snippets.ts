import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      userName: user.name,
      title: args.title,
      language: args.language,
      code: args.code,
    });
    return snippetId;
  },
});

export const getSnippet = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false; // User is not authenticated, cannot star snippets
    }
    const star = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();
    return !!star;
  },
});

export const getSnippetById = query({
    args: {
        snippetId: v.id("snippets"),
    },
    handler : async (ctx , args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) {
        throw new Error("Snippet not found");
        }
        return snippet;
    }
})

export const getComments = query({
    args: {
        snippetId: v.id("snippets"),
    },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("snippetComments")
            .withIndex("bySnippetId")
            .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
            .order("desc")
            .collect();
        return comments;
    }
})

export const addComment = mutation({
    args: {
        snippetId: v.id("snippets"),
        content: v.string(),
    },
    handler: async(ctx , args) =>{
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("byUserId")
            .filter((q) => q.eq(q.field("userId"), identity.subject))
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        const comment = await ctx.db.insert("snippetComments", {
            snippetId: args.snippetId,
            comment: args.content,
            userId: identity.subject,
            userName: user.name,
        });
        return comment;

    }
})


export const deleteComment = mutation({
    args: {
        commentId: v.id("snippetComments"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const comment = await ctx.db.get(args.commentId);
        if (!comment) throw new Error("Comment not found");

        if (comment.userId !== identity.subject) {
            throw new Error("User is not authorized to delete this comment");
        }

        await ctx.db.delete(args.commentId);
    }
})

export const getSnippetStarCount = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const stars = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();
    return stars.length;
  },
});

export const deleteSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new Error("Snippet not found");

    if (snippet.userId !== identity.subject) {
      throw new Error("User is not authorized to delete this snippet");
    }

    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    const stars = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  },
});

export const starSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User is not Authorized");
    }
    const existing = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .collect();

    if (existing.length > 0) {
      await ctx.db.delete(existing[0]._id);
    } else {
      await ctx.db.insert("stars", {
        userId: identity.subject,
        snippetId: args.snippetId,
      });
    }
  },
});


export const getStarredSnippets = query({
  handler: async (ctx) => { 
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User is not Authorized");
    }

    const stars = await ctx.db
      .query("stars")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

      const snippets = await Promise.all(stars.map((star) => ctx.db.get(star.snippetId)));

      return snippets.filter((snippet) => snippet !== null);
  }
})
