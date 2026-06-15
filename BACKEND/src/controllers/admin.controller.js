import adminModel from "../models/admin.model.js"
import volunteerModel from "../models/volunteer.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body
    const isAdminAlreadyExists = await adminModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isAdminAlreadyExists) {
        return res.status(409).json({
            message: "Admin Already Exists"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const admin = await adminModel.create({
        username, email, password: hash
    })
    const token = jwt.sign({
        id: admin._id,
        role: "admin"
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "Admin Registered Successfully",
        admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
        }
    })
}

const loginAdmin = async (req, res) => {
    const { username, email, password } = req.body
    const admin = await adminModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!admin) {
        return res.status(401).json({
            message: "Invalid Admin Credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({
        id: admin._id,
        role: "admin"
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    return res.status(200).json({
        message: "Login Successful",
        admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
        }
    })
}

const logoutAdmin = async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message: "Admin Logged Out Successfully"
    })
}

const getVolunteers = async (req, res) => {
    const volunteers = await volunteerModel.find()
    const admin = await adminModel.findById(req.adminId)
    return res.status(200).json({
        message: "Volunteers Fetched Successfully",
        volunteers,
        admin
    })
}


export default { registerAdmin, loginAdmin, logoutAdmin, getVolunteers }