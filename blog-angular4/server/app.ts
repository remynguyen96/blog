import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
/**
  * Task: Setting
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  */
app.set('port',process.env.PORT || 4000 );
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../public')));
app.locals.siteTitle = 'Nodejs With Angular 4';



app.get('/',() => {
  console.log("Good job !");
});

/**
  * Task: Connect SocketIO and Server
  * Author: Remy Nguyen
  * Date created: 2017/03/24 14:00 PM
  */
var server = app.listen(app.get('port'),() => {
  console.log(`Listening on port http://localhost:${app.get('port')}`);
});

export { app };
