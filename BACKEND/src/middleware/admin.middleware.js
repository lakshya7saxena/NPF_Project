import jwt from "jsonwebtoken"
const adminAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "admin"){
            return res.status(403).json({
                message:"You don't have access to this route"
            })
        }
        req.adminId = decoded.id
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })

    }
}
export default {adminAuthMiddleware}