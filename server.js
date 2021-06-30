const express = require ("express");
const mongodbSalads = require('./mongodb_salads')
const app = express() , PORT = 8080;

app.use(express.json());

app.patch("/db_myFirstMenu/:id" , (req,res) => {
    mongodbSalads.handleUpdate(req,res);

});

app.delete("/db_myFirstMenu/:id" , (req,res) => {
    mongodbSalads.handleDelete(req,res);

});

app.get("/db_myFirstMenu" , (req,res) => {
    mongodbSalads.handleGet(req,res);

});

app.post("/db_myFirstMenu" , (req,res) => {
    mongodbSalads.handlePost(req,res);

});


app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);

})
