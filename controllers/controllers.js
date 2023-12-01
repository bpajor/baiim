import { validationResult } from "express-validator";
import { User } from "../models/user.js";

export const getHome = (req, res, next) => {
  console.log('hello from home')
  res.redirect('/index');
}

export const getIndex = (req, res, next) => {
  console.log(req.user.name);
  res.render('index', { name: req.user.name, walletAmount: req.user.walletAmount, uid: req.user._id });
}

export const getLogin = (req, res, next) => {
  console.log('rendering login...')
  res.render('login', { oldInput: {}, errors: [] })
}

export const getSignup = (req, res, next) => {
  res.render('signup', { oldInput: {}, errors: [] })
}

export const postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const oldInput = { name, email, password };

  try {
    const filteredUsers = await User.find().where("email").equals(email);
    console.log(filteredUsers.length)
    const isUserSigned = filteredUsers.length > 0;
    if (isUserSigned) {
      const error = new Error("Signup error");
      error.view = "signup";
      error.httpStatusCode = 422;
      const reasons = [];
      reasons.push({
        path: "email",
        msg: "Użytkownik o danym emailu istnieje !",
      });
      error.content = { reasons, inputs: oldInput, isUserSigned };
      console.log(error);
      return next(error);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Signup error");
      error.view = "signup";
      error.httpStatusCode = 422;
      const reasons = errors.array().map((reason) => {
        return { path: reason.path, msg: reason.msg };
      });
      error.content = { reasons, inputs: oldInput, isUserSigned: undefined };
      return next(error);
    }

    const user = new User({ name, email, password, walletAmount: 0 });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

export const postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const oldInput = { email, password };

  const userQuery = User.where({ email: email });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Login error");
    error.view = "login";
    error.httpStatusCode = 422;
    const reasons = errors.array().map((reason) => {
      return { path: reason.path, msg: reason.msg };
    });
    error.content = { reasons, inputs: oldInput, isUserSigned: undefined };
    return next(error);
  }

  try {
    const foundUser = await userQuery.findOne();
    if (!foundUser) {
      throw new Error("Bad email");
    }
    const userPassword = foundUser.password;
    const isInputPasswordCorrect = userPassword === password;
    if (!isInputPasswordCorrect) {
      throw new Error("Bad password");
    }
    req.session.isLoggedIn = true;
    req.session.user = foundUser;
    req.session.save((err) => {
      console.log("logging...");
      if (err) {
        throw new Error("Server bug");
      }
      console.log("after login");
      res.redirect("/");
    });
  } catch (error) {
    switch (error.message) {
      case "Server bug":
        error.httpStatusCode = 500;
        return next(error);
      case "Bad email":
        error.httpStatusCode = 422;
        break;
      case "Bad password":
        error.httpStatusCode = 401;
        break;
    }
    error.view = "login";

    const reasons = [
      {
        path: error.message === "Bad email" ? "email" : "password",
        msg:
          error.message === "Bad email"
            ? "Użytkownik o tym adresie email nie istnieje. Spróbuj ponownie"
            : "Podałeś niepoprawne hasło",
      },
    ];
    error.content = { reasons, inputs: oldInput, isUserSigned: undefined };
    return next(error);
  }
}

export const postLogout = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      error.message = "Server bug";
      error.httpStatusCode = 500;
      return next(error);
    }
    res.redirect("/");
  });
};

export const postCharge = async (req, res, next) => {
  const chargeAmount = req.body.chargeAmount;
  try {
    const user = await User.findById(req.user._id);
    user.walletAmount += +chargeAmount;
    await user.save();
    req.user.walletAmount += +chargeAmount;
  } catch (error) {
    throw new Error("Server bug");
  }
  res.redirect('/index');
};

export const postWithdraw = async (req, res, next) => {
  const withdrawAmount = req.body.withdrawAmount;
  try {
    const user = await User.findById(req.user._id);
    if (user.walletAmount - withdrawAmount < 0) {
      return res.redirect('/index');
    }
    user.walletAmount -= +withdrawAmount;
    await user.save();
    req.user.walletAmount -= +withdrawAmount;
  } catch (error) {
    throw new Error("Server bug");
  }
  res.redirect('/index');
};