// import Profile from "@/models/Profile";
// import { connect } from "@/utils/connect";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     try {
//         await connect();

//         const {email, password} = await request.json();

//         const profile = await Profile.findOne({email})
        
//         if(profile && profile.email) {
//             return NextResponse.json({
//                 message: "Email already exist",
//                 status: 401
//             })
//         }

//         const newProfile = new Profile({
//             email: email,
//             password: password
//         });

//         await newProfile.save()

//         const response = NextResponse.json(
//             {
//                 message: "Profile successfully created",
//                 status: 200
//             }
//         )

//         response.cookies.set("user", newProfile._id)

//         return response

//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             message: "Internal Server Error",
//             status: 500
//         })
//     }
// }

// export async function PATCH(request: NextRequest) {
//     try {
//         await connect();

//         const { id, image, name, gender, age, genre, booksRead, favBook } = await request.json();

//         const updatedProfile = await Profile.findByIdAndUpdate(
//             id,
//             {
//                 image,
//                 name,
//                 gender,
//                 age,
//                 genre,
//                 booksRead,
//                 favBook
//             },
//             { new: true, runValidators: true }
//         );

//         if (!updatedProfile) {
//             return NextResponse.json({
//                 message: "Profile not found",
//                 status: 404
//             });
//         }

//         return NextResponse.json({
//             message: "Profile successfully updated",
//             status: 200,
//             data: updatedProfile
//         });

//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({
//             message: "Internal Server Error",
//             status: 500
//         });
//     }
// }
import Profile from "@/models/Profile";
import { connect } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", status: 400 },
                { status: 400 }
            );
        }

        const existingProfile = await Profile.findOne({ email: email.toLowerCase() });

        if (existingProfile) {
            return NextResponse.json(
                { message: "Email already exists", status: 409 },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newProfile = new Profile({
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newProfile.save();

        const token = jwt.sign({ userId: newProfile._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json(
            { message: "Profile successfully created", status: 201 },
            { status: 201 }
        );

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        console.error("Error creating profile:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connect();

        const { id, image, name, gender, age, genre, booksRead, favBook } = await request.json();

        if (!id) {
            return NextResponse.json(
                { message: "Profile ID is required", status: 400 },
                { status: 400 }
            );
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            id,
            { image, name, gender, age, genre, booksRead, favBook },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return NextResponse.json(
                { message: "Profile not found", status: 404 },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Profile successfully updated", status: 200, data: updatedProfile },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}

export async function signIn(request: NextRequest) {
    try {
        await connect();

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", status: 400 },
                { status: 400 }
            );
        }

        const profile = await Profile.findOne({ email: email.toLowerCase() });

        if (!profile) {
            return NextResponse.json(
                { message: "Invalid email or password", status: 401 },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, profile.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid email or password", status: 401 },
                { status: 401 }
            );
        }

        const token = jwt.sign({ userId: profile._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        const response = NextResponse.json(
            { message: "Sign in successful", status: 200 },
            { status: 200 }
        );

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error) {
        console.error("Error signing in:", error);
        return NextResponse.json(
            { message: "Internal Server Error", status: 500 },
            { status: 500 }
        );
    }
}