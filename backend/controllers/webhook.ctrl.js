import User from '../models/user.model.js';
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if( !WEBHOOK_SECRET ){
        throw new Error("Missing Clerk webhook secret");
    }

    const payload = req.body.toString("utf8");
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({
            message: err.message || "Webhook verification failed"
        });
    }

    // console.log(evt.data)

    if (evt.type === "user.created") {
    const newUser = new User({
        clerkUserId: evt.data.id,
        username: evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_image_url,
    });

    await newUser.save();
    console.log("✅ New user saved:", newUser);
    }

    if (evt.type === "user.updated") {
      const updatedUser = await User.findOneAndUpdate(
        { clerkUserId: evt.data.id },
        {
          username: evt.data.username || evt.data.email_addresses[0].email_address,
          email: evt.data.email_addresses[0].email_address,
          img: evt.data.profile_image_url,
        },
        { new: true } // return updated doc
      );

      console.log("♻️ User updated:", updatedUser);
    }

    if (evt.type === "user.deleted") {
      const deletedUser = await User.findOneAndDelete({
        clerkUserId: evt.data.id,
      });

      console.log("🗑️ User deleted:", deletedUser);
    }


    return res.status(200).json({ message: "Success" });

}