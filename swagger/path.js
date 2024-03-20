module.exports = {
    // ==================================
    //  ======= Money APIs ==========
    // ==================================
    "/money": require('./api/money/create-list.json'),
    "/money/{id}": require('./api/money/get-one-update-delete.json'),
    
    // ==================================
    //  ======= Income APIs ==========
    // ==================================
    "/income": require('./api/income/create-list.json'),

     // ==================================
    //  ======= Expense APIs ==========
    // ==================================
    "/expense": require('./api/expense/create-list.json'),

    // ==================================
    //  ======= User APIs ==========
    // ==================================
    "/user": require('./api/user/create-list.json'),
    "/user/{id}": require('./api/user/get-one-update-delete.json'),
};