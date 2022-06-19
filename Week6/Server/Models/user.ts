/* Connect to mongoose */
// Step 1 - Import Mongoose
import mongoose, {PassportLocalSchema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

// Step 2 - Create a Schema that matches the data
// Password should be HASH, thus it shouldn't put here
const UserSchema = new Schema({
    DisplayName: String,
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

declare global{
    export type UserDocument = mongoose.Document & {
        username: String,
        EmailAddress: String,
        DisplayName: String
    }
}

// Step 3 - Plugin the passport local mongoose module
UserSchema.plugin(passportLocalMongoose);


// Step 4 - Create a Model using the Schema
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

// Step 5 - Export the Model -> this makes the file a module
export default Model;