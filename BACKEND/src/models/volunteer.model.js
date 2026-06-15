import mongoose from "mongoose";
const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    interests:{
        type: [String], 
    },
    
    registeredAt: {
        type: Date,
        default: Date.now
    }
});
const volunteerModel = mongoose.model("Volunteer", volunteerSchema);
export default volunteerModel;