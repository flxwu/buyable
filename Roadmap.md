## Frontend
* Group Timeline: /group/ GET
* Main View: Cumulative timeline /user/ GET + /group/items GET
* Product Upload: Name, Desc, Image, Price, Groups /item/new POST
* Register/Login /user/new POST
* Item View: Name, Desc, Image, Price, Groups -> editable /item/ GET + /item/ UPDATE/DELETE
* (User View /user/ GET)

## Backend

#### /api/item
* /new POST: C Item, U User(item), U Group(item)
* / UPDATE(id): U Item, U/D Group(item)
* / DELETE(id): D Item, D Group(item)
* (/search GET(query): R Item)

#### /api/group
* /new POST: C Group
* / GET: R Group
* /items GET(count?): R Group(items)

#### /api/user
* /new POST: C User
* / GET: R User

#### /auth
* /login
* /logout