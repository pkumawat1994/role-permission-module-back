import { rolePermissionModel } from "../model/RolePermissionModel.js";

const createRolePermission = async (req, res) => {
  console.log(req.body.permission, 123);
  try {
    const result = await new rolePermissionModel({
      role_name: req.body.role_name,
      permission: req.body.permission,
    });
    console.log(await result, 45);
    await result.save();

    return res.status(200).send({
      status: 200,
      message: "success",
      error: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllRolePermission = async (req, res) => {
  try {
    const result = await rolePermissionModel.find({ isDeleted: false });
    console.log(result, "ressss");

    return res.status(200).send({
      status: 200,
      message: "Rolls fetch successfully",
      rolls: result,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const deleteRolePermission = async (req, res) => {
  console.log(req.params.id, 45);
  try {
    const data = await rolePermissionModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true, select: "-password" }
    );
    console.log(56, data);
    if (data) {
      return res.status(200).send({
        statsu: 200,
        deleted: data,
        message: "Role deleted successfully",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ statsu: 500, message: "Internal server error" });
  }
};

const updateRolePermission = async (req, res) => {
  console.log(56, req);
  try {
    const data = await rolePermissionModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { updatedAt: new Date(), ...req.body } },
      { new: true, select: "-password" }
    );
    if (data) {
      return res
        .status(200)
        .send({
          status: 200,
          message: "Role updated successfully",
          updatedRole: data,
        });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

const viewRolePermission = async (req, res) => {
  try {
    const data = await rolePermissionModel.findOne({ _id: req.params.id });
    console.log(data, "dattt");
    if (data) {
      return res
        .status(200)
        .send({
          status: 200,
          message: "Role fetched successfully",
          role: data,
        });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
};

export {
  createRolePermission,
  getAllRolePermission,
  deleteRolePermission,
  updateRolePermission,
  viewRolePermission,
};
