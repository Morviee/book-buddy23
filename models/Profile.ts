import mongoose, { Document, Schema, model } from "mongoose";


export interface IProfile extends Document {
    email: string, 
    password: string,
  image: string;
  name: string;
  gender: string;
  age: number;
  genre: string;
  booksRead: number;
  favBook: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProfileSchema: Schema = new Schema<IProfile>(
  {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    image: {
      type: String,
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU",
    },
    name: {
      type: String,
      
    },
    gender: {
      type: String,
      
    },
    age: {
      type: Number,
      
    },
    genre: {
      type: String,
      
    },
    booksRead: {
      type: Number,
      
    },
    favBook: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile || model<IProfile>("Profile", ProfileSchema);
