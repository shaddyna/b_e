// // app/api/chat/users/route.ts
// import { NextResponse } from "next/server";
// import { getSession } from "@/lib/auth";
// import {dbConnect } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function GET() {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return NextResponse.json(
//         { error: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     await dbConnect ();

//     // Get all users except current user
//     const users = await User.find({
//       _id: { $ne: session._id }
//     })
//       .select("name email role")
//       .limit(50);

//     return NextResponse.json({ users });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/chat/users/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get current user's role
    const currentUser = await User.findById(session._id).select("role");
    
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let query: any = { _id: { $ne: session._id } };

    // If current user is a customer, only show admins
    if (currentUser.role === "customer") {
      query.role = "admin";
    }
    // If admin, show all users (no additional filter)

    const users = await User.find(query)
      .select("name email role")
      .limit(50);

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}