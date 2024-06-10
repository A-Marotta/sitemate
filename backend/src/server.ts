import express from 'express';

class Server {
    private app: express.Application;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }


    private configureMiddleware(): void {
        this.app.use(express.json());
    }

    private configureRoutes(): void {
        const router = express.Router();
        this.app.use('/api', router);

    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default Server;