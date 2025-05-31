import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api, internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/lemon-squeezy-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString  = await request.text();
    console.log("🚀 Lemon Squeezy webhook endpoint hit!")
    const signature = request.headers.get("X-Signature");
    if(!signature) {
      throw new Error("X-Signature header is missing");
    }
    try {
      const payload = await ctx.runAction(internal.lemonSqeezy.verifyWebhook,{
        payload: payloadString,
        signature
      })

      if(payload.meta.event_name == "order_created"){
        const {data} = payload;
        const {success} = await ctx.runMutation(api.users.upgradeToPro,{
          email: data.attributes.user_email,
          lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
          lemonSqueezyOrderId: data.id,
          amount: data.attributes.total
        })

        if(!success) {
          console.error("Failed to upgrade user to Pro");
          return new Response("Failed to upgrade user to Pro", { status: 500 });
        };
      }


      return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return new Response("Error processing webhook", { status: 500 });
      
    }


  }
  ),
}),

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    console.log("🚀 Webhook endpoint hit!");
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is not set");
      throw new Error("CLERK_WEBHOOK_SECRET is not set");
    }

    const svix_id = request.headers.get("svix-id");
    const signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");
    
    if (!svix_id || !signature || !svix_timestamp) {
      throw new Error("Missing required headers");
    }

    // Get the raw body as text instead of parsing as JSON
    const body = await request.text();

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;
    // Add this before verification for debugging
console.log("Webhook Secret:", webhookSecret ? "Present" : "Missing");
console.log("Headers:", { svix_id, signature, svix_timestamp });
console.log("Body length:", body.length);
console.log("Body preview:", body.substring(0, 100));


    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-signature": signature,
        "svix-timestamp": svix_timestamp,
      }) as WebhookEvent; 
    } catch (error) {
      console.error("Webhook verification failed:", error);
      throw new Error("Invalid webhook signature");
    }

    const eventType = evt.type;
    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses[0]?.email_address;
      const name = `${first_name || ''} ${last_name || ''}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.error("Error syncing user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully");
  }),
});

export default http;
