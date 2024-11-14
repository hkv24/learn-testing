import { prismaClient } from './db';
import { app } from './index';

app.listen(3000, () => {
    console.log('listening on port 3000')
});