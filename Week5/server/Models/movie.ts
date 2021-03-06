/* Connect to mongoose */
// Step 1 - Import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Step 2 - Create a Schema that matches the data
const MoviesSchema = new Schema({
    Name: String,
    Year: String,
    Director: String,
    Rating: String
},
{
    collection: "movies"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("Movies", MoviesSchema);

// Step 4 - Export the Model -> this makes the file a module
export default Model;