export const CreateInvoice=async (req,res)=>{
    try {
        return res.json({status:"success"});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}

export const ReadInvoiceDetails=async (req,res)=>{
    try {
        return res.json({status:"success"});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}

export const ReadInvoiceList=async (req,res)=>{
    try {
        return res.json({status:"success"});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}