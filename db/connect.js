import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://nghiemmanhcuong:0987954221@funnydatabase.uki9kya.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('Database connection successfully');
    } catch (error) {
        console.log(error);
    }
};

export default connect;