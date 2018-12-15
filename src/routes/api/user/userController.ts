interface IController {
    newPOST: Function;
}

class Controller<IController> {
    constructor() {}
    public newPOST(req: any, res: any, next: any): any {

    }
    public get(req: any, res: any, next: any): any {
        res.status(200);
        res.json({user: 'test'});
    }
}

export default Controller;