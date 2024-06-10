import dotenv from 'dotenv';
import Server from './server';
import { getConfig } from './utils/config';

dotenv.config();

(() => {
    const config = getConfig();
    const port = config.server.port || 4000;

    const server: Server = new Server(port);
    server.start();
})();