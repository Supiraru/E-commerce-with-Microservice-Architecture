const apiAdapter = require('../../apiAdapter')

const {URL_PRODUCTS_SERVICE} = process.env

const api = apiAdapter(URL_PRODUCTS_SERVICE);

module.exports = async(req, res)=>{
    try{
        const user_id = req.user.data.id;
        const transaction = await api.get('/api/transactions', {
            params: {
                user_id
            }
        });
        return res.json(transaction.data);
    }
    catch(error){
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }

        const{ status, data } = error.response
        return res.status(status).json({
            data
        })
    }
}