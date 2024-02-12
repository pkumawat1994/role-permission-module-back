import { Router } from "express";
import { createRolePermission, deleteRolePermission, getAllRolePermission, updateRolePermission, viewRolePermission } from "../controller/Admin.controller.js";

let adminRoutes=Router();



adminRoutes.post("/add-role-permission",createRolePermission);
adminRoutes.get("/get-all-role-permission",getAllRolePermission);
adminRoutes.delete("/delete-role-permission/:id",deleteRolePermission);
adminRoutes.post("/update-role-permission/:id",updateRolePermission);
adminRoutes.get("/view-single-role-permission/:id",viewRolePermission);




export  {adminRoutes}