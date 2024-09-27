const cats = [
    {
      id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
      name: "Meow",
      createdAt: 1727098800585,
      updatedAt: null,
      deleted: false,
    },
    {
      id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
      name: "Kitty",
      createdAt: 1727098952739,
      updatedAt: null,
      deleted: false,
    },
  ];
  
  exports.create = (req, res) => {
    const { name } = req.body;
  
    if (!name || name === "") {
      return res
        .status(418)
        .send({ type: "Error", message: "Must include a name" });
    }
  
    const newCat = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: Date.now(),
      updatedAt: null,
      deleted: false,
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