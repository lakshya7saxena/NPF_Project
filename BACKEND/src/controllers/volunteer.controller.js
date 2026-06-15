import volunteerModel from "../models/volunteer.model.js";
import jwt from "jsonwebtoken"
const registerVolunteer = async (req, res) => {
    const { name, email, phone, age, interests } = req.body
    const isVolunteerAlreadyExists = await volunteerModel.findOne({ email })
    if (isVolunteerAlreadyExists) {
        return res.status(409).json({ message: "Volunteer with this email already exists" })
    }
    const newVolunteer = await volunteerModel.create({ name, email, phone, age, interests })
    const token = jwt.sign({
        id: newVolunteer._id,
        role: "volunteer"
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(201).json({
        message: "Volunteer registered successfully",
        newVolunteer
    })
}
export default { registerVolunteer }