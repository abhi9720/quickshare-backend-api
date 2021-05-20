const router  =  require('express').Router();

const File  =  require('../models/file')

router.get('/:uuid',async(req,res,next)=>{

    
    await File.findOne({uuid:req.params.uuid})
        .then(file=>{
            console.log(file);
            if(!file){
             
                return res.render('download',{error:'Link has been expired'})
            }
            else {
               
                return res.render('download',{

                    uuid: file.uuid,
                    fileName:file.filename,
                    fileSize : file.size,
                    downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
                })
            }
        


        })
        .catch(err=>{
            console.log(err);
        return res.render('download',{error:'Something  Went Wrong '})

        })

})





module.exports =  router;