const hotelModel = require('../model/hotelModel');


const getHotelALL = async (req, res) => {
    const room = await hotelModel.find({})
    res.json(room)
    // console.log(room)
}

const getHotelOne = async (req, res) => {
   const room =  await hotelModel.find({_id : req.params.id})
    res.json(room[0])
    // console.log(room)
}

const postHotel = async (req, res) => {
    const room = new hotelModel(req.body)
    try {
        await room.save()
        res.json(room)
        // console.log(`le POST ===> ${room}`)
    }catch (err) {
        res.status(500).send('Pas de post valide ')
    }
}

const patchHotel = async (req, res) => {
    const room = await hotelModel.findByIdAndUpdate(req.params.id, req.body)
    await room.save()
    if (!room){
        res.status(500).send('Serveur a pas udapte la page')
    }
    res.status(200)
    res.json(room)
    // console.log(`Patch change ==> ${room}`)
}

const deleteHotel = async (req, res) => {
    const room = await hotelModel.findByIdAndDelete({_id : req.params.id})
    if (!room){
        res.status(500).send('Serveur a pas trouver la page')
    }
    res.status(200)
    res.json(room)
}

module.exports = {
    getHotelOne,
    getHotelALL,
    postHotel,
    patchHotel,
    deleteHotel
}