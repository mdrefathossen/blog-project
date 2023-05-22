const authRoute = require('./authRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/',
        handler: (req,res) => {
    
            res.json({
                message: "Hellow World"
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if(r.path == '/'){
            app.get(r.path,r.handler)
        } else {
            app.use(r.path,r.handler)
        }
    })
}