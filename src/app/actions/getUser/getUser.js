import { db } from "@/lib/db";

export default async function getUser(userId) {
  let connection;
  try {
    connection = await db.getConnection();
    const [userInfo] = await connection.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );

    const user = userInfo[0];

    if (!user) {
      return { error: "user not found", success: false };
    }

    return user;
  } catch (error) {
    return { error: error, success: false };
  } finally {
    if (connection) {
      connection.end();
    }
  }
}
