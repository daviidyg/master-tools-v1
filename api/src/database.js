import mongoose, {mongo} from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ApiRest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'admin',
    pass: 'admin'
}).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(err);
});
