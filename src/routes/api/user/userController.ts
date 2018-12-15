interface IController {
    newPOST: Function;
    GET: Function;
}

class Controller<IController> {
    constructor() {}
    public newPOST(req: any, res: any, next: any): any {

    }
    public GET(req: any, res: any, next: any): any {
        res.status(200);
        res.json({user: 'test'});
    }
}

export default Controller;