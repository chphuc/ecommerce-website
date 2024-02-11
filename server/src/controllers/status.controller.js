import Status from '../modals/Status.js'

const initStatus = (req, res) => {
    try {
        const dataStatus = ['pending', 'confirm', 'decline']
        dataStatus.map(item => {
            Status.findOne({ name: item }, (err, status) => {
                if (err) return res.status(500).json({ message: err })
                if (!status) {
                    new Status({ name: item }).save((errSave) => {
                        if (errSave) return res.status(500).json({ message: errSave })

                        console.log('Added ' + item + ' to status collection');
                    })
                }
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const findAll = (req, res) => {
    try {
        Status.find({}, (err, status) => {
            if (err) return res.status(500).json({ message: err })

            return res.status(200).json({
                message: 'Get status successfully',
                data: status
            })
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}


export default {
    findAll,
    initStatus
}