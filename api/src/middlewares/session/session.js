const jwt = require("jsonwebtoken");
const BadRequest = require("../../errorClasses/BadRequest");
const NotFound = require("../../errorClasses/NotFound");
const { User } = require("../../db");
require("dotenv").config();

const checkSession = async (req, res, next) => {
  const tokenByUser = req.headers.authorization || null;

  try {
    if (!tokenByUser) {
      throw new BadRequest("No se proporcionó un token");
    }

    const token = tokenByUser.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new NotFound("Token inválido - usuario no encontrado");
    }
    req.body.user_id = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkSession };
