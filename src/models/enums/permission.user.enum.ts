const permissions_user = [
    {
        name: 'Show user',
        id: 'user_view'
    },
    {
        name: 'Create a user',
        id: 'user_create'
    },
    {
        name: 'Edit user',
        id: 'user_edit'
    },
    {
        name: 'Remove user',
        id: 'user_delete'
    },
    {
        name: 'Show money',
        id: 'money_view'
    },
    {
        name: 'Create a money',
        id: 'money_create'
    },
    {
        name: 'Edit a money',
        id: 'money_edit'
    },
    {
        name: 'Delete a money',
        id: 'money_delete'
    },
    {
        name: 'Show expense',
        id: 'expense_view'
    },
    {
        name: 'Create a expense',
        id: 'expense_create'
    },
    {
        name: 'Edit a expense',
        id: 'expense_edit'
    },
    {
        name: 'Delete a expense',
        id: 'expense_delete'
    },
    {
        name: 'Show income',
        id: 'income_view'
    },
    {
        name: 'Create a income',
        id: 'income_create'
    },
    {
        name: 'Edit a income',
        id: 'income_edit'
    },
    {
        name: 'Delete a income',
        id: 'income_delete'
    }
]

enum PermissionUserId {
    income_view = 'income_view',
    income_create = 'income_create',
    income_edit = 'income_edit',
    income_delete = 'income_delete',
    expense_view = 'expense_view',
    expense_create = 'expense_create',
    expense_edit = 'expense_edit',
    expense_delete = 'expense_delete',
    money_delete = 'money_delete',
    money_edit = 'money_edit',
    money_create = 'money_create',
    money_view = 'money_view',
    user_delete = 'user_delete',
    user_edit = 'user_edit',
    user_create = 'user_create',
    user_view = 'user_view'
}

export { permissions_user, PermissionUserId }