interface IController {
    newPost: Function;
}

class Controller<IController> {
    constructor() {}
    public newPost(req: any, res: any, next: any): any {

    }
    public get(req: any, res: any, next: any): any {
        res.status(200);
        res.json({group: 'test'});
    }
}

export default Controller;