interface IController {
  newPOST: Function;
}

class Controller<IController> {
  constructor(DBItemModel) {
    this.DBItemModel = DBItemModel; 
  }

  public newPOST(req: any, res: any, next: any): any {

  }

  public get(req: any, res: any, next: any): any {
    res.status(200);
    res.json({ item: 'test' });
  }
}

export default Controller;
