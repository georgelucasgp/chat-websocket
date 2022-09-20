import { serverHttp } from './app';
import './websocket';
const PORT = process.env.PORT;

serverHttp.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT} 🚀`)
);
