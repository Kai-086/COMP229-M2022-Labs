/* Connect to mongoose */
// Step 1 - Import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Step 2 - Create a Schema that matches the data
// Password should be HASH, thus it shouldn't put here
const UserSchema = new Schema({
    Display: String,
    username: String,
    EmailAddress: String,
    Created: {
        type: Date,
        default: Date.now()
    },
    Updated:{
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

// Step 3 - Create a Model using the Schema
const Model = mongoose.model("User", UserSchema);

// Step 4 - Export the Model -> this makes the file a module
export default Model;