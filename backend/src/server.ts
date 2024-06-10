import express, { Request, Response } from 'express';
import Issue from './issue';

class Server {
    private app: express.Application;
    private port: number;
    private issues: Issue[];

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.issues = [];
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
    }

    private configureRoutes(): void {
        const router = express.Router();
        this.app.use('/api', router);

        router.post('/create', this.handleCreate.bind(this));
        router.post('/create', this.handleCreate.bind(this));
        router.get('/read', this.handleRead.bind(this));
        router.put('/update/:id', this.handleUpdate.bind(this));
        router.delete('/delete/:id', this.handleDelete.bind(this));
    }

    private handleCreate(req: Request, res: Response): void {
        const { title, description } = req.body;

        const newIssue: Issue = new Issue(Issue.generateId(), title, description)
        this.issues.push(newIssue);

        res.status(201).send({
            id: newIssue.id,
            title: newIssue.title,
            description: newIssue.description
        });
    }

    private handleRead(req: Request, res: Response): void {
        // requests a JSON object & prints it out
        console.log(this.issues);

        res.status(200).send(this.issues);
    }

    private handleUpdate(req: Request, res: Response): void {
        const id: number = Number(req.params.id);
        const { title, description } = req.body;

        const index: number = this.issues.findIndex(issue => issue.id === id);
        if (index !== -1) {
            this.issues[index].title = title;
            this.issues[index].description = description;

            res.status(200).send({
                id: this.issues[index].id,
                title: this.issues[index].title,
                description: this.issues[index].description
            });
        } else {
            res.status(404).send('Issue not found');
        }
    }

    private handleDelete(req: Request, res: Response): void {
        const id: number = Number(req.params.id);

        const index: number = this.issues.findIndex(issue => issue.id === id);
        if (index !== -1) {
            this.issues.splice(index, 1);
            res.status(200).send('Issue deleted successfully');
        } else {
            res.status(404).send('Issue not found');
        }
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default Server;