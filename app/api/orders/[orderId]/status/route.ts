// app/api/orders/[id]/status/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id)
      .select("paymentStatus orderStatus paymentMetadata mpesaDetails");

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        _id: order._id,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        paymentMetadata: order.paymentMetadata,
        mpesaDetails: order.mpesaDetails,
      },
    });
  } catch (error: any) {
    console.error("Error checking order status:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to check order status" },
      { status: 500 }
    );
  }
}