import { PORT } from './common/constants/constants';
import app from './app';

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
