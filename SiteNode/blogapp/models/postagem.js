const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Postagem = new Schema({
    titulo: {
        type: String,
        required:true
    },
    slug: {
        type:String,
        required:true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        //essa categoria vai armazenar um id de um objeto
       type: Schema.Types.ObjectId,
       //é necessario passar a referencia que voce deu ao seu modelo
       ref:  "categorias",
       required: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

//criando uma collection no mongo com o nome postagens
mongoose.model('postagens', Postagem)