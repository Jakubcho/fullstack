import nc from 'next-connect';
import { createRouter } from 'next-connect';

function onError(err, req,res,next){
    console.log(error);
    res.status(500).end(err.toString());
}
const router = createRouter({
    onError:onError,
    onNoMatch: (req,res) => {
        res.status(404).send("Page is not found");
    },
});



export default router.handler();