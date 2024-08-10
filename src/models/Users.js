import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import { AdminCorreo, AdminGoogleId, AdminPass } from "../config.js";
import { encryptPass } from "../middleware/bcrypt.js";

// Definición del modelo User
export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  range: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Agregado para evitar emails duplicados
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: true, // Cambiado a true para permitir valores nulos
  },
}, {
  timestamps: true,
});

// Función para crear un admin
const createAdmin = async () => {
  try {
    const email = AdminCorreo;
    const password = await encryptPass(AdminPass);

    // Cambiado findAll a findOne para obtener un solo registro
    const admin = await User.findOne({ where: { email } });

    if (admin) {
      console.log("admin exists!");
    } else {
      await User.create({
        email,
        password,
        googleId: AdminGoogleId,
        range: 1, // Cambiado a número en vez de cadena
        fullName: "Braian Admin",
      });
      console.log("Admin created!");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();
