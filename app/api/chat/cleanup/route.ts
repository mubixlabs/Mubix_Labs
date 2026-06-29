import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });
    }

    const snapshot = await adminDb
      .collection("chat_messages")
      .where("sessionId", "==", sessionId)
      .get();

    const batch = adminDb.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return NextResponse.json({ deleted: snapshot.size });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}