import Express from 'express';

export default {
    index: (req: Express.Request, res: Express.Response) => {
        res.send("<h1>Top Page");
    }
}