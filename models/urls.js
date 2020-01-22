const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let urlSchema = new Schema({
  "id" : {type: Number},
  "url" : {type: String, required: true},
  "type": {type: String, default: "url"}
});

let Url = mongoose.model('Url', urlSchema);


const findUrlById = function(id, done){
  Url.findOne({id: id}, function(err, url){
    if(err) console.log(err);
    return done(null, url);
  })
}

const insertUrlAndId = function(url, id, done){
    let newUrl = new Url({id: id, url: url});
    newUrl.save(function(err, data){
      if(err) console.log(err);
      return done(null, data);
    })
}

const findByType = function(type, done){
    Url.find({type: type})
        .sort({id: "Descending"})
        .limit(1)
        .exec(function(err, data){
      if(err) console.log(err);
      return done(null, data);
    });
}

const findByName = function(name, done){
    Url.find({url: name})
        .sort({id: "Descending"})
        .limit(1)
        .exec(function(err, data){
      if(err) console.log(err);
      return done(null, data);
    });
}

exports.UrlModel = urlSchema;
exports.findUrlById = findUrlById;
exports.insertUrlAndId = insertUrlAndId;
exports.findByType = findByType;
exports.findByName = findByName;