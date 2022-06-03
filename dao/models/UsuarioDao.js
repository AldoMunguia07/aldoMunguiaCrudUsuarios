const { db } = require("../Connection");
const DaoObject = require("../DaoObject")

module.exports = class UsuarioDao extends DaoObject{
    constructor(db = null){
        console.log('UsuarioDao db: ', db);
        super(db);
      }


    async setup(){
        if(process.env.SQLITE_SETUP){
            const createStatement = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombreCompleto TEXT, email TEXT, estado TEXT, avatar TEXT, password TEXT, fechaIngreso TEXT);'
            await this.conn.run(createStatement);
        }
    }


    insertOne({nombreCompleto, email, estado, avatar, password, fechaIngreso}){
        const fchIngreso = new Date().toISOString();
        fechaIngreso = fchIngreso;
        const sqlstr = 'INSERT INTO usuarios (nombreCompleto, email, estado, avatar,password, fechaIngreso) values (?, ?, ?, ?, ?, ?);';
        const sqlparamArr = [nombreCompleto, email, estado, avatar, password, fechaIngreso];
        return this.run(sqlstr, sqlparamArr)
    }

     getAll(){
        return this.all('SELECT * FROM usuarios;', []);
    }

    getById({id}){
        const sqlstr = 'SELECT * FROM usuarios WHERE id = ?';
        const sqlParamArr = [id];

        return this.get(sqlstr, sqlParamArr);
    }

    updateOne({id, nombreCompleto, email, estado, avatar, password, fechaIngreso})
    {
        const sqlstr = 'UPDATE usuarios SET nombreCompleto = ?, email = ?, estado = ?, avatar = ?, password = ? WHERE id = ?';
        const sqlParamArr = [nombreCompleto, email, estado, avatar, password, id];
        return this.run(sqlstr, sqlParamArr);
    }

    deleteOne({id})
    {
        const sqlstr = 'DELETE FROM usuarios WHERE id = ?';
        const sqlParamArr = [id];
        return this.run(sqlstr, sqlParamArr);
    }

}