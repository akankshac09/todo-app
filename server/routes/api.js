
module.exports = function apiRoutes(app, { bucket, todoItem }) {
  app.get(
    '/api/buckets',
    async (req, res) => {
      const allBuckets = await bucket.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      res.send(allBuckets);
    });
  app.get(
    '/api/buckets/:bucketId',
    async (req, res) => {
      const bucketFound = await bucket.findByPk(req.params.bucketId, {
        include: [
          {
            model: todoItem,
          }
        ],
      });
      // bucketFound.todoItems = await bucketFound.getTodoItems();
      res.send(bucketFound);
    }
  )
  app.post(
    '/api/buckets',
    async (req, res) => {
      res.send(await bucket.create(req.body))
    },
  );

  app.put(
    '/api/buckets/:bucketId',
    async (req, res) => {
      const bucketFound = await bucket.findByPk(req.params.bucketId);
      bucketFound.name = req.body.name;
      res.send(await bucketFound.save());
    },
  );

  app.get(
    '/api/todo-items',
    async (req, res) => {
      const count = await todoItem.count();
      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0;
      const data = await todoItem.findAll({
        offset: offset || 0,
        limit: limit || 10,
        order: [
          [ 'createdAt', 'DESC' ],
        ]
      });
      res.send({
        offset,
        limit,
        data,
        count,
      });
    },
  );

  app.get(
    '/api/todo-items/:todoItemId',
    async (req, res) => res.send(await todoItem.findByPk(
      req.params.todoItemId,
      {
        include: [
          {
            model: bucket,
          },
        ],
      }
    )),
  )

  app.post(
    '/api/todo-items',
    async (req, res) => {
      if (!req.body.bucketId) {
        res.send(400);
        return;
      }
      const newTodoItem = await todoItem.create(req.body);
      res.send(newTodoItem);
    }
  )

  app.put(
    '/api/todo-items/:todoItemId',
    async (req, res) => {
      const foundTodoItem = await todoItem.findByPk(req.params.todoItemId);
      if (!foundTodoItem) {
        res.send(404);
        return;
      }
      foundTodoItem.name = req.body.name;
      if (typeof req.body.bucketId !== 'undefined') {
        foundTodoItem.bucketId = req.body.bucketId;
      }
      if (typeof req.body.isDone !== 'undefined') {
        foundTodoItem.isDone = req.body.isDone;
      }
      res.send(await foundTodoItem.save());
    }
  )
}