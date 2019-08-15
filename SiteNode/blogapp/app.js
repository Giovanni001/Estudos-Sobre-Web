//carregando modulos que serão usados

    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    //pegando o arquivo admin que esta dentro da pasta route
    const admin = require('./routes/admin')
    const mongoose = require('mongoose')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    require('./models/Postagem')
    const Postagem = mongoose.model('postagens')

//Configurações
    //Sessão
        app.use(session({
            secret: 'cursodenode',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    //Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg') 
            res.locals.error_msg = req.flash('error_msg')
            next();
        })

    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');

    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao Mongo')
        }).catch((error) => {
            console.log('Erro ao se conectar no Mongo: '+ error)
        })

    //Public
        //estamos dizendo ao express que a pasta que esta guardando todos os arquivos estaticos é a public
        app.use(express.static(path.join(__dirname, 'public')))

        //Criando um Middleware, ele é responsavel por ser um intermediario entre a aplicação e o usuario, uma entidade
        app.use((req, res, next) => {
            console.log('Hi Eu sou um Middleware')
            next();
        })

//Rotas, ao criar uma rota é necessario dizer ao express que essa rota existe
    app.get('/', (req, res) => {
        Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) => {
            res.render('index', {postagens:postagens})

        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/404')
        })
    })

    app.get('/404', (req,res) => {
        res.send('ERRO 404')
    })

    app.get('/posts', (req, res) => {
        res.send('Lista Posts')
    })

    app.use('/admin', admin)
   
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor Rodando')
})