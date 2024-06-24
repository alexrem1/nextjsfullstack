import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
