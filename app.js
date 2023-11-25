import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { router as routes } from './routes/routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(3000);
