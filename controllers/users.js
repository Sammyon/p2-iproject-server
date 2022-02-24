const { User } = require("../models");
const { token } = require("../helpers/jwt");
const { decrypt } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const clientID = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class ControllerLogin {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(email, password);

      if (!email) {
        throw { status: 400, message: "Email is required" };
      }
      if (!password) {
        throw { status: 400, message: "Password is required" };
      }

      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw { status: 401, message: "Invalid email/password" };
      }

      const login = decrypt(password, user.password);

      if (!login) {
        throw { status: 401, message: "Invalid email/password" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const genToken = token(payload);

      res.status(200).json({
        token: genToken,
        username: data.username,
      });
    } catch (error) {
      // console.log(error, "error");
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { googleToken } = req.body;
      const ticket = await clientID.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID,
      }); //? Verify Google Token
      const payload = ticket.getPayload(); //? Decrypt isi googleToken
      // console.log(payload, `PAYLOAD GOOGLE`);

      let [newUser, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: payload.email,
        },
      });

      const payloadToken = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      };
      const genToken = token(payloadToken);
      res
        .status(201)
        .json({ email: newUser.email, username: newUser.username, isCreated, token: genToken });
    } catch (error) {
      next(error);
    }
  }

  static async googleReg(req, res, next) {
    try {
      const { email, password} = req.body;

      let user = await User.update(
        {
          password,
        },
        {
          where: {
            email,
          },
          individualHooks: true,
          returning: true
        }
      );

      res.status(201).json({ username: user[1].dataValues.username, message: `Account has been created!` });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = ControllerLogin;
