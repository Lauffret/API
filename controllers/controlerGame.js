const fs = require('fs');
const path = './games.json';
module.exports = {
    getGames(req, res){   
        fs.promises.readFile(path)
        .then(function(result){
            res.set('Content-Type', 'text/json');
			res.send(result);
            //res.render('games', {games : result});
        }).catch(function(error){
            res.set('Content-Type', 'text/html');
            res.send(error);
        })
    },

    getGame(req, res){
        fs.promises.readFile(path)
            .then(function (result) {
                result = JSON.parse(result);
                result = result.games.find((game) => { return game.id == req.params.id });
                res.set('Content-Type', 'text/json');
				res.send(result);
                //res.render('game', {num: req.params.id, gameN: result.name, gameD: result.dev });
            })
            .catch(function (error) {
                console.log(error);
                res.set('Content-Type', 'text/html');
                res.send(error);
            })
    },

    update(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const dev = req.body.dev;
        var gameUp = { "id": parseInt(id), "name": name, "dev": dev }
        fs.promises.readFile(path)
            .then(function (result) {
                result = JSON.parse(result);
                let index = result.games.find((game) => { return game.id == req.params.id });
                 index = result.games.indexOf(index);
                result.games[index] =gameUp;
                fs.writeFile(path, JSON.stringify(result, null, 4), function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(result);
                });
                res.set('Content-Type', 'text/html');
                res.send("tout c'est bien passer");
            })
            .catch(function (error) {
                console.log(error);
                res.set('Content-Type', 'text/html');
                res.send(error);
            })

    },

    create(req, res) {
         const id = req.body.id;
         const name = req.body.name;
         const dev = req.body.dev;
         var newGame = { "id": parseInt(id), "name": name, "dev": dev }
         console.log(newGame);
         fs.promises.readFile(path)
             .then(function (result) {
                 result = JSON.parse(result);
                 result.games.push(newGame);
                 console.log(result);
                 fs.writeFile(path, JSON.stringify(result, null, 4), function (err, data) {
                     if (err) {
                         return console.log(err);
                     }
                     console.log(result);
                 });
                 res.set('Content-Type', 'text/html');
                 res.send("tout c'est bien passer");
             })
             .catch(function (error) {
                 console.log(error);
                 res.set('Content-Type', 'text/html');
                 res.send(error);
             })

    },

    delete(req, res) {
        const id = req.params.id;
		console.log(id);
        fs.promises.readFile(path)
            .then(function (result) {
                result = JSON.parse(result);
                let gameToDelete = result.games.find((game) => { return game.id == req.params.id });
                let index = result.games.indexOf(gameToDelete);
                if (index > -1) {
                    result.games.splice(index, 1);
                }
                fs.writeFile(path, JSON.stringify(result, null, 4), function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(result);
                });
                res.set('Content-Type', 'text/html');
				res.redirect('/');
                res.send("tout c'est bien passer");
            })
            .catch(function (error) {
                console.log(error);
                res.set('Content-Type', 'text/html');
                res.send(error);
            })
    },
}