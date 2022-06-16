const path = require('path');
const dotenv = require('dotenv');
const UsuarioDao = require('./UsuarioDao');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const Connection = require('../Connection');


describe("Testing Categoria Crud", () => {
  const env = process.env;
  let db, userDao, id;
  beforeAll( async ()=>{
    jest.resetModules();
    process.env = {
      ...env,
    MONGODB_URI:'mongodb+srv://aldo07:28rmolia@mycluster.3lqjl.mongodb.net/?retryWrites=true&w=majority',
    MONGODB_DB:'sw202202',
    MONGODB_SETUP:1
    };
    db = await Connection.getDB();
    userDao = new UsuarioDao(db, 'usuarios');
    await userDao.init();
  });

  afterAll(async()=>{
    process.env = env;
    return true;
  });

  test('Get All Records', async ()=>{
    const result = await userDao.getAll();
    console.log(result);
  });

  test('Insert One Record', async()=>{
    const result = await userDao.insertOne({nombreCompleto : 'test', email : 'test', estado : 'test', avatar : 'test', password : 'test'});
    console.log(result);
    id = result.insertedId;
    expect(result.acknowledged).toBe(true);
  });

  test('FindById Record', async() =>{
    const record = await userDao.getById({codigo:id.toString()});
    console.log(record);
    expect(record._id).toStrictEqual(id);
  });

  test('Update One Record', async()=>{
    const updateResult = await userDao.updateOne({codigo: id.toString(), nombreCompleto : 'test UPD', email : 'test UPD', estado : 'test UPD', avatar : 'test UPD', password : 'test UPD'});
    console.log(updateResult);
    expect(updateResult.acknowledged).toBe(true);
  });

  /*test('Delete One Record', async () => {
    const deleteResult = await userDao.deleteOne({ codigo: id.toString() });
    console.log(deleteResult);
    expect(deleteResult.acknowledged).toBe(true);
  });*/





});
