import app from './app.js';
import { PORT } from './config.js';
import './libs/initialSetup.js'
app.listen(PORT,()=>console.log(`server listening on ${PORT}`))