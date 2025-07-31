export const teams = [
    { id: '1', name: 'Team A' },
    { id: '2', name: 'Team B' },
    { id: '3', name: 'Team C' }
]

export const centers = [
    { id: 'BKK', name: 'Bangkok Center' },
    { id: 'NYC', name: 'New York Center' },
    { id: 'LDN', name: 'London Center' }
]

export const roles = [
    { id: 'AGENT', name: 'Agent' },
    { id: 'SUPERVISOR', name: 'Supervisor' },
    { id: 'ADMIN', name: 'Admin' }
]

export const statuses = [
    { id: true, name: 'Active' },
    { id: false, name: 'Inactive' },
]


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
