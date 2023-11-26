export const isAuth = (req, res, next) => {
    console.log('is Auth being called')
    const authUrls = ['/signup', '/login'];
    if (!req.session.isLoggedIn) {
        let shouldRedirect = true;
        console.log('req.url is ' + req.url)
        let i = 1;
        console.log(`before for: ${i}`)
        authUrls.forEach(url => {
            if (req.url === url) {
                console.log('redirecting to next because req.url is ' + req.url)
                console.log(`in for: ${++i}`)
                shouldRedirect = false;
                // return next();
            }
        })
        console.log(`after for: ${++i}`)
        console.log('redirecting to login');
        if (shouldRedirect) {
            return res.redirect('/login');
        }
        // return res.redirect('/login');
        return next();
    }
    authUrls.forEach(url => {
        ;
        if (req.url === url) {
            return res.redirect('/');
        }
    })
    next();
}