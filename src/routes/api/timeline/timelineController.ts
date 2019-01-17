interface IController {
  latestGET: Function;
  hottestGET: Function;
}

class Controller<IController> {
  public async latestGET(req, res) {
    res.status(200).json([
      {
        title: 'Item 1',
        imageURL:
          'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=305627_wood_C&layer=comp&$prodzoom0$'
      },
      {
        title: 'Item 1',
        imageURL:
          'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=305627_wood_C&layer=comp&$prodzoom0$'
      },
      {
        title: 'Item 1',
        imageURL:
          'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=305627_wood_C&layer=comp&$prodzoom0$'
      },
      {
        title: 'Item 1',
        imageURL:
          'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=305627_wood_C&layer=comp&$prodzoom0$'
      },
      {
        title: 'Item 1',
        imageURL:
          'https://s7d4.scene7.com/is/image/roomandboard/?layer=0&size=498,400&scl=1&src=305627_wood_C&layer=comp&$prodzoom0$'
      }
    ]);
  }
  public async hottestGET() {}
}

export default Controller;
