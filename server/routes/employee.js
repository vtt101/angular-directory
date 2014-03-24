var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("angular-directory-db");
    db.collection('employees', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('employees', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
    db.collection('employees', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('employees', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating employee database...");
    var employees = [
         {"id": 1, "firstName": "Susan", "lastName": "Rushin", "managerId": 0, "managerName": "", "reports": 6, "title":"", "department": "Sales", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "email", "city": "St. Luois", "pic": "paula_gates.jpg", "twitterId": "", "blog": ""},
            {"id": 2, "firstName": "Nance", "lastName": "Goodwin", "managerId": 1, "managerName": "Susan", "reports": 30, "title": "Director of Customer Service", "department": "Customer Service", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "nance_goodman@victortechnologies.com", "city": "Denton, Tx", "pic": "paula_gates.jpg", "twitterId": "", "blog": ""},
            {"id": 3, "firstName": "Robert", "lastName": "Shigley", "managerId": 1, "managerName": "Susan R", "reports": 5, "title": "Director of Awesomeness", "department": "Training", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "robert_shigley@victortechnologies.com", "city": "Denton, Tx", "pic": "steven_wells.jpg", "twitterId": "", "blog": ""},
            {"id": 4, "firstName": "Amy", "lastName": "Hiley", "managerId": 3, "managerName": "Robert Shigley", "reports": 0, "title": "Director of Awesomeness", "department": "Training", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "amy_hiley@gmail.com", "city": "Denton, Tx", "pic": "paula_gates.jpg", "twitterId": "", "blog": ""},
            {"id": 5, "firstName": "Jennifer", "lastName": "Grimes", "managerId": 3, "managerName": "Robert Shigley", "reports": 0, "title": "VP of Kicking Ass and Taking names", "department": "Training", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "jennifer_grimes@victortechnologies.com", "city": "Denton", "pic": "Paula_Gates.jpg", "twitterId": "", "blog": ""},
            {"id": 6, "firstName": "Mike", "lastName": "McCauly", "managerId": 3, "managerName": "Robert Shigley", "reports": 0, "title": "Lead captivate badass", "department": "Training", "cellPhone": "xxx-xxx-xxxx", "officePhone": "xxx-xxx-xxxx", "email": "mike_mccauly@victortechnologies.com", "city": "Denton, Tx", "pic": "steven_wells.jpg", "twitterId": "", "blog": ""},
            {"id": 7, "firstName": "Steven", "lastName": "De La Garza", "managerId": 3, "managerName": "Robert Shigley", "reports": 0, "title": "The Original Plasman", "department": "Training", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "steve_delagarza@victortechnologies.com", "city": "Denton, Tx", "pic": "steven_wells.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
            {"id": 8, "firstName": "Christy", "lastName": "Rincon", "managerId": 3, "managerName": "Robert Shigley", "reports": 0, "title": "Ambassador of Entertainment", "department": "Damn sure not IT....", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "christy_rincon@victortechnologies.com", "city": "Denton, Tx", "pic": "lisa_wong.jpg", "twitterId": "", "blog": ""},
            {"id": 9, "firstName": "VP of Sales", "lastName": "Region 100", "managerId": 1, "managerName": "1", "reports": 0, "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
            {"id": 10, "firstName": "Quanna", "lastName": "Whatchafuckit", "managerId": 2, "managerName": "Nance Goodwin", "reports": 5, "title": "Manager, Customer Service", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
            {"id": 11, "firstName": "F", "lastName": "Loya", "managerId": 10, "managerName": "Quanna Whatchafuckit", "reports": 0, "title": "Customer Service Tech on Maternaty Leave", "department": "Customer Service", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"}  ];
 
    db.collection('employees', function(err, collection) {
        collection.insert(employees, {safe:true}, function(err, result) {});
    });
 
};
