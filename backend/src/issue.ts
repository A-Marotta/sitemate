class Issue {
    static nextId = 1;

    constructor(public id: number, public title: string, public description: string) { }

    static generateId(): number {
        return Issue.nextId++;
    }
}

export default Issue;
