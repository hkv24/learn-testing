import { app } from './index'

app.listen(3000, () => {
    console.log('listening on port 3000');
});

// app.listen(3000) is not included with index.ts, as the test will actually start the server on port 3000, and if we try to hit the test from another terminal, it will not be able to do that