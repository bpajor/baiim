import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { router as routes } from './routes/routes.js';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import ConnectMongoDBSession from 'connect-mongodb-session';
import session from 'express-session';

const MongoDBStore = ConnectMongoDBSession(session)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URI = `mongodb+srv://blazej122:VETQyBd5lE2PH9Gw@baiimcluster.9jzicc2.mongodb.net/baiimDB`;

const app = Express();
const store = new MongoDBStore({ uri: URI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: '1111',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(async (req, res, next) => {
    const loggedInUser = req.session.user;
    if (!loggedInUser) {
        return next();
    }
    console.log('user is logged in')
    req.user = loggedInUser;
    console.log(req.user);
    next();
})

app.use(routes);

app.use((error, req, res, next) => {
    console.log('in error')
    if (error.message === 'Signup error') {
        const errorContent = error.content;
        return res.status(error.httpStatusCode).render(error.view, {
            pageTitle: 'Zarejestruj się',
            errors: errorContent.reasons,
            oldInput: errorContent.inputs,
            isUserSigned: errorContent.isUserSigned,
        });
    }

    if (error.message === 'Login error') {
        const errorContent = error.content;
        return res.status(error.httpStatusCode).render(error.view, {
            pageTitle: 'Zaloguj się',
            errors: errorContent.reasons,
            oldInput: errorContent.inputs,
            isUserSigned: errorContent.isUserSigned,
        });
    }

    if (error.message = 'Server bug') {
        return res.status(error.httpStatusCode).render('500', {
            pageTitle: 'Błąd Serwera',
        });
    }

    if (error.message === 'Bad email' || error.message === 'Bad password') {
        const errorContent = error.content;
        return res.status(error.httpStatusCode).render('login', {
            pageTitle: 'Zaloguj się',
            errors: errorContent.reasons,
            oldInput: errorContent.inputs,
            isUserSigned: errorContent.isUserSigned,
        });
    }
});


try {
    await mongoose.connect(URI);
    app.listen(3000)
} catch (error) {
    console.log(error);
}
