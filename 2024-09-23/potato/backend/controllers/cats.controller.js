const crypto = require("crypto");

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

// Loo kass
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

// Näita kõiki kasse (vaid mitte-kustutatud)
exports.read = (req, res) => {
  const activeCats = cats.filter(cat => !cat.deleted);
  res.send(activeCats);
};

// Uuenda kassi nime
exports.update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log("Uuendamine, ID:", id, "Nimi:", name);

  if (!name || name === "") {
    return res.status(418).send({ type: "Error", message: "Must include a name" });
  }

  const cat = cats.find(cat => cat.id === id);

  if (!cat) {
    return res.status(404).send({ type: "Error", message: "Cat not found" });
  }

  if (cat.deleted) {
    return res.status(410).send({ type: "Error", message: "Cat is deleted" });
  }

  cat.name = name;
  cat.updatedAt = Date.now();

  res.send(cat);
};

// Kustuta kass
exports.delete = (req, res) => {
  const { id } = req.params;

  console.log("Kustutamine, ID:", id);

  const cat = cats.find(cat => cat.id === id);

  if (!cat) {
    return res.status(404).send({ type: "Error", message: "Cat not found" });
  }

  if (cat.deleted) {
    return res.status(410).send({ type: "Error", message: "Cat is already deleted" });
  }

  cat.deleted = true;
  cat.updatedAt = Date.now();

  res.send({ message: "Cat deleted", cat });
};
