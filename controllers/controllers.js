export const getHome = (req, res, next) => {
    console.log('here')
    res.redirect('/login');
}

export const getLogin = (req, res, next) => {
    res.render('login')
}

export const getSignup = (req, res, next) => {
    res.render('signup')
}