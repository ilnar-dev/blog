import express from 'express'
import fileUpload from 'express-fileupload'
import adminRouter from './routes/admin.js'
import publicRouter from './routes/public.js'


const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({}))

app.use('/', publicRouter)
app.use('/admin', adminRouter)


app.listen(3000)
