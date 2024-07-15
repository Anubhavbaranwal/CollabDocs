import mongoose from 'mongoose';

const roleEnum = ["ADMIN", "SUPERADMIN"];

const roleSchema = new mongoose.Schema({
  name: { type: String, enum: roleEnum, required: true }
}, { timestamps: false });

// Virtual field for `users` through `UserRole`
roleSchema.virtual('users', {
  ref: 'UserRole',
  localField: '_id',
  foreignField: 'roleId'
});

roleSchema.virtual('roleUsers', {
  ref: 'UserRole',
  localField: '_id',
  foreignField: 'roleId',
  justOne: false,
  options: { onDelete: 'CASCADE' }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
