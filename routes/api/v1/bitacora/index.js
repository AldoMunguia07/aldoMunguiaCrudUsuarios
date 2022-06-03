const express = require('express');
const BitacoraDao = require('../../../../dao/models/bitacoraDao');
const Bitacora = require('../../../../libs/bitacora');
const router = express.Router();


const bitDao = new BitacoraDao();
const bitaco = new Bitacora(bitDao);

bitaco.init();

router.get('/all', async (req, res) => {
    try
    {
        const bitacoras = await bitaco.getBitacoras();

        if(!bitacoras)
        {
            return res.status(404).json({error: "Bitacoras no encontrados"});
        }
        return res.status(200).json(bitacoras);

    } catch (ex)
    {
        console.error('Error User', ex);
        return res.status(501).json({error: 'Error interno del servidor'});
    }
})

router.post('/new', async(req,res) => {
    try {
        const {type, description , amount, category} = req.body;

        if (!type || !(/^(INCOME)|(EXPENSES)$/.test(type)))
        {
            return res.status(400).json({
                error: 'Se espera valor de estado en INCOME o EXPENSES'
            });
        }

        if(!description || /^\s*$/.test(description))
        {
            return res.status(400).json({
                error: 'Se espera valor de description'
            });
        }

        if(!amount || /^\s*$/.test(amount))
        {
            return res.status(400).json({
                error: 'Se espera valor de amount'
            });
        }

        if(!category || /^\s*$/.test(category))
        {
            return res.status(400).json({
                error: 'Se espera valor de category'
            });
        }


        const newBit = await bitaco.addBitacora({type, description, amount, category});
        return res.status(200).json(newBit);
    } catch (ex) {
        console.error(ex);
        return res.status(502).json({error:'Error al procesar solicitud'});

    }
});


router.put('/update/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {type, description , amount, category} = req.body;

        if(!(/^\d+$/.test(id)))
        {
            return res.status(400).json({error: 'El código debe ser un dígito válido'})
        }

        if (!type || !(/^(INCOME)|(EXPENSES)$/.test(type)))
        {
            return res.status(400).json({
                error: 'Se espera valor de estado en INCOME o EXPENSES'
            });
        }

        if(!description || /^\s*$/.test(description))
        {
            return res.status(400).json({
                error: 'Se espera valor de description'
            });
        }

        if(!amount || /^\s*$/.test(amount))
        {
            return res.status(400).json({
                error: 'Se espera valor de amount'
            });
        }

        if(!category || /^\s*$/.test(category))
        {
            return res.status(400).json({
                error: 'Se espera valor de category'
            });
        }


        const updBita = await bitaco.updateBitacora({id, type, description, amount, category});
        return res.status(200).json(updBita);
    } catch (ex) {
        console.error(ex);
        return res.status(502).json({error:'Error al procesar solicitud'});

    }
});

router.delete('/delete/:id', async(req,res) => {
    try {
        const {id} = req.params;

        if(!(/^\d+$/.test(id)))
        {
            return res.status(400).json({error: 'El código debe ser un dígito válido'})
        }


        const delBitaco = await bitaco.deleteBitacora({id});
        return res.status(200).json(delBitaco);
    } catch (ex) {
        console.error(ex);
        return res.status(502).json({error:'Error al procesar solicitud'});

    }
});

router.get('/one/:id', async(req,res) => {

    try
    {
        const{id} = req.params;

        if(!(/^\d+$/.test(id)))
        {
            return res.status(400).json({error: 'El código debe ser un dígito válido'})
        }

        const FoundUser = await bitaco.getBitacoraByID({id:parseInt(id)});

        if(!FoundUser)
        {
            return res.status(404).json({error: "Bitacora no encontrada"});
        }

        return res.status(200).json(FoundUser);
    } catch(ex )
    {
        console.error(ex);
        res.status(500).json({error:'Error al procesar solicitud.'})
    }
});


module.exports = router;