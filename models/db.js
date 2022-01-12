var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
}
mongoose.connect('mongodb+srv://admin:******@cluster0.by4vv.mongodb.net/kiosk?retryWrites=true&w=majority', 
    options,         
    function(err) {
       console.log(err);
    }
);
