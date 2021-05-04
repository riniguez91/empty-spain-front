export class User {
    public name: string;
    public surnames: string;
    public role: number;

    constructor(name: string, surnames: string, role: number) {
        this.name = name;
        this.surnames = surnames;
        this.role = role;
    }
}
