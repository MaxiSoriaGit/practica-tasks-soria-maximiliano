import User from "./User.js";
import Task from "./Task.js";
import Profile from "./Profile.js";
import Tag from "./Tag.js";

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });


Task.belongsToMany(Tag, { through: "TaskTag" });
Tag.belongsToMany(Task, { through: "TaskTag" });

export { User, Task, Profile, Tag };