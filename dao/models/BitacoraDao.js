const { db } = require("../Connection");
const DaoObject = require("../DaoObject")

module.exports = class BitacoraDao extends DaoObject{
    constructor(db = null){
        console.log('BitacoraDao db: ', db);
        super(db);
      }


    async setup(){
        if(process.env.SQLITE_SETUP){
            const createStatement = 'CREATE TABLE IF NOT EXISTS bitacora (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, description TEXT, date TEXT, amount DECIMAL, category TEXT);'
            await this.conn.run(createStatement);
        }
    }


    insertOne({type, description , date , amount, category }){
        const fecha = new Date().toISOString();
        date = fecha;
        const sqlstr = 'INSERT INTO bitacora (type, description, date, amount, category) values (?, ?, ?, ?, ?);';
        const sqlparamArr = [type, description , date , amount, category];
        return this.run(sqlstr, sqlparamArr)
    }

     getAll(){
        return this.all('SELECT * FROM bitacora;', []);
    }

    getById({id}){
        const sqlstr = 'SELECT * FROM bitacora WHERE id = ?';
        const sqlParamArr = [id];

        return this.get(sqlstr, sqlParamArr);
    }

    updateOne({id, type, description , amount, category})
    {
        const sqlstr = 'UPDATE bitacora SET type = ?, description  = ?, amount = ?, category = ? WHERE id = ?';
        const sqlParamArr = [type, description , amount, category, id];
        return this.run(sqlstr, sqlParamArr);
    }

    deleteOne({id})
    {
        const sqlstr = 'DELETE FROM bitacora WHERE id = ?';
        const sqlParamArr = [id];
        return this.run(sqlstr, sqlParamArr);
    }

}