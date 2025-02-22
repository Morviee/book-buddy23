import Profile from "@/models/Profile";
import { connect } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        // Parse the request body
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", status: 400 },
                { status: 400 }
            );
        }

        // Find the user by email
        const profile = await Profile.findOne({ email: email.toLowerCase() });

        // If the user doesn't exist, return an error
        if (!profile) {
            return NextResponse.json(
                { message: "Invalid email or password", status: 401 },
                { status: 401 }
            );
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, profile.password);

        // If the password is invalid, return an error
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password", status: 401 },
                { status: 401 }
            );
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: profile._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        // Create a response with a success message
        const response = NextResponse.json(
            { message: "Sign in successful", status: 200 },
            { status: 200 }
        );

        // Set the JWT token in an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure cookies are only sent over HTTPS in production
            sameSite: "strict",
            maxAge: 3600, // 1 hour in seconds
            path: "/", // Cookie is accessible across the entire site
        });

        return response;
    } catch (error) {
        console.error("Error signing in:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}