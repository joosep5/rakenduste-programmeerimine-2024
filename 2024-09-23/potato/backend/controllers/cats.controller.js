const cats = ["Coots"];

exports.create = (req, res) => {
    const { name } = req.body;
    const newCat = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        updateAt: null,
        delete: false,
    };
    cats.push(newCat);
    res.send(newCat);

};

exports.read = (req, res) => {
   res.send(cats);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const cat = cats.find((cat) => cat.id === id);
    const updateCat = {
        id: crypto.randomUUID(),
        name: name,
        updateAt: Date.now(),
        updateAt: null,
        delete: false,
    };

};

exports.delete = (req, res) => {
    const { id } = req.params;
    const index = cats.findIndex((cat) => cat.id === id);
    if (index !== -1) {
        cats.splice(index, 1);
    }
    const cat = cats.find((cat) => cat.id === id);
    const deleteCat = {
        id: crypto.randomUUID(),
        name: name,
        deleteAt: Date.now(),
        updateAt: false,
        delete: true,
    };
};