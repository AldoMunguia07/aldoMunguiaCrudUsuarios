const DaoObject = require("../../dao/DaoObject");
module.exports = class Bitacora {
    bitacoraDao = null;


        constructor ( bitacoraDao = null) {
        if (!(bitacoraDao instanceof DaoObject)){
            throw new Error('An Instance of DAO Object is required');
        }
        this.bitacoraDao = bitacoraDao;
    }


    async init()
    {
        await this.bitacoraDao.init();
        this.bitacoraDao.setup();
    }


    async addBitacora ({
        type = "", description  = "", date  = "", amount = "", category = ""
    })  {

        const result = await this.bitacoraDao.insertOne(
            {
                type, description , date , amount, category
            }
        );

        return {
            type, description , date , amount, category, id: result.lastID
          };

    };

    async getBitacoras() {
        return this.bitacoraDao.getAll();

    };



    async getBitacoraByID({id})  {

        return this.bitacoraDao.getById({id});

    };

    async updateBitacora({id, type, description, amount, category}) {
       const result = await this.bitacoraDao.updateOne({id, type, description , amount, category});

       return {
        id: id,
        type : type,
        description  : description,
        amount : amount,
        category : category,
           modified: result.changes
       }

    };

    async deleteBitacora({id}) {
        const userToDelete = await this.bitacoraDao.getById({id});
        const result = await this.bitacoraDao.deleteOne({id});

        return {
            ...userToDelete,
            deleted: result.changes
        };
    };
}
