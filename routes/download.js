const router  =  require('express').Router();
const File = require('../models/file');




router.all('/:uuid',async(req,res,next)=>{
    console.log('request received for download file ');

    await File.findOne({uuid:req.params.uuid})
    .then(file=>{
        console.log(file);
        if(!file){
            return res.render('download',{error:'Link has been Expired'});
        }
        else{
            const filePath  =  `${__dirname}/../${file.path}`;
            // now to download file
            res.download(filePath);

        }


    })
    .catch(err=>{
            return res.status(500).json({
                error:'Something Went Wrong '
            })
    })
    


})


module.exports =  router