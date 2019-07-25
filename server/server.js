/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const express = require('express');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db = [
    {
        id: uuid(),
        data: [
            {
                title: 'Co',
                id: uuid(),
                value: 'true',
            },
            {
                title: 'Co',
                id: uuid(),
                value: 'true',
            },
        ],
        name: 'My s',
        ownerId: uuid(),
    },
];

// get all lists
app.get('/api/lists', (req, res) => res.json(db));

// get list by id
app.get('/api/list/:id', (req, res) => {
    const list = db.find(list => list.id === req.params.id);
    if (!list) {
        res.sendStatus(404);
    }
    res.json(list);
});

// add list
app.post('/api/lists', (req, res) => {
    console.log(req.body, '/api/lists');
    if (!req.body.name) {
        res.sendStatus(400);
    } else {
        const newList = {
            id: uuid(),
            name: req.body.name,
            data: [],
            ownerId: uuid(),
        };
        db.push(newList);
        res.json(newList);
    }
});

// update list by id
app.post('/api/list/:id', (req, res) => {
    console.log(req.body);
    if (typeof req.body.name !== 'string') {
        res.sendStatus(400);
    } else {
        db = db.map(list =>
            list.id === req.params.id
                ? {
                      ...list,
                      name: req.body.name,
                  }
                : list
        );
        res.json({
            id: req.params.id,
        });
    }
});

// delete list
app.delete('/api/list/:id', (req, res) => {
    if (typeof req.params.id !== 'string') {
        res.sendStatus(400);
    } else {
        db = db.filter(list => list.id !== req.params.id);
        res.json({
            id: req.params.id,
        });
    }
});

// add snippet to list
app.post('/api/list/:id/snippet', (req, res) => {
    if (typeof req.params.id !== 'string') {
        res.sendStatus(400);
    } else {
        db = db.map(list =>
            list.id === req.params.id
                ? {
                      ...list,
                      data: [
                          ...list.data,
                          {
                              title: req.body.title,
                              id: uuid(),
                              value: req.body.value,
                          },
                      ],
                  }
                : list
        );
        res.json({
            id: req.params.id,
        });
    }
});

// update snippet
app.post('/api/list/:idList/snippet/:id', (req, res) => {
    if (typeof req.params.id !== 'string' || typeof req.params.idList !== 'string') {
        res.sendStatus(400);
    } else {
        db = db.map(list =>
            list.id === req.params.idList
                ? {
                      ...list,
                      data: list.data.map(snippet =>
                          snippet.id === req.params.id
                              ? {
                                    ...snippet,
                                    title: req.body.title,
                                    value: req.body.value,
                                }
                              : snippet
                      ),
                  }
                : list
        );
        res.json({
            id: req.params.id,
        });
    }
});

// delete snippet
app.delete('/api/list/:idList/snippet/:id', (req, res) => {
    if (typeof req.params.id !== 'string') {
        res.sendStatus(400);
    } else {
        db = db.map(list =>
            list.id === req.params.idList
                ? {
                      ...list,
                      data: list.data.filter(snippet => snippet.id !== req.params.id),
                  }
                : list
        );
        res.json({
            id: req.params.id,
        });
    }
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
