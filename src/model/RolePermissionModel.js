import mongoose from "mongoose";

const rolePermission=mongoose.Schema({
    role_name:{
        type:String,
        require:true
    },
    // permission:{
        
    //     module_access:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     },
    //     all:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     },
    //     create:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     },
    //     update:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     },
    //     delete:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     },
    //     view:{
    //         type:Boolean,
    //         require:true,
    //         default:false
    //     }
    // }

    permission:{    
      type:Object
    },

    isActive: {
        type: Boolean,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },

}, { timestamps: true })
    
export const  rolePermissionModel=mongoose.model("rolepermission",rolePermission)
