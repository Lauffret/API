ControlerGame = require('../controllers/controlerGame');

module.exports = (server) => {
    server.get('/',(req, res) => { 
       res.render('index')});
    server.get('/games', ControlerGame.getGames);
    server.get('/game/:id', ControlerGame.getGame);
    server.put('/game/:id',ControlerGame.update);
    server.post('/game',ControlerGame.create);
    server.delete('/game/:id',ControlerGame.delete);
}