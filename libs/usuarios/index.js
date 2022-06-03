const DaoObject = require("../../dao/DaoObject");
module.exports = class Usuario {
    usuarioDao = null;


        constructor ( usuarioDao = null) {
        if (!(usuarioDao instanceof DaoObject)){
            throw new Error('An Instance of DAO Object is required');
        }
        this.usuarioDao = usuarioDao;
    }


    async init()
    {
        await this.usuarioDao.init();
        this.usuarioDao.setup();
    }


    async addUsuario ({
        nombreCompleto = "", email = "", estado = "", avatar = "", password = "", fechaIngreso = ""
    })  {

        const result = await this.usuarioDao.insertOne(
            {
                nombreCompleto,
                email,
                estado,
                avatar,
                password,
                fechaIngreso
            }
        );

        return {
            nombreCompleto, email, estado, avatar, password, fechaIngreso, id: result.lastID
          };

    };

    async getUsuarios() {
        return this.usuarioDao.getAll();

    };



    async getUsuarioByID({id})  {

        return this.usuarioDao.getById({id});

    };

    async updateUsuario({id, nombreCompleto,
        email,
        estado,
        avatar,
        password,
        fechaIngreso}) {
       const result = await this.usuarioDao.updateOne({id, nombreCompleto,
        email,
        estado,
        avatar,
        password,
        fechaIngreso});

       return {
           id: id,
           nombreCompleto: nombreCompleto,
            email: email,
            estado: estado,
            avatar: avatar,
            password: password,
            fechaIngreso: fechaIngreso,
           modified: result.changes
       }

    };

    async deleteUsuario({id}) {
        const userToDelete = await this.usuarioDao.getById({id});
        const result = await this.usuarioDao.deleteOne({id});

        return {
            ...userToDelete,
            deleted: result.changes
        };
    };
}
