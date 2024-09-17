import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
        categoryName:{type:String,required: true,unique:true},
        categoryImg:{type:String,required: true},
    }
    ,
    {
        timestamps: true,
        versionKey:false,
    }

)


const CategoryModel =mongoose.model('categories',DataSchema);
export default CategoryModel