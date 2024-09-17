export const CreateCart = async (req, res, next) => {

    try {
        return res.json({status:"success","Message":""})
    } catch (err) {
        return res.status(400).json({ status:"fail",message: err.toString() })
    }
}
export const ReadCartList = async (req, res, next) => {

    try {
        return res.json({status:"success","Message":""})
    } catch (err) {
        return res.status(400).json({ status:"fail",message: err.toString() })
    }
}
export const RemoveCart = async (req, res, next) => {

    try {
        return res.json({status:"success","Message":""})
    } catch (err) {
        return res.status(400).json({ status:"fail",message: err.toString() })
    }
}
export const UpdateCart = async (req, res, next) => {

    try {
        return res.json({status:"success","Message":""})
    } catch (err) {
        return res.status(400).json({ status:"fail",message: err.toString() })
    }
}