export const path2name = {
    // default
    '/': ' Case Management',
    // 1st level
    '/settings': 'User Management',
    '/user-management': 'User Management',
    '/access-control': 'Access Control',
    '/report': 'Report',
    '/inquiry-log': 'Inquiry Log',
    // 2nd level
    '/case/management': 'Case Management',
    '/customer/search': 'Customer Search',
    '/customer/dashboard': 'Customer Dashboard',
}

export const path2clientpath = {
    // default
    '/': [],
    // 1st level
    '/settings': [{
        name: 'settings',
        goto: ''
    }],
    '/user-management': [{
        name: 'user-management',
        goto: ''
    }],
    '/access-control': [{
        name: 'access-control',
        goto: ''
    }],
    '/report': [{
        name: 'report',
        goto: ''
    }],
    '/inquiry-log': [{
        name: 'inquiry-log',
        goto: ''
    }],
    // 2nd level
    '/case/management': [{
        name: 'case-management',
        goto: ''
    }],
    '/customer/search': [{
        name: 'customer-search',
        goto: ''
    }],
    '/customer/dashboard': [
        {
            name: 'customer-search',
            goto: '/customer/search'
        }, {
            name: 'customer-dashboard',
            goto: ''
        }],
}
