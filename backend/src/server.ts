import express, { Request, Response } from 'express';
import Issue from './issue';

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

        router.post('/create', this.handleCreate);
    }

    private handleCreate(req: Request, res: Response): void {
        const { title, description } = req.body;

        const newIssue: Issue = new Issue(Issue.generateId(), title, description)

        console.log(newIssue);

        res.status(201).send({
            id: newIssue.id,
            title: newIssue.title,
            description: newIssue.description
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default Server;