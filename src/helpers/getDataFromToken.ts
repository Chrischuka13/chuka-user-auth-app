import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


const getDataFromToken = (request :NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken :any = jwt.verify(token, process.env.JWT_SECRET_KEY!)

    return decodedToken.id;
    
  } catch (error: unknown) {
  throw error instanceof Error
    ? error : new Error("Unknown error occurred");
}

}

export default getDataFromToken